new Vue({
    el: '#app',
    data: {
        // ✅ Google Maps Static API Key（用于静态地图图片）
        // 如果不想用Google Maps，可以设为空字符串，将使用OpenStreetMap
        googleMapAPIKEY: 'AIzaSyBp0Qkt1_XLzYZinO_A9fjwTOuKGrFWl6Y',
        
        // 兼容旧变量名
        get bingMapAPIKEY() { return this.googleMapAPIKEY; },
        
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
            },
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
        isCardsCollapsed: false,
    },
    methods: {

        getIPFromUpai() {
            const unixTime = Date.now();
            const url = `https://pubstatic.b0.upaiyun.com/?_upnode&t=${unixTime}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const ip = data.remote_addr;
                    this.ipDataCards[0].ip = ip;
                    this.fetchIPDetails(this.ipDataCards[0], ip);
                })
                .catch(error => {
                    console.error('Error fetching IP from Upai:', error);
                    this.ipDataCards[0].ip = '获取失败或不存在 IPv4 地址';
                });
        },

        getIPFromSohu() {
            window.ipCallback = (data) => {
                var ip = data.data.ip;
                this.ipDataCards[1].ip = ip;
                this.ipDataCards[1].source = 'Sohu';
                this.fetchIPDetails(this.ipDataCards[1], ip);
                delete window.ipCallback;
            };
            var script = document.createElement('script');
            script.src = 'https://v2.sohu.com/api/pc-home-city/home-data/ip2location?callback=ipCallback';
            document.head.appendChild(script);
            document.head.removeChild(script);
        },

        getIPFromCloudflare_V4() {
            fetch('https://1.0.0.1/cdn-cgi/trace')
                .then(response => response.text())
                .then(data => {
                    const lines = data.split('\n');
                    const ipLine = lines.find(line => line.startsWith('ip='));
                    if (ipLine) {
                        const ip = ipLine.split('=')[1];
                        this.ipDataCards[2].ip = ip;
                        this.fetchIPDetails(this.ipDataCards[2], ip);
                    }
                })
                .catch(error => {
                    console.error('Error fetching IP from Cloudflare:', error);
                    this.ipDataCards[2].ip = '获取失败或不存在 IPv4 地址';
                });
        },

        getIPFromCloudflare_V6() {
            fetch('https://[2606:4700:4700::1111]/cdn-cgi/trace')
                .then(response => response.text())
                .then(data => {
                    const lines = data.split('\n');
                    const ipLine = lines.find(line => line.startsWith('ip='));
                    if (ipLine) {
                        const ip = ipLine.split('=')[1];
                        this.ipDataCards[3].ip = ip;
                        this.fetchIPDetails(this.ipDataCards[3], ip);
                    }
                })
                .catch(error => {
                    console.error('Error fetching IP from Cloudflare:', error);
                    this.ipDataCards[3].ip = '获取失败或不存在 IPv6 地址';
                });
        },

        getIPFromIpify_V4() {
            fetch('https://api4.ipify.org?format=json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.ipDataCards[4].ip = data.ip;
                    this.fetchIPDetails(this.ipDataCards[4], data.ip);
                })
                .catch(error => {
                    console.error('Error fetching IPv4 address from ipify:', error);
                    this.ipDataCards[4].ip = '获取失败或不存在 IPv4 地址';
                });
        },

        getIPFromIpify_V6() {
            fetch('https://api6.ipify.org?format=json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.ipDataCards[5].ip = data.ip;
                    this.fetchIPDetails(this.ipDataCards[5], data.ip);
                })
                .catch(error => {
                    console.error('Error fetching IPv6 address from ipify:', error);
                    this.ipDataCards[5].ip = '获取失败或不存在 IPv6 地址';
                });
        },

        // ✅ 生成静态地图图片URL
        // 使用OpenStreetMap的静态地图服务（免费，无需API Key）
        generateMapUrl(latitude, longitude) {
            if (!latitude || !longitude) {
                return 'res/defaultMap.jpg';
            }
            
            // 方案1: 使用 OpenStreetMap 静态地图（免费，推荐）
            // 使用 staticmap.openstreetmap.de 服务
            //const zoom = 10;
            //const width = 400;
            //const height = 200;
            //return `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&markers=${latitude},${longitude},red-pushpin`;
            
            // 方案2: 如果上面的服务不稳定，可以使用 Geoapify（需要注册免费Key）
              const apiKey = '6d10a764f5e743fd96a46cd609b38dc4';
              return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=${width}&height=${height}&center=lonlat:${longitude},${latitude}&zoom=${zoom}&marker=lonlat:${longitude},${latitude};color:%23ff0000;size:medium&apiKey=${apiKey}`;
            
            // 方案3: 使用 Google Static Maps API（需要启用该API并配置计费）
            // if (this.googleMapAPIKEY) {
            //     return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&markers=color:red%7C${latitude},${longitude}&key=${this.googleMapAPIKEY}`;
            // }
        },

        // ✅ 使用 ip.sb 作为首选API，多API自动切换机制
        async fetchIPDetails(card, ip) {
            const apis = [
                {
                    name: 'ip.sb',
                    url: `https://api.ip.sb/geoip/${ip}`,
                    // ip.sb API 返回格式:
                    // {
                    //   "ip": "x.x.x.x",
                    //   "country_code": "CN",
                    //   "country": "China",
                    //   "region": "Guangdong",
                    //   "city": "Shenzhen",
                    //   "latitude": 22.5455,
                    //   "longitude": 114.0683,
                    //   "asn": 4134,          // 注意：是数字
                    //   "organization": "CHINANET-BACKBONE", // ISP信息在这里
                    //   "timezone": "Asia/Shanghai"
                    // }
                    parse: (data) => ({
                        country_name: data.country || '',
                        country_code: data.country_code || '',
                        region: data.region || '',
                        city: data.city || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        isp: data.organization || '',  // ip.sb 的 ISP 信息在 organization 字段
                        asn: data.asn ? `AS${data.asn}` : '',
                        asn_number: data.asn || ''  // 保存纯数字用于链接
                    })
                },
                {
                    name: 'ipwho.is',
                    url: `https://ipwho.is/${ip}`,
                    parse: (data) => {
                        if (!data.success) throw new Error(data.message);
                        return {
                            country_name: data.country || '',
                            country_code: data.country_code || '',
                            region: data.region || '',
                            city: data.city || '',
                            latitude: data.latitude || '',
                            longitude: data.longitude || '',
                            isp: data.connection?.isp || data.connection?.org || '',
                            asn: data.connection?.asn ? `AS${data.connection.asn}` : '',
                            asn_number: data.connection?.asn || ''
                        };
                    }
                },
                {
                    name: 'freeipapi',
                    url: `https://freeipapi.com/api/json/${ip}`,
                    parse: (data) => ({
                        country_name: data.countryName || '',
                        country_code: data.countryCode || '',
                        region: data.regionName || '',
                        city: data.cityName || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        isp: '',
                        asn: '',
                        asn_number: ''
                    })
                }
            ];

            for (const api of apis) {
                try {
                    const response = await fetch(api.url);
                    if (!response.ok) {
                        console.warn(`${api.name} 返回 ${response.status}，尝试下一个API...`);
                        continue;
                    }
                    const data = await response.json();
                    const parsed = api.parse(data);
                    
                    card.ip = ip;
                    card.country_name = parsed.country_name;
                    card.country_code = parsed.country_code;
                    card.region = parsed.region;
                    card.city = parsed.city;
                    card.latitude = parsed.latitude;
                    card.longitude = parsed.longitude;
                    card.isp = parsed.isp;
                    card.asn = parsed.asn;

                    // 设置ASN链接和地图URL
                    if (parsed.asn_number) {
                        // Cloudflare Radar 链接使用纯ASN数字
                        card.asnlink = `https://radar.cloudflare.com/traffic/AS${parsed.asn_number}`;
                    } else {
                        card.asnlink = false;
                    }
                    
                    // 生成地图URL
                    if (card.latitude && card.longitude) {
                        card.mapUrl = this.generateMapUrl(card.latitude, card.longitude);
                    } else {
                        card.mapUrl = 'res/defaultMap.jpg';
                    }
                    
                    console.log(`✅ ${api.name} 获取成功:`, parsed);
                    return; // 成功后退出
                } catch (error) {
                    console.warn(`${api.name} 失败: ${error.message}，尝试下一个API...`);
                }
            }
            
            // 所有API都失败
            console.error('所有 IP 地理位置 API 都失败了');
            card.mapUrl = 'res/defaultMap.jpg';
        },

        refreshCard(card) {
            this.clearCardData(card);
            switch (card.source) {
                case 'Cloudflare IPv4':
                    this.getIPFromCloudflare_V4(card);
                    break;
                case 'Cloudflare IPv6':
                    this.getIPFromCloudflare_V6(card);
                    break;
                case 'IPify IPv4（OpenAI）':
                    this.getIPFromIpify_V4(card);
                    break;
                case 'IPify IPv6（OpenAI）':
                    this.getIPFromIpify_V6(card);
                    break;
                case 'Upai':
                    this.getIPFromUpai(card);
                    break;
                case 'Sohu':
                    this.getIPFromSohu(card);
                    break;
                default:
                    console.error('未知来源:', card.source);
            }
        },

        clearCardData(card) {
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
        },

        toggleMaps() {
            this.isMapShown = !this.isMapShown;
            this.ipDataCards.forEach(card => {
                card.showMap = this.isMapShown;
            });
        },

        checkAllIPs() {
            setTimeout(() => {
                this.getIPFromCloudflare_V4();
                this.getIPFromCloudflare_V6();
            }, 1000);
            setTimeout(() => {
                this.getIPFromSohu();
                this.getIPFromUpai();
            }, 100);
            setTimeout(() => {
                this.getIPFromIpify_V4();
                this.getIPFromIpify_V6();
            }, 2000);
        },

        checkConnectivityHandler(test) {
            const beginTime = + new Date();
            test.status = "检查中...";
            var img = new Image();
            var timeout = setTimeout(() => {
                test.status = "不可用";
                if (test.id === 'google') {
                    this.alertStyle = "text-danger";
                    this.alertMessage = "你当前似乎没有翻墙，部分内容无法显示。";
                    this.alertTitle = "糟糕！";
                    this.showToast();
                }
            }, 3 * 1000);

            img.onload = () => {
                clearTimeout(timeout);
                test.status = `可用 ( ${+ new Date() - beginTime} ms )`;
                if (test.id === 'google') {
                    this.alertStyle = "text-success";
                    this.alertMessage = "已经连接到国际互联网。";
                    this.alertTitle = "提示";
                    this.showToast();
                }
            };

            img.onerror = () => {
                clearTimeout(timeout);
                test.status = "不可用";
                if (test.id === 'google') {
                    this.alertStyle = "text-danger";
                    this.alertMessage = "已经连接到互联网，但部分内容无法显示。";
                    this.alertTitle = "提示";
                    this.showToast();
                }
            };

            img.src = `${test.url}${Date.now()}`;
        },

        checkAllConnectivity() {
            this.connectivityTests.forEach(test => {
                this.checkConnectivityHandler(test);
            });
        },

        showToast() {
            this.$nextTick(() => {
                const toastEl = this.$refs.toast;
                if (toastEl) {
                    const toast = new bootstrap.Toast(toastEl);
                    toast.show();
                } else {
                    console.error("Toast element not found");
                }
            });
        },

        async submitQuery() {
            if (this.isValidIP(this.inputIP)) {
                this.modalQueryError = '';
                this.modalQueryResult = null;
                await this.fetchIPForModal(this.inputIP);
            } else {
                this.modalQueryError = '请输入有效的 IPv4 或 IPv6 地址。';
                this.modalQueryResult = null;
            }
        },

        isValidIP(ip) {
            const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){0,6}([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:){0,6}([0-9a-fA-F]{1,4})?))$/;
            return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
        },

        // ✅ Modal查询也使用ip.sb优先的多API自动切换
        async fetchIPForModal(ip) {
            const apis = [
                {
                    name: 'ip.sb',
                    url: `https://api.ip.sb/geoip/${ip}`,
                    parse: (data) => ({
                        country_name: data.country || '',
                        country_code: data.country_code || '',
                        region: data.region || '',
                        city: data.city || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        isp: data.organization || '',
                        asn: data.asn ? `AS${data.asn}` : '',
                        asn_number: data.asn || ''
                    })
                },
                {
                    name: 'ipwho.is',
                    url: `https://ipwho.is/${ip}`,
                    parse: (data) => {
                        if (!data.success) throw new Error(data.message);
                        return {
                            country_name: data.country || '',
                            country_code: data.country_code || '',
                            region: data.region || '',
                            city: data.city || '',
                            latitude: data.latitude || '',
                            longitude: data.longitude || '',
                            isp: data.connection?.isp || data.connection?.org || '',
                            asn: data.connection?.asn ? `AS${data.connection.asn}` : '',
                            asn_number: data.connection?.asn || ''
                        };
                    }
                },
                {
                    name: 'freeipapi',
                    url: `https://freeipapi.com/api/json/${ip}`,
                    parse: (data) => ({
                        country_name: data.countryName || '',
                        country_code: data.countryCode || '',
                        region: data.regionName || '',
                        city: data.cityName || '',
                        latitude: data.latitude || '',
                        longitude: data.longitude || '',
                        isp: '',
                        asn: '',
                        asn_number: ''
                    })
                }
            ];

            for (const api of apis) {
                try {
                    const response = await fetch(api.url);
                    if (!response.ok) {
                        console.warn(`${api.name} 返回 ${response.status}，尝试下一个API...`);
                        continue;
                    }
                    const data = await response.json();
                    const parsed = api.parse(data);

                    this.modalQueryResult = {
                        ip,
                        country_name: parsed.country_name,
                        country_code: parsed.country_code,
                        region: parsed.region,
                        city: parsed.city,
                        latitude: parsed.latitude,
                        longitude: parsed.longitude,
                        isp: parsed.isp,
                        asn: parsed.asn,
                        asnlink: parsed.asn_number ? `https://radar.cloudflare.com/traffic/AS${parsed.asn_number}` : false,
                        mapUrl: parsed.latitude && parsed.longitude ? this.generateMapUrl(parsed.latitude, parsed.longitude) : ''
                    };
                    
                    console.log(`✅ ${api.name} 获取成功`);
                    return; // 成功后退出
                } catch (error) {
                    console.warn(`${api.name} 失败: ${error.message}，尝试下一个API...`);
                }
            }
            
            // 所有API都失败
            this.modalQueryError = '所有 IP 查询服务暂时不可用，请稍后再试';
        },

        resetModalData() {
            this.inputIP = '';
            this.modalQueryResult = null;
            this.modalQueryError = '';
        },

        async checkSTUNServer(stun) {
            try {
                const servers = { iceServers: [{ urls: stun.url }] };
                const pc = new RTCPeerConnection(servers);
                let candidateReceived = false;

                pc.onicecandidate = event => {
                    if (event.candidate) {
                        candidateReceived = true;
                        const candidate = event.candidate.candidate;
                        const ipMatch = /(\b(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\b)|([0-9]{1,3}(\.[0-9]{1,3}){3})/i.exec(candidate);
                        if (ipMatch) {
                            stun.ip = ipMatch[0];
                            pc.close();
                        }
                    }
                };

                pc.createDataChannel("");
                await pc.createOffer().then(offer => pc.setLocalDescription(offer));

                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (!candidateReceived) {
                            reject(new Error("连接 STUN 服务器超时"));
                        } else {
                            resolve();
                        }
                    }, 5000);
                });
            } catch (error) {
                console.error('STUN Server Test Error:', error);
                stun.ip = '测试超时或数据出错';
            }
        },

        checkAllWebRTC() {
            this.stunServers.forEach(stun => {
                this.checkSTUNServer(stun);
            });
        },

        generate32DigitString() {
            const unixTime = Date.now().toString();
            const fixedString = "jason5ng32";
            const randomString = Math.random().toString(36).substring(2, 11);
            return unixTime + fixedString + randomString;
        },

        generate14DigitString() {
            const fixedString = "jn32";
            const randomString = Math.random().toString(36).substring(2, 11);
            return fixedString + randomString;
        },

        fetchLeakTestIpApiCom(index) {
            const urlString = this.generate32DigitString();
            const url = `https://${urlString}.edns.ip-api.com/json`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.dns && 'geo' in data.dns && 'ip' in data.dns) {
                        const geoSplit = data.dns.geo.split(' - ');
                        this.leakTest[index].geo = geoSplit[0];
                        this.leakTest[index].ip = data.dns.ip;
                    } else {
                        console.error('Unexpected data structure:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching leak test data:', error);
                    this.leakTest[index].geo = '检查出错';
                    this.leakTest[index].ip = '检查出错';
                });
        },

        fetchLeakTestSfSharkCom(index, key) {
            const urlString = this.generate14DigitString();
            const url = `https://${urlString}.ipv4.surfsharkdns.com`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const getKey = Object.keys(data)[key];
                    const keyEntry = data[getKey];

                    if (keyEntry && keyEntry.Country && keyEntry.IP) {
                        this.leakTest[index].geo = keyEntry.Country;
                        this.leakTest[index].ip = keyEntry.IP;
                    } else {
                        console.error('Unexpected data structure:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching leak test data:', error);
                    this.leakTest[index].geo = '检查出错';
                    this.leakTest[index].ip = '检查出错';
                });
        },

        checkAllDNSLeakTest() {
            setTimeout(() => {
                this.fetchLeakTestIpApiCom(0);
            }, 100);

            setTimeout(() => {
                this.fetchLeakTestIpApiCom(1);
            }, 1000);

            setTimeout(() => {
                this.fetchLeakTestSfSharkCom(2, 0);
            }, 100);

            setTimeout(() => {
                this.fetchLeakTestSfSharkCom(3, 0);
            }, 1000);
        },

        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            this.updateBodyClass();
        },

        updateBodyClass() {
            if (this.isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        },

        checkSystemDarkMode() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.isDarkMode = true;
                this.updateBodyClass();
            }
        },

        handleResize() {
            this.isMobile = window.innerWidth < 768;
        },

        toggleCollapse() {
            this.isCardsCollapsed = !this.isCardsCollapsed;
        },

    },

    created() {
        // 地图功能始终可用（使用免费的OpenStreetMap）
        if (localStorage.getItem('isMapShown')) {
            this.isMapShown = localStorage.getItem('isMapShown') === 'true';
        }
        this.isMobile = window.innerWidth < 768;
        this.isCardsCollapsed = this.isMobile;
        window.addEventListener('resize', this.handleResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },

    watch: {
        isMapShown(newVal) {
            localStorage.setItem('isMapShown', newVal);
        }
    },

    mounted() {
        this.checkSystemDarkMode();
        setTimeout(() => {
            this.checkAllConnectivity();
        }, 2500);
        setTimeout(() => {
            this.checkAllWebRTC();
        }, 4000);
        setTimeout(() => {
            this.checkAllDNSLeakTest();
        }, 2500);
        this.checkAllIPs();
        setTimeout(() => {
            this.checkAllConnectivity();
        }, 6000);
        const modalElement = document.getElementById('IPCheck');
        modalElement.addEventListener('hidden.bs.modal', this.resetModalData);
    }

});
