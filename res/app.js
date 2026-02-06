new Vue({
    el: '#app',
    data: {
        // ✅ Google Maps Static API Key
        // 同时定义两个变量名以兼容 HTML 模板
        googleMapAPIKEY: 'AIzaSyBp0Qkt1_XLzYZinO_A9fjwTOuKGrFWl6Y',
        bingMapAPIKEY: 'AIzaSyBp0Qkt1_XLzYZinO_A9fjwTOuKGrFWl6Y',  // 兼容旧模板
        
        // ✅ 白天地图样式 - 简洁明亮（仅隐藏不需要的元素）
        dayMapStyle: [
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
        ],

        // ✅ 黑夜地图样式 - 深色主题
        nightMapStyle: [
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
        ],

        ipDataCards: [
            {
                id: 'upai',
                ip: '',
                country_name: '',
                country_code: '',
                region: '',
                city: '',
                latitude: '',
                longitude: '',
                isp: '',
                asn: '',
                asnlink: '',
                mapUrl: 'res/defaultMap.jpg',
                showMap: false,
                sunInfo: null,
                region_code: '',
                source: 'Upai'
            },
            {
                id: 'sohu',
                ip: '',
                country_name: '',
                country_code: '',
                region: '',
                city: '',
                latitude: '',
                longitude: '',
                isp: '',
                asn: '',
                asnlink: '',
                mapUrl: 'res/defaultMap.jpg',
                showMap: false,
                sunInfo: null,
                region_code: '',
                source: 'Sohu'
            },
            {
                id: 'cloudflare_v4',
                ip: '',
                country_name: '',
                country_code: '',
                region: '',
                city: '',
                latitude: '',
                longitude: '',
                isp: '',
                asn: '',
                asnlink: '',
                mapUrl: 'res/defaultMap.jpg',
                showMap: false,
                sunInfo: null,
                region_code: '',
                source: 'Cloudflare IPv4'
            },
            {
                id: 'cloudflare_v6',
                ip: '',
                country_name: '',
                country_code: '',
                region: '',
                city: '',
                latitude: '',
                longitude: '',
                isp: '',
                asn: '',
                asnlink: '',
                mapUrl: 'res/defaultMap.jpg',
                showMap: false,
                sunInfo: null,
                region_code: '',
                source: 'Cloudflare IPv6'
            },
            {
                id: 'ipify_v4',
                ip: '',
                country_name: '',
                country_code: '',
                region: '',
                city: '',
                latitude: '',
                longitude: '',
                isp: '',
                asn: '',
                asnlink: '',
                mapUrl: 'res/defaultMap.jpg',
                showMap: false,
                sunInfo: null,
                region_code: '',
                source: 'IPify IPv4（OpenAI）'
            },
            {
                id: 'ipify_v6',
                ip: '',
                country_name: '',
                country_code: '',
                region: '',
                city: '',
                latitude: '',
                longitude: '',
                isp: '',
                asn: '',
                asnlink: '',
                mapUrl: 'res/defaultMap.jpg',
                showMap: false,
                sunInfo: null,
                region_code: '',
                source: 'IPify IPv6（OpenAI）'
            },
        ],
        connectivityTests: [
            {
                id: 'netease',
                name: 'Netease',
                icon: 'globe-americas',
                url: 'https://s2.music.126.net/style/web2/img/frame/topbar.png?',
                status: '待检测'
            },
            {
                id: 'baidu',
                name: 'Baidu',
                icon: 'globe-americas',
                url: 'https://www.baidu.com/img/flexible/logo/pc/peak-result.png?',
                status: '待检测'
            },
            {
                id: 'wechat',
                name: 'WeChat',
                icon: 'wechat',
                url: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico?',
                status: '待检测'
            },
            {
                id: 'google',
                name: 'Google',
                icon: 'google',
                url: 'https://www.google.com/images/errors/robot.png?',
                status: '待检测'
            },
            {
                id: 'cloudflare',
                name: 'Cloudflare',
                icon: 'cloud-fill',
                url: 'https://www.cloudflare.com/favicon.ico?',
                status: '待检测'
            },
            {
                id: 'youtube',
                name: 'Youtube',
                icon: 'youtube',
                url: 'https://i.ytimg.com/vi/GYkq9Rgoj8E/hq720.jpg?',
                status: '待检测'
            },
            {
                id: 'github',
                name: 'Github',
                icon: 'github',
                url: 'https://raw.githubusercontent.com/jason5ng32/fulian4/master/background.jpg?',
                status: '待检测'
            },
            {
                id: 'chatgpt',
                name: 'ChatGPT',
                icon: 'chat-quote-fill',
                url: 'https://chat.openai.com/favicon.ico?',
                status: '待检测'
            }
        ],
        stunServers: [
            {
                id: 'google',
                name: 'Google',
                url: 'stun:stun.l.google.com:19302',
                ip: '待检测或连接错误'
            },
            {
                id: 'nextcloud',
                name: 'NxtCld',
                url: 'stun:stun.nextcloud.com:443',
                ip: '待检测或连接错误'
            },
            {
                id: 'peerjs',
                name: 'PeerJS',
                url: 'stun:us-0.turn.peerjs.com',
                ip: '待检测或连接错误'
            },
            {
                id: 'twilio',
                name: 'Twilio',
                url: 'stun:global.stun.twilio.com',
                ip: '待检测或连接错误'
            },
            {
                id: 'cloudflare',
                name: 'Cloudflare',
                url: 'stun:stun.cloudflare.com',
                ip: '待检测或连接错误'
            },
            {
                id: 'miwifi',
                name: 'MiWiFi',
                url: 'stun:stun.miwifi.com',
                ip: '待检测或连接错误'
            },
            {
                id: 'qq',
                name: 'QQ',
                url: 'stun:stun.qq.com',
                ip: '待检测或连接错误'
            },
            {
                id: 'stunprotocol',
                name: 'StnPtc',
                url: 'stun:stunserver.stunprotocol.org',
                ip: '待检测或连接错误'
            }
        ],
        leakTest: [
            {
                "id": "ipapi1",
                "name": "检测 1",
                "geo": "待检测",
                "ip": "待检测"
            },
            {
                "id": "ipapi2",
                "name": "检测 2",
                "geo": "待检测",
                "ip": "待检测"
            },
            {
                "id": "sfshark1",
                "name": "检测 3",
                "geo": "待检测",
                "ip": "待检测"
            },
            {
                "id": "sfshark2",
                "name": "检测 4",
                "geo": "待检测",
                "ip": "待检测"
            }
        ],
        alertMessage: '',
        alertStyle: '',
        alertTitle: '',
        inputIP: '',
        modalQueryResult: null,
        modalQueryError: '',
        isMapShown: false,
        isDarkMode: false,
        isMobile: false,
        isCardsCollapsed: false
    },
    methods: {

        getIPFromUpai: function() {
            var self = this;
            var unixTime = Date.now();
            var url = 'https://pubstatic.b0.upaiyun.com/?_upnode&t=' + unixTime;

            fetch(url)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function(data) {
                    var ip = data.remote_addr;
                    self.ipDataCards[0].ip = ip;
                    self.fetchIPDetails(self.ipDataCards[0], ip);
                })
                .catch(function(error) {
                    console.error('Error fetching IP from Upai:', error);
                    self.ipDataCards[0].ip = '获取失败或不存在 IPv4 地址';
                });
        },

        getIPFromSohu: function() {
            var self = this;
            window.ipCallback = function(data) {
                var ip = data.data.ip;
                self.ipDataCards[1].ip = ip;
                self.ipDataCards[1].source = 'Sohu';
                self.fetchIPDetails(self.ipDataCards[1], ip);
                delete window.ipCallback;
            };
            var script = document.createElement('script');
            script.src = 'https://v2.sohu.com/api/pc-home-city/home-data/ip2location?callback=ipCallback';
            document.head.appendChild(script);
            document.head.removeChild(script);
        },

        getIPFromCloudflare_V4: function() {
            var self = this;
            fetch('https://1.0.0.1/cdn-cgi/trace')
                .then(function(response) { return response.text(); })
                .then(function(data) {
                    var lines = data.split('\n');
                    var ipLine = lines.find(function(line) { return line.startsWith('ip='); });
                    if (ipLine) {
                        var ip = ipLine.split('=')[1];
                        self.ipDataCards[2].ip = ip;
                        self.fetchIPDetails(self.ipDataCards[2], ip);
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching IP from Cloudflare:', error);
                    self.ipDataCards[2].ip = '获取失败或不存在 IPv4 地址';
                });
        },

        getIPFromCloudflare_V6: function() {
            var self = this;
            fetch('https://[2606:4700:4700::1111]/cdn-cgi/trace')
                .then(function(response) { return response.text(); })
                .then(function(data) {
                    var lines = data.split('\n');
                    var ipLine = lines.find(function(line) { return line.startsWith('ip='); });
                    if (ipLine) {
                        var ip = ipLine.split('=')[1];
                        self.ipDataCards[3].ip = ip;
                        self.fetchIPDetails(self.ipDataCards[3], ip);
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching IP from Cloudflare:', error);
                    self.ipDataCards[3].ip = '获取失败或不存在 IPv6 地址';
                });
        },

        getIPFromIpify_V4: function() {
            var self = this;
            fetch('https://api4.ipify.org?format=json')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function(data) {
                    self.ipDataCards[4].ip = data.ip;
                    self.fetchIPDetails(self.ipDataCards[4], data.ip);
                })
                .catch(function(error) {
                    console.error('Error fetching IPv4 address from ipify:', error);
                    self.ipDataCards[4].ip = '获取失败或不存在 IPv4 地址';
                });
        },

        getIPFromIpify_V6: function() {
            var self = this;
            fetch('https://api6.ipify.org?format=json')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function(data) {
                    self.ipDataCards[5].ip = data.ip;
                    self.fetchIPDetails(self.ipDataCards[5], data.ip);
                })
                .catch(function(error) {
                    console.error('Error fetching IPv6 address from ipify:', error);
                    self.ipDataCards[5].ip = '获取失败或不存在 IPv6 地址';
                });
        },

        // ✅ 将 JSON 样式数组转换为 Google Static Maps API 的 style 参数字符串
        convertStylesToStaticParams: function(stylesArray) {
            var params = '';
            for (var i = 0; i < stylesArray.length; i++) {
                var rule = stylesArray[i];
                var parts = [];

                // feature
                if (rule.featureType) {
                    parts.push('feature:' + rule.featureType);
                }
                // element
                if (rule.elementType) {
                    parts.push('element:' + rule.elementType);
                }
                // stylers
                if (rule.stylers) {
                    for (var j = 0; j < rule.stylers.length; j++) {
                        var styler = rule.stylers[j];
                        var keys = Object.keys(styler);
                        for (var k = 0; k < keys.length; k++) {
                            var key = keys[k];
                            var value = styler[key];
                            // 颜色值：将 #RRGGBB 转换为 0xRRGGBB
                            if (key === 'color' && typeof value === 'string' && value.charAt(0) === '#') {
                                value = '0x' + value.substring(1);
                            }
                            parts.push(key + ':' + value);
                        }
                    }
                }

                if (parts.length > 0) {
                    params += '&style=' + encodeURIComponent(parts.join('|'));
                }
            }
            return params;
        },

        // ✅ 港澳台归一化：将 Hong Kong / Macao / Taiwan 归入 China，原值移至 region
        normalizeChineseRegion: function(card) {
            var map = {
                'Hong Kong':  { code: 'hk', name: 'Hong Kong' },
                'Macao':      { code: 'mo', name: 'Macao' },
                'Macau':      { code: 'mo', name: 'Macau' },
                'Taiwan':     { code: 'tw', name: 'Taiwan' }
            };

            // 按 country_name 匹配
            var match = null;
            var keys = Object.keys(map);
            for (var i = 0; i < keys.length; i++) {
                if (card.country_name && card.country_name.toLowerCase() === keys[i].toLowerCase()) {
                    match = map[keys[i]];
                    break;
                }
            }
            // 也按 country_code 兜底匹配
            if (!match && card.country_code) {
                var cc = card.country_code.toUpperCase();
                if (cc === 'HK') match = map['Hong Kong'];
                else if (cc === 'MO') match = map['Macao'];
                else if (cc === 'TW') match = map['Taiwan'];
            }

            if (match) {
                // 把原始地区名写入 region，附带地区旗帜代码
                card.region = match.name + (card.region ? ' - ' + card.region : '');
                card.region_code = match.code;
                // 国家改为 China
                card.country_name = 'China';
                card.country_code = 'CN';
            }
        },

        // ✅ 判断指定经纬度当前是否为白天，并返回日出日落信息
        getSunInfoForLocation: function(latitude, longitude) {
            if (typeof SunCalc === 'undefined') {
                console.warn('SunCalc 模块未加载，使用默认白天样式');
                return { isDaytime: true, sunrise: '--:--', sunset: '--:--' };
            }

            var times = SunCalc.getTimes(new Date(), latitude, longitude);
            var timezoneOffset = Math.round(longitude / 15);

            return {
                isDaytime: times.isDaytime,
                isPolarNight: times.isPolarNight || false,
                isPolarDay: times.isPolarDay || false,
                sunrise: SunCalc.formatTime(times.sunrise, timezoneOffset),
                sunset: SunCalc.formatTime(times.sunset, timezoneOffset)
            };
        },

        // ✅ 生成 Google Static Maps API URL（带日夜样式）
        generateMapUrl: function(latitude, longitude) {
            if (!latitude || !longitude) {
                return 'res/defaultMap.jpg';
            }
            
            var zoom = 3;
            var width = 400;
            var height = 240;
            
            // 使用 Google Static Maps API
            if (this.googleMapAPIKEY) {
                var baseUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude
                    + '&zoom=' + zoom
                    + '&size=' + width + 'x' + height
                    + '&markers=color:red%7C' + latitude + ',' + longitude
                    + '&key=' + this.googleMapAPIKEY;

                // ✅ 根据 IP 所在地的日出日落判断白天黑夜，应用对应地图样式
                var sunInfo = this.getSunInfoForLocation(latitude, longitude);
                var styleArray = sunInfo.isDaytime ? this.dayMapStyle : this.nightMapStyle;
                var styleParams = this.convertStylesToStaticParams(styleArray);

                // 黑夜模式下使用白色标记以增强对比度
                if (!sunInfo.isDaytime) {
                    baseUrl = baseUrl.replace('markers=color:red', 'markers=color:0xFFCC00');
                }

                console.log('🗺️ 地图样式: ' + (sunInfo.isDaytime ? '☀️ 白天' : '🌙 黑夜') 
                    + ' | 日出: ' + sunInfo.sunrise + ' | 日落: ' + sunInfo.sunset
                    + ' | 坐标: (' + latitude + ', ' + longitude + ')');

                return baseUrl + styleParams;
            }
            
            // 备用：OpenStreetMap 静态地图（不支持自定义样式）
            return 'https://staticmap.openstreetmap.de/staticmap.php?center=' + latitude + ',' + longitude + '&zoom=' + zoom + '&size=' + width + 'x' + height + '&markers=' + latitude + ',' + longitude + ',red-pushpin';
        },

        // ✅ 使用 ip.sb 作为首选API
        fetchIPDetails: function(card, ip) {
            var self = this;
            
            // ip.sb API
            fetch('https://api.ip.sb/geoip/' + ip)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('ip.sb returned ' + response.status);
                    }
                    return response.json();
                })
                .then(function(data) {
                    // ip.sb 字段映射
                    card.ip = ip;
                    card.country_name = data.country || '';
                    card.country_code = data.country_code || '';
                    card.region = data.region || '';
                    card.city = data.city || '';
                    card.latitude = data.latitude || '';
                    card.longitude = data.longitude || '';
                    card.isp = data.organization || '';  // ip.sb 的 ISP 在 organization 字段
                    card.asn = data.asn ? 'AS' + data.asn : '';

                    // 设置 ASN 链接
                    if (data.asn) {
                        card.asnlink = 'https://radar.cloudflare.com/traffic/AS' + data.asn;
                    } else {
                        card.asnlink = false;
                    }

                    // ✅ 港澳台归一化处理
                    self.normalizeChineseRegion(card);
                    
                    // ✅ 生成地图 URL（内部自动判断日夜样式）
                    if (card.latitude && card.longitude) {
                        card.mapUrl = self.generateMapUrl(card.latitude, card.longitude);
                        // ✅ 保存日出日落信息用于 UI 显示
                        card.sunInfo = self.getSunInfoForLocation(card.latitude, card.longitude);
                    } else {
                        card.mapUrl = 'res/defaultMap.jpg';
                        card.sunInfo = null;
                    }
                    
                    console.log('✅ ip.sb 获取成功:', data);
                })
                .catch(function(error) {
                    console.warn('ip.sb 失败: ' + error.message + '，尝试备用API...');
                    // 备用 API: ipwho.is
                    self.fetchIPDetailsBackup(card, ip);
                });
        },

        // 备用 API
        fetchIPDetailsBackup: function(card, ip) {
            var self = this;
            
            fetch('https://ipwho.is/' + ip)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('ipwho.is returned ' + response.status);
                    }
                    return response.json();
                })
                .then(function(data) {
                    if (!data.success) {
                        throw new Error(data.message);
                    }
                    
                    card.ip = ip;
                    card.country_name = data.country || '';
                    card.country_code = data.country_code || '';
                    card.region = data.region || '';
                    card.city = data.city || '';
                    card.latitude = data.latitude || '';
                    card.longitude = data.longitude || '';
                    card.isp = (data.connection && data.connection.isp) || (data.connection && data.connection.org) || '';
                    card.asn = (data.connection && data.connection.asn) ? 'AS' + data.connection.asn : '';

                    if (data.connection && data.connection.asn) {
                        card.asnlink = 'https://radar.cloudflare.com/traffic/AS' + data.connection.asn;
                    } else {
                        card.asnlink = false;
                    }

                    // ✅ 港澳台归一化处理
                    self.normalizeChineseRegion(card);
                    
                    // ✅ 生成地图 URL（内部自动判断日夜样式）
                    if (card.latitude && card.longitude) {
                        card.mapUrl = self.generateMapUrl(card.latitude, card.longitude);
                        // ✅ 保存日出日落信息用于 UI 显示
                        card.sunInfo = self.getSunInfoForLocation(card.latitude, card.longitude);
                    } else {
                        card.mapUrl = 'res/defaultMap.jpg';
                        card.sunInfo = null;
                    }
                    
                    console.log('✅ ipwho.is 获取成功');
                })
                .catch(function(error) {
                    console.error('所有 IP API 都失败了:', error);
                    card.mapUrl = 'res/defaultMap.jpg';
                    card.sunInfo = null;
                });
        },

        refreshCard: function(card) {
            var self = this;
            this.clearCardData(card);
            switch (card.source) {
                case 'Cloudflare IPv4':
                    this.getIPFromCloudflare_V4();
                    break;
                case 'Cloudflare IPv6':
                    this.getIPFromCloudflare_V6();
                    break;
                case 'IPify IPv4（OpenAI）':
                    this.getIPFromIpify_V4();
                    break;
                case 'IPify IPv6（OpenAI）':
                    this.getIPFromIpify_V6();
                    break;
                case 'Upai':
                    this.getIPFromUpai();
                    break;
                case 'Sohu':
                    this.getIPFromSohu();
                    break;
                default:
                    console.error('未知来源:', card.source);
            }
        },

        clearCardData: function(card) {
            card.ip = '';
            card.country_name = '';
            card.country_code = '';
            card.region = '';
            card.city = '';
            card.latitude = '';
            card.longitude = '';
            card.asn = '';
            card.isp = '';
            card.mapUrl = 'res/defaultMap.jpg';
            card.sunInfo = null;
            card.region_code = '';
        },

        toggleMaps: function() {
            this.isMapShown = !this.isMapShown;
            var self = this;
            this.ipDataCards.forEach(function(card) {
                card.showMap = self.isMapShown;
            });
        },

        checkAllIPs: function() {
            var self = this;
            setTimeout(function() {
                self.getIPFromCloudflare_V4();
                self.getIPFromCloudflare_V6();
            }, 1000);
            setTimeout(function() {
                self.getIPFromSohu();
                self.getIPFromUpai();
            }, 100);
            setTimeout(function() {
                self.getIPFromIpify_V4();
                self.getIPFromIpify_V6();
            }, 2000);
        },

        checkConnectivityHandler: function(test) {
            var self = this;
            var beginTime = +new Date();
            test.status = "检查中...";
            var img = new Image();
            var timeout = setTimeout(function() {
                test.status = "不可用";
                if (test.id === 'google') {
                    self.alertStyle = "text-danger";
                    self.alertMessage = "你当前似乎没有翻墙，部分内容无法显示。";
                    self.alertTitle = "糟糕！";
                    self.showToast();
                }
            }, 3 * 1000);

            img.onload = function() {
                clearTimeout(timeout);
                test.status = '可用 ( ' + (+new Date() - beginTime) + ' ms )';
                if (test.id === 'google') {
                    self.alertStyle = "text-success";
                    self.alertMessage = "已经连接到国际互联网。";
                    self.alertTitle = "提示";
                    self.showToast();
                }
            };

            img.onerror = function() {
                clearTimeout(timeout);
                test.status = "不可用";
                if (test.id === 'google') {
                    self.alertStyle = "text-danger";
                    self.alertMessage = "已经连接到互联网，但部分内容无法显示。";
                    self.alertTitle = "提示";
                    self.showToast();
                }
            };

            img.src = test.url + Date.now();
        },

        checkAllConnectivity: function() {
            var self = this;
            this.connectivityTests.forEach(function(test) {
                self.checkConnectivityHandler(test);
            });
        },

        showToast: function() {
            var self = this;
            this.$nextTick(function() {
                var toastEl = self.$refs.toast;
                if (toastEl) {
                    var toast = new bootstrap.Toast(toastEl);
                    toast.show();
                } else {
                    console.error("Toast element not found");
                }
            });
        },

        submitQuery: function() {
            var self = this;
            if (this.isValidIP(this.inputIP)) {
                this.modalQueryError = '';
                this.modalQueryResult = null;
                this.fetchIPForModal(this.inputIP);
            } else {
                this.modalQueryError = '请输入有效的 IPv4 或 IPv6 地址。';
                this.modalQueryResult = null;
            }
        },

        isValidIP: function(ip) {
            var ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            var ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){0,6}([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:){0,6}([0-9a-fA-F]{1,4})?))$/;
            return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
        },

        fetchIPForModal: function(ip) {
            var self = this;
            
            fetch('https://api.ip.sb/geoip/' + ip)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('ip.sb returned ' + response.status);
                    }
                    return response.json();
                })
                .then(function(data) {
                    self.modalQueryResult = {
                        ip: ip,
                        country_name: data.country || '',
                        country_code: data.country_code || '',
                        region: data.region || '',
                        region_code: '',
                        city: data.city || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        isp: data.organization || '',
                        asn: data.asn ? 'AS' + data.asn : '',
                        asnlink: data.asn ? 'https://radar.cloudflare.com/traffic/AS' + data.asn : false,
                        mapUrl: (data.latitude && data.longitude) ? self.generateMapUrl(data.latitude, data.longitude) : ''
                    };
                    self.normalizeChineseRegion(self.modalQueryResult);
                    console.log('✅ Modal查询成功');
                })
                .catch(function(error) {
                    console.warn('ip.sb 失败，尝试备用API...');
                    self.fetchIPForModalBackup(ip);
                });
        },

        fetchIPForModalBackup: function(ip) {
            var self = this;
            
            fetch('https://ipwho.is/' + ip)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('ipwho.is returned ' + response.status);
                    }
                    return response.json();
                })
                .then(function(data) {
                    if (!data.success) {
                        throw new Error(data.message);
                    }
                    
                    var asn = (data.connection && data.connection.asn) ? data.connection.asn : '';
                    
                    self.modalQueryResult = {
                        ip: ip,
                        country_name: data.country || '',
                        country_code: data.country_code || '',
                        region: data.region || '',
                        region_code: '',
                        city: data.city || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        isp: (data.connection && data.connection.isp) || (data.connection && data.connection.org) || '',
                        asn: asn ? 'AS' + asn : '',
                        asnlink: asn ? 'https://radar.cloudflare.com/traffic/AS' + asn : false,
                        mapUrl: (data.latitude && data.longitude) ? self.generateMapUrl(data.latitude, data.longitude) : ''
                    };
                    self.normalizeChineseRegion(self.modalQueryResult);
                })
                .catch(function(error) {
                    self.modalQueryError = '所有 IP 查询服务暂时不可用，请稍后再试';
                });
        },

        resetModalData: function() {
            this.inputIP = '';
            this.modalQueryResult = null;
            this.modalQueryError = '';
        },

        checkSTUNServer: function(stun) {
            var self = this;
            try {
                var servers = { iceServers: [{ urls: stun.url }] };
                var pc = new RTCPeerConnection(servers);
                var candidateReceived = false;

                pc.onicecandidate = function(event) {
                    if (event.candidate) {
                        candidateReceived = true;
                        var candidate = event.candidate.candidate;
                        var ipMatch = /(\b(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\b)|([0-9]{1,3}(\.[0-9]{1,3}){3})/i.exec(candidate);
                        if (ipMatch) {
                            stun.ip = ipMatch[0];
                            pc.close();
                        }
                    }
                };

                pc.createDataChannel("");
                pc.createOffer().then(function(offer) {
                    return pc.setLocalDescription(offer);
                });

                setTimeout(function() {
                    if (!candidateReceived) {
                        stun.ip = '测试超时或数据出错';
                    }
                }, 5000);
            } catch (error) {
                console.error('STUN Server Test Error:', error);
                stun.ip = '测试超时或数据出错';
            }
        },

        checkAllWebRTC: function() {
            var self = this;
            this.stunServers.forEach(function(stun) {
                self.checkSTUNServer(stun);
            });
        },

        generate32DigitString: function() {
            var unixTime = Date.now().toString();
            var fixedString = "jason5ng32";
            var randomString = Math.random().toString(36).substring(2, 11);
            return unixTime + fixedString + randomString;
        },

        generate14DigitString: function() {
            var fixedString = "jn32";
            var randomString = Math.random().toString(36).substring(2, 11);
            return fixedString + randomString;
        },

        fetchLeakTestIpApiCom: function(index) {
            var self = this;
            var urlString = this.generate32DigitString();
            var url = 'https://' + urlString + '.edns.ip-api.com/json';

            fetch(url)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function(data) {
                    if (data.dns && 'geo' in data.dns && 'ip' in data.dns) {
                        var geoSplit = data.dns.geo.split(' - ');
                        self.leakTest[index].geo = geoSplit[0];
                        self.leakTest[index].ip = data.dns.ip;
                    } else {
                        console.error('Unexpected data structure:', data);
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching leak test data:', error);
                    self.leakTest[index].geo = '检查出错';
                    self.leakTest[index].ip = '检查出错';
                });
        },

        fetchLeakTestSfSharkCom: function(index, key) {
            var self = this;
            var urlString = this.generate14DigitString();
            var url = 'https://' + urlString + '.ipv4.surfsharkdns.com';

            fetch(url)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function(data) {
                    var getKey = Object.keys(data)[key];
                    var keyEntry = data[getKey];

                    if (keyEntry && keyEntry.Country && keyEntry.IP) {
                        self.leakTest[index].geo = keyEntry.Country;
                        self.leakTest[index].ip = keyEntry.IP;
                    } else {
                        console.error('Unexpected data structure:', data);
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching leak test data:', error);
                    self.leakTest[index].geo = '检查出错';
                    self.leakTest[index].ip = '检查出错';
                });
        },

        checkAllDNSLeakTest: function() {
            var self = this;
            setTimeout(function() {
                self.fetchLeakTestIpApiCom(0);
            }, 100);

            setTimeout(function() {
                self.fetchLeakTestIpApiCom(1);
            }, 1000);

            setTimeout(function() {
                self.fetchLeakTestSfSharkCom(2, 0);
            }, 100);

            setTimeout(function() {
                self.fetchLeakTestSfSharkCom(3, 0);
            }, 1000);
        },

        toggleDarkMode: function() {
            this.isDarkMode = !this.isDarkMode;
            this.updateBodyClass();
        },

        updateBodyClass: function() {
            if (this.isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        },

        checkSystemDarkMode: function() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.isDarkMode = true;
                this.updateBodyClass();
            }
        },

        handleResize: function() {
            this.isMobile = window.innerWidth < 768;
        },

        toggleCollapse: function() {
            this.isCardsCollapsed = !this.isCardsCollapsed;
        }
    },

    created: function() {
        // 地图功能始终可用
        if (localStorage.getItem('isMapShown')) {
            this.isMapShown = localStorage.getItem('isMapShown') === 'true';
        }
        this.isMobile = window.innerWidth < 768;
        this.isCardsCollapsed = this.isMobile;
        window.addEventListener('resize', this.handleResize);
    },

    destroyed: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    watch: {
        isMapShown: function(newVal) {
            localStorage.setItem('isMapShown', newVal);
        }
    },

    mounted: function() {
        var self = this;
        this.checkSystemDarkMode();
        setTimeout(function() {
            self.checkAllConnectivity();
        }, 2500);
        setTimeout(function() {
            self.checkAllWebRTC();
        }, 4000);
        setTimeout(function() {
            self.checkAllDNSLeakTest();
        }, 2500);
        this.checkAllIPs();
        setTimeout(function() {
            self.checkAllConnectivity();
        }, 6000);
        var modalElement = document.getElementById('IPCheck');
        modalElement.addEventListener('hidden.bs.modal', this.resetModalData);
    }

});
