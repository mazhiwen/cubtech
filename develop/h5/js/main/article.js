var $detail = $("#detail");
var $originLink = $("#originLink");
var $mainWrap = $(".main-wrap");

var pageController = {
    init: function () {
        var inApp = eq.getBrowserInfo().isEq;
        var articleId = eq.getUrlString('id') || "57b161447b041a41f941186a";
        var articleType = eq.getUrlString('type');   //1,文章（作者原创的那种）  2,早报（没有标题的新闻）  3,要闻（带标题的新闻）
        var appMode = eq.getUrlString("appMode");

        if (inApp || appMode) {
            this.appInit(articleId, articleType);
        } else {
            this.otherInit(articleId, articleType);
        }
    },
    appInit: function (articleId, articleType) {
        proHub.article.getArticleDetail(articleId, function (data) {
            $detail.html(data.data.result.content);
            //是否有原文链接
            try {
                var originUrl = data.data.result.originalUrl;
                if (articleType == 3 && originUrl) {
                    $originLink.attr("href", originUrl).show();
                }
            } catch (e) {
            }
            var webViewHeight = $mainWrap.height();
            location.href = 'equanta://setHeight=' + webViewHeight;
        });
    },
    otherInit: function (articleId, articleType) {
        proHub.article.getArticle(articleId, function (data) {
            if (data.sys == 200) {
                template.helper('dataFormat', eq.formatTime);
                $mainWrap.html(template('article', data.data));
            }
        });


        var $ele = downloader.createBar("https://api.e-quanta.com/images/banner.jpg", "top");
        $("body").prepend($ele);
    }
}

$(function () {
    FastClick && FastClick.attach(document.body);
    pageController.init();
})