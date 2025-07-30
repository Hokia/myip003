// 解决方案1: 使用OpenStreetMap替代Google Maps（推荐）
async fetchIPDetails(card, ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        if (data.error) {
            throw new Error(data.reason);
        }
        card.ip = ip;
        card.country_name = data.country_name || '';
        card.country_code = data.country || '';
        card.region = data.region || '';
        card.city = data.city || '';
        card.latitude = data.latitude || '';
        card.longitude = data.longitude || '';
        card.isp = data.org || '';
        card.asn = data.asn || '';

        // 构造 AS Number 的链接
        if (card.asn === '') {
            card.asnlink = false;
            card.mapUrl = '';
        } else {
            card.asnlink = `https://radar.cloudflare.com/traffic/${card.asn}`;
            // ✅ 使用 OpenStreetMap 替代 Google Maps（无需API KEY，更稳定）
            if (card.latitude && card.longitude) {
                card.mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${card.longitude-0.1},${card.latitude-0.1},${card.longitude+0.1},${card.latitude+0.1}&layer=mapnik&marker=${card.latitude},${card.longitude}`;
            } else {
                card.mapUrl = '';
            }
        }
    } catch (error) {
        console.error('获取 IP 详情时出错:', error);
        card.mapUrl = '';
    }
}

// 解决方案2: 修复Google Maps嵌入（需要有效API Key）
async fetchIPDetailsWithGoogleMaps(card, ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        if (data.error) {
            throw new Error(data.reason);
        }
        
        // ... 其他数据设置 ...
        
        if (card.asn === '') {
            card.asnlink = false;
            card.mapUrl = '';
        } else {
            card.asnlink = `https://radar.cloudflare.com/traffic/${card.asn}`;
            // 使用正确的Google Maps Embed API
            if (card.latitude && card.longitude && this.googleMapsAPIKey) {
                card.mapUrl = `https://www.google.com/maps/embed/v1/place?key=${this.googleMapsAPIKey}&q=${card.latitude},${card.longitude}&zoom=10`;
            } else {
                card.mapUrl = '';
            }
        }
    } catch (error) {
        console.error('获取 IP 详情时出错:', error);
        card.mapUrl = '';
    }
}

// 解决方案3: 使用Leaflet.js创建交互式地图
// 需要在HTML中引入Leaflet CSS和JS
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

createInteractiveMap(card) {
    if (!card.latitude || !card.longitude) return;
    
    const mapId = `map-${card.id}`;
    
    // 确保DOM元素存在
    this.$nextTick(() => {
        const mapElement = document.getElementById(mapId);
        if (mapElement && typeof L !== 'undefined') {
            // 清除已存在的地图
            if (mapElement._leaflet_id) {
                mapElement._leaflet_id = null;
                mapElement.innerHTML = '';
            }
            
            // 创建新地图
            const map = L.map(mapId).setView([card.latitude, card.longitude], 10);
            
            // 添加OpenStreetMap图层
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // 添加标记
            L.marker([card.latitude, card.longitude])
                .addTo(map)
                .bindPopup(`${card.city}, ${card.region}<br>${card.country_name}<br>IP: ${card.ip}`)
                .openPopup();
        }
    });
}

// 解决方案4: 数据结构优化
data: {
    // 修正API Key配置
    googleMapsAPIKey: '', // 请填入有效的Google Maps API Key
    // 或者使用其他地图服务
    mapProvider: 'osm', // 'osm' for OpenStreetMap, 'google' for Google Maps
    
    // ... 其他数据保持不变 ...
}

// 解决方案5: 错误处理和回退机制
async fetchIPDetailsWithFallback(card, ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        if (data.error) {
            throw new Error(data.reason);
        }
        
        // 设置基本信息
        Object.assign(card, {
            ip,
            country_name: data.country_name || '',
            country_code: data.country || '',
            region: data.region || '',
            city: data.city || '',
            latitude: data.latitude || '',
            longitude: data.longitude || '',
            isp: data.org || '',
            asn: data.asn || ''
        });

        // ASN链接
        card.asnlink = card.asn ? `https://radar.cloudflare.com/traffic/${card.asn}` : false;
        
        // 地图URL生成（带回退机制）
        if (card.latitude && card.longitude) {
            switch (this.mapProvider) {
                case 'google':
                    if (this.googleMapsAPIKey) {
                        card.mapUrl = `https://www.google.com/maps/embed/v1/place?key=${this.googleMapsAPIKey}&q=${card.latitude},${card.longitude}&zoom=10`;
                    } else {
                        // 回退到OpenStreetMap
                        card.mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${card.longitude-0.1},${card.latitude-0.1},${card.longitude+0.1},${card.latitude+0.1}&layer=mapnik&marker=${card.latitude},${card.longitude}`;
                    }
                    break;
                case 'osm':
                default:
                    card.mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${card.longitude-0.1},${card.latitude-0.1},${card.longitude+0.1},${card.latitude+0.1}&layer=mapnik&marker=${card.latitude},${card.longitude}`;
                    break;
            }
        } else {
            card.mapUrl = '';
        }
    } catch (error) {
        console.error('获取 IP 详情时出错:', error);
        card.mapUrl = '';
    }
}

// 解决方案6: Modal中的IP查询也需要同样修复
async fetchIPForModal(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.reason);
        }

        // 更新 modalQueryResult
        this.modalQueryResult = {
            ip,
            country_name: data.country_name || '',
            country_code: data.country_code || '',
            region: data.region || '',
            city: data.city || '',
            latitude: data.latitude || '',
            longitude: data.longitude || '',
            isp: data.org || '',
            asn: data.asn || '',
            asnlink: data.asn ? `https://radar.cloudflare.com/traffic/${data.asn}` : false,
            // 修复地图URL
            mapUrl: (data.latitude && data.longitude) ? 
                `https://www.openstreetmap.org/export/embed.html?bbox=${data.longitude-0.1},${data.latitude-0.1},${data.longitude+0.1},${data.latitude+0.1}&layer=mapnik&marker=${data.latitude},${data.longitude}` : ''
        };
    } catch (error) {
        console.error('获取 IP 详情时出错:', error);
        this.modalQueryError = error.message;
    }
}
