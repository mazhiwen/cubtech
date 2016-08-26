/* @update: 2016-8-17 15:22:22 */
var $detail = $("#detail"),
$originLink = $("#originLink"),
$mainWrap = $(".main-wrap"),
pageController = {
    init: function() {
        var t = eq.getBrowserInfo().isEq,
        a = eq.getUrlString("id") || "57b161447b041a41f941186a",
        e = eq.getUrlString("type"),
        i = eq.getUrlString("appMode");
        t || i ? this.appInit(a, e) : this.otherInit(a, e)
    },
    appInit: function(t, a) {
        proHub.article.getArticleDetail(t,
        function(t) {
            $detail.html(t.data.result.content);
            try {
                var e = t.data.result.originalUrl;
                3 == a && e && $originLink.attr("href", e).show()
            } catch(i) {}
            var r = $mainWrap.height();
            //location.href = "equanta://setHeight=" + r
        })
    },
    otherInit: function(t, a) {
        proHub.article.getArticle(t,
        function(t) {
            200 == t.sys && (template.helper("dataFormat", eq.formatTime), $mainWrap.html(template("article", t.data)))
        });
        var e = downloader.createBar("//testapi.e-quanta.com/images/banner.jpg", "top");
        $("body").prepend(e)
    }
};
$(function() {
    FastClick && FastClick.attach(document.body),
    pageController.init()
});