/**
 * MapStyleManager
 * --------------------------------------------------
 * 负责：
 * - 初始化 Google Maps JS 主地图
 * - 根据日出 / 日落自动切换 day / night 样式
 * - 支持「跟随 IP 地时间 / 跟随用户本地时间」
 *
 * 依赖：
 * - Google Maps JavaScript API
 * - SunCalc (res/sunCalc.js)
 * - MAP_STYLES (res/mapStyles.js)
 *
 * 使用示例：
 * MapStyleManager.init('main-map', lat, lng, useLocalTime);
 * MapStyleManager.destroy();
 * --------------------------------------------------
 */

/**
 * 判断指定经纬度当前是否为白天
 *
 * @param {number} lat
 * @param {number} lng
 * @param {boolean} useLocalTime
 *   true  = 跟随用户浏览器本地时间
 *   false = 跟随 IP 所在地时间（推荐）
 * @returns {boolean}
 */
function isDaytime(lat, lng, useLocalTime) {
  const now = new Date();

  // 使用用户本地时间 or IP 地时间
  // SunCalc 本身基于传入 Date + 经纬度计算太阳高度
  const baseDate = useLocalTime
    ? now
    : new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  const times = SunCalc.getTimes(baseDate, lat, lng);

  return baseDate > times.sunrise && baseDate < times.sunset;
}

window.MapStyleManager = {
  map: null,
  marker: null,
  timer: null,

  currentLat: null,
  currentLng: null,
  lastIsDay: null,
  useLocalTime: false,

  /**
   * 初始化主地图
   *
   * @param {string} containerId  DOM id
   * @param {number} lat          纬度
   * @param {number} lng          经度
   * @param {boolean} useLocalTime 是否使用用户本地时间
   */
  init(containerId, lat, lng, useLocalTime = false) {
    if (!window.google || !google.maps) {
      console.error('[MapStyleManager] Google Maps JS 未加载');
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error('[MapStyleManager] 地图容器不存在:', containerId);
      return;
    }

    this.destroy(); // 防止重复初始化

    this.currentLat = lat;
    this.currentLng = lng;
    this.useLocalTime = useLocalTime;

    const isDay = isDaytime(lat, lng, useLocalTime);
    this.lastIsDay = isDay;

    this.map = new google.maps.Map(container, {
      center: { lat, lng },
      zoom: 10,
      styles: isDay ? MAP_STYLES.day : MAP_STYLES.night,
      disableDefaultUI: true,
      clickableIcons: false
    });

    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map
    });

    this.startAutoUpdate();

    console.log(
      `[MapStyleManager] 地图初始化完成 (${isDay ? 'Day' : 'Night'})`
    );
  },

  /**
   * 启动自动昼夜检测（每分钟）
   */
  startAutoUpdate() {
    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      if (!this.map) return;

      const isDayNow = isDaytime(
        this.currentLat,
        this.currentLng,
        this.useLocalTime
      );

      if (isDayNow !== this.lastIsDay) {
        this.map.setOptions({
          styles: isDayNow ? MAP_STYLES.day : MAP_STYLES.night
        });

        this.lastIsDay = isDayNow;

        console.log(
          `[MapStyleManager] 地图样式切换为 ${isDayNow ? 'Day' : 'Night'}`
        );
      }
    }, 60 * 1000); // 每分钟检查一次
  },

  /**
   * 销毁地图（Vue watch / 重新初始化时使用）
   */
  destroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }

    if (this.map) {
      this.map = null;
    }

    this.currentLat = null;
    this.currentLng = null;
    this.lastIsDay = null;

    // console.log('[MapStyleManager] 地图已销毁');
  }
};
