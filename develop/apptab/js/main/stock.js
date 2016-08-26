//alert(window.screen.width);
(function(){

	// 插入的 iFrame 父节点 
	var parentId = 'js-wscn-sidebar-wrapper';
	// iFrame 的 ID 
	var iframeId = 'js-wscn-sidebar-iframe'; 

	var options = /*options*/{
        "chart": {
                "interval": "5"
        },
        "theme": "dark",
        "height": window.screen.height,
        "width": window.screen.width,
        "active": 0,
        "utmSource": "unknown",
        "tabs": [
                {
                        "name": "综合",
                        "symbols": [
                                "XAUUSD",
                                "UKOil",
                                "SPX500",
                                "000001",
                                "EURUSD",
                                "USDJPY",
                                "US10Year"
                        ]
                },
                {
                        "name": "外汇",
                        "symbols": [
                                "EURUSD",
                                "GBPUSD",
                                "USDJPY",
                                "USDCHF",
                                "AUDUSD",
                                "USDCAD",
                                "USDollarIndex"
                        ]
                },
                {
                        "name": "期货",
                        "symbols": [
                                "XAUUSD",
                                "XAGUSD",
                                "UKOil",
                                "USOil",
                                "Copper",
                                "CORN",
                                "WHEAT"
                        ]
                },
                {
                        "name": "股指",
                        "symbols": [
                                "SPX500",
                                "NAS100",
                                "US30",
                                "JPN225INDEX",
                                "hkg33index",
                                "UK100",
                                "eustx50index"
                        ]
                },
                {
                        "name": "债券",
                        "symbols": [
                                "US10Year",
                                "China10Year",
                                "Japan10Year",
                                "Germany10Year",
                                "UK10Year",
                                "France10Year",
                                "Italy10Year"
                        ]
                }
        ]
}/*endOptions*/
	var sidebar = new WallstreetCN.embed.Sidebar(parentId, options, iframeId);
	sidebar.render();

})();