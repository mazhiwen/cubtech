define(function(require) {
	
	var $=require('jquery');
	$("#confirm-outer").click(function(){
		var checkedArticleArray=[];
		$('input[name="article-result"]:checked').each(function(){

			checkedArticleArray.push($(this).val());

		});

		console.log(checkedArticleArray);
	});
});

