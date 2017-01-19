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
    getSourceCopyrightHtml:function(sourceType){
        if(sourceType==null){
            return '';
        }else{
            s=['','感谢原作者的辛苦创作,如转载涉及版权问题,敬请联系一匡','欢迎转载，但请务必注明：本文首发于“一匡”','欢迎转载，但请务必注明：本文转载自“一匡”'];
            return '<div class="source_copyright"><img src="//api.e-quanta.com/images/source_copyright.png"><p class="source_copyright_fp"><span class="source_copyright_title">声明:</span>本文仅代表作者观点，不代表一匡立场</p><p>'+s[sourceType]+'</p></div>';
        }
    },
    //app页面
    appInit: function(t, a) {
        var tthis=this;
        proHub.article.getArticleDetail(t,
        function(t) {

            $detail.html(t.data.result.content);
            $detail.after(tthis.getSourceCopyrightHtml(t.data.result.source));

            try {
                var e = t.data.result.originalUrl;
                //3 要闻  2早报  1文章 
                3 == a && e && $originLink.attr("href", e).css("display","inline-block") ;
                if(a==1)$(".news-cont-area").css("padding-top","15px");
            } catch(i) {}
            var r = $mainWrap.height();
            location.href = "equanta://setHeight=" + r
        })
    },
    //分享
    otherInit: function(t, a) {
        var tthis=this;
        proHub.article.getArticle(t,
        function(t) {
            200 == t.sys && (template.helper("dataFormat", eq.formatTime), $mainWrap.html(template("article", t.data)))
            $(".news-wrap").append(tthis.getSourceCopyrightHtml(t.data.article.source));
            if(a!=1){
                $(".news-author-area").hide();
                $(".news-subtitle").hide();
            }
            if(a==2){
                $(".morning_top_pic").show();
                $(".news-title-area").hide();
            }
            
        });
        
        var e = downloader.createBar("//testapi.e-quanta.com/images/banner.png", "");
        $(".main-wrap").after(e);
         ////////////////
         $(document).on("click", ".download-block", function () {
            window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta';
            /*
            downloader.openApp({
                packageName: "com.eq.stock",
                scheme: 'equanta://',
                downloadAndroid: "http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta",
                downloadIOS: "https://itunes.apple.com/cn/app/yi-kuang/id1137638296?mt=8"
            });*/
        });

        $(".main-wrap").on("click", "img", function () {
            var _scheme = 'hyb-image-preview:' + $(this).attr("src")
            window.location.href = _scheme;
        });

        //////////////////////
    }
};
$(function() {
    FastClick && FastClick.attach(document.body),
    pageController.init()
});