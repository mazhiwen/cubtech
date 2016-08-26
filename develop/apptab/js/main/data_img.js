/*var pageController = {
    init: function () {
        var articleId = eq.getUrlString('id');
        proHub.article.getArticleDetail(articleId,function(data){
            $("#detail").html(data.data.result.content)
        })
    }

}

$(function () {
    FastClick && FastClick.attach(document.body);
    pageController.init();
})*/
$("#img_outer_2").hide();
$("#click_more_outer").click(function(){

	$(this).hide();
	$("#img_outer_2").show();
});


