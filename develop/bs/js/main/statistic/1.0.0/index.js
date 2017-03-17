define(function(require) {
	var commonMain=require('commonMain');
	var paging = require('paging'),
		table_body=$("#table_body"),
		search_btn=$("#search_btn"),
		keyword_input=$("#keyword_input"),
		userid_input=$("#userid_input");


	var articleListPaging=new paging("#paging",MAXPAGING,function(currentPage){
		request_list(currentPage,{});
	});
	function request_list(getPaging,otherData){
		var data={page:getPaging,size:PERPAGINGCOUNT};
		if(otherData.length!=0){
			data=Object.assign(data,otherData);
		}
		AJAXMY.send('/search/statistic',data,function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				s+='<tr><td>'+v['count']+'</td><td>'+v['rank']+'</td><td>'+v['keyword']+'</td></tr>';
			});
			table_body.append(s);
			articleListPaging.refreshDom(d['pages']);
		});
	}



	search_btn.click(function(){
		var o={};

		var s=PARSESTRING.getNoEmpty(keyword_input.val());
		if(s!==false)Object.assign(o,{keyword:s});
		s=PARSESTRING.getNoEmpty(userid_input.val());
		if(s!==false)Object.assign(o,{userId:s});
		articleListPaging.pageFn=function(currentPage){
			request_list(currentPage,o);
		};
		articleListPaging.executePageFn(1);

	});


	
});

