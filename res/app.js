new Vue({
  el: '#app',

  data: {
    googleMapAPIKEY: 'AIzaSyBp0Qkt1_XLzYZinO_A9fjwTOuKGrFWl6Y',

    useLocalTime: false,
    mainMapInited: false,
    isMapShown: true,

    ipDataCards: [
      {
        id: 'ip1',
        source: 'Cloudflare',
        ip: '',
        country_name: '',
        city: '',
        latitude: '',
        longitude: '',
        isp: '',
        asn: '',
        mapUrl: 'res/defaultMap.jpg'
      },
      {
        id: 'ip2',
        source: 'IPify',
        ip: '',
        country_name: '',
        city: '',
        latitude: '',
        longitude: '',
        isp: '',
        asn: '',
        mapUrl: 'res/defaultMap.jpg'
      }
    ]
  },

  methods: {
    /* ================= IP 查询 ================= */

    fetchIP(card, url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          card.ip = data.ip || '';
          this.fetchIPDetails(card, card.ip);
        })
        .catch(() => {
          card.ip = '获取失败';
        });
    },

    fetchIPDetails(card, ip) {
      fetch(`https://api.ip.sb/geoip/${ip}`)
        .then(res => res.json())
        .then(data => {
          card.country_name = data.country || '';
          card.city = data.city || '';
          card.latitude = data.latitude || '';
          card.longitude = data.longitude || '';
          card.isp = data.organization || '';
          card.asn = data.asn ? 'AS' + data.asn : '';

          if (card.latitude && card.longitude) {
            card.mapUrl = this.generateStaticMap(card.latitude, card.longitude);
          }
        });
    },

    generateStaticMap(lat, lng) {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=6&size=400x200&markers=${lat},${lng}&key=${this.googleMapAPIKEY}`;
    },

    refreshCard(card) {
      if (card.source === 'Cloudflare') {
        this.fetchIP(card, 'https://api.ipify.org?format=json');
      } else {
        this.fetchIP(card, 'https://api4.ipify.org?format=json');
      }
    }
  },

  watch: {
    /* ========== IP 数据到位 → 初始化主地图 ========== */
    ipDataCards: {
      deep: true,
      handler(cards) {
        if (this.mainMapInited) return;

        const card = cards.find(c => c.latitude && c.longitude);
        if (!card) return;

        this.$nextTick(() => {
          MapStyleManager.init(
            'main-map',
            Number(card.latitude),
            Number(card.longitude),
            this.useLocalTime
          );
          this.mainMapInited = true;
        });
      }
    },

    /* ========== 时间模式切换 ========== */
    useLocalTime() {
      if (!this.mainMapInited) return;

      MapStyleManager.destroy();
      this.mainMapInited = false;

      this.$nextTick(() => {
        const card = this.ipDataCards.find(c => c.latitude && c.longitude);
        if (!card) return;

        MapStyleManager.init(
          'main-map',
          Number(card.latitude),
          Number(card.longitude),
          this.useLocalTime
        );
        this.mainMapInited = true;
      });
    }
  },

  mounted() {
    /* 初始加载 IP */
    this.refreshCard(this.ipDataCards[0]);
    this.refreshCard(this.ipDataCards[1]);
  }
});
