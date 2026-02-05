/**
 * SunCalc - 太阳位置计算模块
 * 根据经纬度和日期计算日出日落时间
 * 
 * 算法基于 NOAA Solar Calculator
 * https://gml.noaa.gov/grad/solcalc/
 */

const SunCalc = (function() {
    
    // 角度转弧度
    const toRad = (deg) => deg * Math.PI / 180;
    
    // 弧度转角度
    const toDeg = (rad) => rad * 180 / Math.PI;
    
    /**
     * 计算儒略日 (Julian Day)
     * @param {Date} date - 日期对象
     * @returns {number} 儒略日
     */
    function getJulianDay(date) {
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        
        let a = Math.floor((14 - month) / 12);
        let y = year + 4800 - a;
        let m = month + 12 * a - 3;
        
        let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        
        // 添加时间部分
        jd += (date.getUTCHours() - 12) / 24 + date.getUTCMinutes() / 1440 + date.getUTCSeconds() / 86400;
        
        return jd;
    }
    
    /**
     * 计算太阳的赤纬和时差
     * @param {number} jd - 儒略日
     * @returns {object} 包含 declination（赤纬）和 eqTime（时差）
     */
    function getSunPosition(jd) {
        // 从 J2000.0 起算的儒略世纪数
        const T = (jd - 2451545.0) / 36525.0;
        
        // 太阳平黄经
        const L0 = (280.46646 + T * (36000.76983 + 0.0003032 * T)) % 360;
        
        // 太阳平近点角
        const M = (357.52911 + T * (35999.05029 - 0.0001537 * T)) % 360;
        const Mrad = toRad(M);
        
        // 地球轨道离心率
        const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
        
        // 太阳中心方程
        const C = (1.914602 - T * (0.004817 + 0.000014 * T)) * Math.sin(Mrad)
                + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
                + 0.000289 * Math.sin(3 * Mrad);
        
        // 太阳真黄经
        const sunLong = L0 + C;
        
        // 黄道倾角
        const obliq = 23.439291 - T * (0.013004167 + T * (0.0000001639 - T * 0.0000005036));
        const obliqRad = toRad(obliq);
        
        // 太阳赤经
        const sunLongRad = toRad(sunLong);
        const sinRA = Math.cos(obliqRad) * Math.sin(sunLongRad);
        const cosRA = Math.cos(sunLongRad);
        const RA = toDeg(Math.atan2(sinRA, cosRA));
        
        // 太阳赤纬
        const sinDecl = Math.sin(obliqRad) * Math.sin(sunLongRad);
        const declination = toDeg(Math.asin(sinDecl));
        
        // 时差 (Equation of Time)
        const y = Math.tan(toRad(obliq / 2)) ** 2;
        const L0rad = toRad(L0);
        
        const eqTime = 4 * toDeg(
            y * Math.sin(2 * L0rad)
            - 2 * e * Math.sin(Mrad)
            + 4 * e * y * Math.sin(Mrad) * Math.cos(2 * L0rad)
            - 0.5 * y * y * Math.sin(4 * L0rad)
            - 1.25 * e * e * Math.sin(2 * Mrad)
        );
        
        return {
            declination: declination,
            eqTime: eqTime
        };
    }
    
    /**
     * 计算日出日落时间
     * @param {Date} date - 日期
     * @param {number} latitude - 纬度
     * @param {number} longitude - 经度
     * @param {number} zenith - 天顶角（默认90.833°，包含大气折射）
     * @returns {object} 包含 sunrise 和 sunset 的 Date 对象，以及 isDaytime 布尔值
     */
    function getTimes(date, latitude, longitude, zenith = 90.833) {
        // 获取当天 UTC 正午的儒略日
        const noon = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));
        const jd = getJulianDay(noon);
        
        const sunPos = getSunPosition(jd);
        const declination = sunPos.declination;
        const eqTime = sunPos.eqTime;
        
        const latRad = toRad(latitude);
        const declRad = toRad(declination);
        const zenithRad = toRad(zenith);
        
        // 计算时角
        const cosHourAngle = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(declRad)) 
                          / (Math.cos(latRad) * Math.cos(declRad));
        
        // 检查极昼或极夜情况
        if (cosHourAngle > 1) {
            // 极夜 - 太阳不升起
            return {
                sunrise: null,
                sunset: null,
                isDaytime: false,
                isPolarNight: true,
                isPolarDay: false
            };
        }
        
        if (cosHourAngle < -1) {
            // 极昼 - 太阳不落下
            return {
                sunrise: null,
                sunset: null,
                isDaytime: true,
                isPolarNight: false,
                isPolarDay: true
            };
        }
        
        const hourAngle = toDeg(Math.acos(cosHourAngle));
        
        // 计算日出日落时间（UTC 分钟数）
        const solarNoon = 720 - 4 * longitude - eqTime; // 太阳正午的 UTC 分钟数
        const sunriseMinutes = solarNoon - hourAngle * 4;
        const sunsetMinutes = solarNoon + hourAngle * 4;
        
        // 转换为 Date 对象
        const baseDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        
        const sunrise = new Date(baseDate.getTime() + sunriseMinutes * 60 * 1000);
        const sunset = new Date(baseDate.getTime() + sunsetMinutes * 60 * 1000);
        
        // 判断当前是否为白天
        const now = date;
        const isDaytime = now >= sunrise && now <= sunset;
        
        return {
            sunrise: sunrise,
            sunset: sunset,
            isDaytime: isDaytime,
            isPolarNight: false,
            isPolarDay: false
        };
    }
    
    /**
     * 判断指定位置当前是否为白天
     * @param {number} latitude - 纬度
     * @param {number} longitude - 经度
     * @param {Date} date - 可选，指定日期时间，默认为当前时间
     * @returns {boolean} 是否为白天
     */
    function isDaytime(latitude, longitude, date = null) {
        const now = date || new Date();
        const times = getTimes(now, latitude, longitude);
        return times.isDaytime;
    }
    
    /**
     * 获取指定位置的本地时间
     * @param {number} longitude - 经度
     * @returns {Date} 估算的本地时间
     */
    function getLocalTime(longitude) {
        // 根据经度估算时区偏移（每15度一个小时）
        const timezoneOffset = Math.round(longitude / 15);
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        return new Date(utc + timezoneOffset * 3600000);
    }
    
    /**
     * 格式化时间为 HH:MM 格式
     * @param {Date} date - 日期对象
     * @param {number} timezoneOffsetHours - 时区偏移小时数
     * @returns {string} 格式化的时间字符串
     */
    function formatTime(date, timezoneOffsetHours = 0) {
        if (!date) return '--:--';
        const adjusted = new Date(date.getTime() + timezoneOffsetHours * 3600000);
        const hours = adjusted.getUTCHours().toString().padStart(2, '0');
        const minutes = adjusted.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // 公开 API
    return {
        getTimes: getTimes,
        isDaytime: isDaytime,
        getLocalTime: getLocalTime,
        formatTime: formatTime
    };
    
})();

// 支持 ES6 模块导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SunCalc;
}
