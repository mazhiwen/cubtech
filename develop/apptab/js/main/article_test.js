/* @update: 2016-8-17 15:22:22 */
define(function(require, exports, module) {

    module.exports=article_test;
    var eq=require('eq');
    var downloader=require('downloader');
    function article_test(){
        console.log(000);
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
            /*app页面*/
            appInit: function(t, a) {
                proHub.article.getArticleDetail(t,
                function(t) {
                    $detail.html(t.data.result.content);
                    try {
                        var e = t.data.result.originalUrl;
                        /*3 要闻  2早报  1文章 */
                        3 == a && e && $originLink.attr("href", e).css("display","inline-block") ;
                        //$originLink.click(function(e){
                          //  e.preventDefault();
                           // alert($(this).attr("href"));
                        //});
                        if(a==1)$(".news-cont-area").css("padding-top","15px");
                    } catch(i) {}
                    var r = $mainWrap.height();
                    location.href = "equanta://setHeight=" + r
                })
            },
            /*分享*/
            otherInit: function(t, a) {
                proHub.article.getArticle(t,
                function(t) {
                    200 == t.sys && (template.helper("dataFormat", eq.formatTime), $mainWrap.html(template("article", t.data)))
                    if(a!=1){
                        $(".news-author-area").hide();
                        $(".news-subtitle").hide();
                    }
                    if(a==2)
                    $(".morning_top_pic").show();
                });
                
                var e = downloader.createBar("//testapi.e-quanta.com/images/banner.png", "");
                $(".main-wrap").after(e)
            }
        };
        $(function() {
            FastClick && FastClick.attach(document.body),
            pageController.init()
        });



    }

    


});