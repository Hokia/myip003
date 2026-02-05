/**
 * MapStyleManager - 地图样式管理模块
 * 根据日出日落时间动态切换 Google Maps 样式
 */

const MapStyleManager = (function() {
    
    // 白天地图样式 - 简洁明亮
    const dayStyle = [
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "poi.business",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "transit",
            "stylers": [{ "visibility": "off" }]
        }
    ];
    
    // 黑夜地图样式 - 深色主题
    const nightStyle = [
        {
            "elementType": "geometry",
            "stylers": [{ "color": "#1d2c4d" }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#8ec3b9" }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#1a3646" }]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#4b6878" }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#64779e" }]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#4b6878" }]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#334e87" }]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{ "color": "#023e58" }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{ "color": "#283d6a" }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#6f9ba5" }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#1d2c4d" }]
        },
        {
            "featureType": "poi.business",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#023e58" }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#3C7680" }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#304a7d" }]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#98a5be" }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#1d2c4d" }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{ "color": "#2c6675" }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#255763" }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#b0d5ce" }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#023e58" }]
        },
        {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "transit",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#98a5be" }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#1d2c4d" }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#283d6a" }]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{ "color": "#3a4762" }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#0e1626" }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#4e6d70" }]
        }
    ];
    
    // 当前地图实例
    let mapInstance = null;
    // 当前状态
    let currentMode = null;
    // 当前位置信息
    let currentLocation = {
        latitude: null,
        longitude: null
    };
    
    /**
     * 初始化 Google Map
     * @param {string} containerId - 地图容器元素 ID
     * @param {number} latitude - 纬度
     * @param {number} longitude - 经度
     * @param {number} zoom - 缩放级别
     * @returns {google.maps.Map} 地图实例
     */
    function initMap(containerId, latitude, longitude, zoom = 10) {
        currentLocation.latitude = latitude;
        currentLocation.longitude = longitude;
        
        // 判断是否为白天
        const isDaytime = SunCalc.isDaytime(latitude, longitude);
        currentMode = isDaytime ? 'day' : 'night';
        
        const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: zoom,
            styles: isDaytime ? dayStyle : nightStyle,
            disableDefaultUI: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true
        };
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Map container not found:', containerId);
            return null;
        }
        
        mapInstance = new google.maps.Map(container, mapOptions);
        
        // 添加标记
        new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapInstance,
            animation: google.maps.Animation.DROP
        });
        
        console.log(`Map initialized in ${currentMode} mode for location (${latitude}, ${longitude})`);
        
        return mapInstance;
    }
    
    /**
     * 更新地图位置并自动切换样式
     * @param {number} latitude - 新纬度
     * @param {number} longitude - 新经度
     */
    function updateLocation(latitude, longitude) {
        currentLocation.latitude = latitude;
        currentLocation.longitude = longitude;
        
        if (mapInstance) {
            // 更新中心点
            mapInstance.setCenter({ lat: latitude, lng: longitude });
            
            // 检查并更新样式
            updateStyleBasedOnTime();
        }
    }
    
    /**
     * 根据当前位置的时间更新地图样式
     */
    function updateStyleBasedOnTime() {
        if (!mapInstance || !currentLocation.latitude || !currentLocation.longitude) {
            return;
        }
        
        const isDaytime = SunCalc.isDaytime(currentLocation.latitude, currentLocation.longitude);
        const newMode = isDaytime ? 'day' : 'night';
        
        if (newMode !== currentMode) {
            currentMode = newMode;
            mapInstance.setOptions({
                styles: isDaytime ? dayStyle : nightStyle
            });
            console.log(`Map style switched to ${currentMode} mode`);
            
            // 触发自定义事件
            const event = new CustomEvent('mapStyleChanged', {
                detail: { mode: currentMode, isDaytime: isDaytime }
            });
            document.dispatchEvent(event);
        }
    }
    
    /**
     * 手动设置地图样式
     * @param {string} mode - 'day' 或 'night'
     */
    function setStyle(mode) {
        if (!mapInstance) return;
        
        if (mode === 'day') {
            mapInstance.setOptions({ styles: dayStyle });
            currentMode = 'day';
        } else if (mode === 'night') {
            mapInstance.setOptions({ styles: nightStyle });
            currentMode = 'night';
        }
    }
    
    /**
     * 获取当前样式模式
     * @returns {string} 'day' 或 'night'
     */
    function getCurrentMode() {
        return currentMode;
    }
    
    /**
     * 获取日出日落信息（用于 UI 显示）
     * @returns {object} 日出日落时间信息
     */
    function getSunTimes() {
        if (!currentLocation.latitude || !currentLocation.longitude) {
            return null;
        }
        
        const times = SunCalc.getTimes(
            new Date(),
            currentLocation.latitude,
            currentLocation.longitude
        );
        
        // 计算时区偏移
        const timezoneOffset = Math.round(currentLocation.longitude / 15);
        
        return {
            sunrise: SunCalc.formatTime(times.sunrise, timezoneOffset),
            sunset: SunCalc.formatTime(times.sunset, timezoneOffset),
            isDaytime: times.isDaytime,
            isPolarNight: times.isPolarNight,
            isPolarDay: times.isPolarDay,
            timezoneOffset: timezoneOffset
        };
    }
    
    /**
     * 获取地图样式配置（可用于外部）
     * @param {string} mode - 'day' 或 'night'
     * @returns {Array} Google Maps 样式数组
     */
    function getStyle(mode) {
        return mode === 'day' ? dayStyle : nightStyle;
    }
    
    /**
     * 启动自动样式更新（每分钟检查一次）
     * @param {number} interval - 检查间隔毫秒数，默认 60000（1分钟）
     */
    function startAutoUpdate(interval = 60000) {
        setInterval(updateStyleBasedOnTime, interval);
    }
    
    // 公开 API
    return {
        initMap: initMap,
        updateLocation: updateLocation,
        updateStyleBasedOnTime: updateStyleBasedOnTime,
        setStyle: setStyle,
        getCurrentMode: getCurrentMode,
        getSunTimes: getSunTimes,
        getStyle: getStyle,
        startAutoUpdate: startAutoUpdate,
        dayStyle: dayStyle,
        nightStyle: nightStyle
    };
    
})();

// 支持 ES6 模块导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapStyleManager;
}
