var $detail = $("#detail");
var $originLink = $("#originLink");
var $mainWrap = $(".main-wrap");

var pageController = {
    init: function () {
        var articleId = eq.getUrlString('id') || "57b161447b041a41f941186a";
        var articleType = eq.getUrlString('type');   //1,文章（作者原创的那种）  2,早报（没有标题的新闻）  3,要闻（带标题的新闻）
        proHub.article.getArticleDetail(articleId, function (data) {
            $detail.html(data.data.result.content);
            //是否有原文链接
            try {
                var originUrl = data.data.result.originalUrl
                if (articleType == 3 && originUrl) {
                    $originLink.attr("href", originUrl).show();
                }
            } catch (e) {
            }
            //在app里则给native通信webview高度
            if (eq.getBrowserInfo().isEq) {
                var webViewHeight = $mainWrap.height();
                location.href = 'equanta://setHeight=' + webViewHeight
            }
        })
    }

}

$(function () {
    FastClick && FastClick.attach(document.body);
    pageController.init();
})