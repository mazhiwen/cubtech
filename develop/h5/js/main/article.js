var pageController = {
    init: function () {
        var articleId = eq.getUrlString('id');
        proHub.article.getArticleDetail(articleId,function(data){
            $("#detail").html(data.data.result.content);
        })
    }

}

$(function () {
    FastClick && FastClick.attach(document.body);
    pageController.init();



})


