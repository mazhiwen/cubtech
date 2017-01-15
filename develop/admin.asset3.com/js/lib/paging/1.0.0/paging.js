define(function(require, exports, module) {
  
	module.exports=paging;
	function paging(pagingDom,maxPaging,pageFn){
		// <ul class="paging"></ul>
		this.pagingDom=$(pagingDom);
		//最大显示几个可点击页  需要是奇数 即2x+1
		this.maxPaging=maxPaging;
		//页数点击触发事件
		this.pageFn=pageFn;
		//当前点击页数
		this.currentPage=1;
		this.init();
	}

	paging.prototype.init=function(){
		var fillHtmlText='<li class="paging_last"><a>&laquo;</a></li>';
		var tthis=this;
		fillHtmlText+='<li class="paging_next"><a>&raquo;</a></li>';
		fillHtmlText+='<span class="paging_search_wrap"><input type="text" class="paging_search_input"><button class="paging_search_btn">Go</button></span>';
		this.pagingDom.append(fillHtmlText);
		this.executePageFn();
		this.pagingDom.on('click','li.paging_page',function(){
			tthis.currentPage=parseInt($(this).children('a').text());
			tthis.executePageFn();
		});
		this.pagingDom.on('click','li.paging_last',function(){
			if(tthis.currentPage!=1){
				tthis.currentPage--;
				tthis.executePageFn();
			}
		});
	}

	paging.prototype.executePageFn=function(){
		//如果传入参数 则当前页为传入参数， 并执行点击函数
		if(this,arguments.length==1){
			this.currentPage=arguments[0];
		}
		this.pageFn.call(this,this.currentPage);
	}

	paging.prototype.refreshDom=function(totalPages){
		var tthis=this;
		this.pagingDom.children("li.paging_page,li.paging_more").remove();
		var str='';
		function generateLi(i,j){
			while(i<=j){
				str+='<li class="paging_page" data-page="'+i+'"><a>'+i+'</a></li>';
				i++;
			}
		}
		if(totalPages<=this.maxPaging){
			//123
			generateLi(1,totalPages);
		}else{
			if(this.currentPage<(this.maxPaging-1)/2+2){
				//   123... 
				generateLi(1,this.maxPaging-1);
				str+='<li class="paging_more"><a>...</a></li>';
			}else{
				if(this.currentPage<(totalPages-(this.maxPaging-1)/2)){
					//...456...   
					str='<li class="paging_more"><a>...</a></li>';
					generateLi(this.currentPage-(this.maxPaging-1)/2+1,this.currentPage+(this.maxPaging-1)/2-1);
					str+='<li class="paging_more"><a>...</a></li>';
				}else{
					//...456
					str='<li class="paging_more"><a>...</a></li>';
					generateLi(totalPages-(this.maxPaging-1)+1,totalPages);
				}	
			}
		}
		this.pagingDom.children("li.paging_last").after(str);
		this.pagingDom.children('li[data-page="'+this.currentPage+'"]').addClass("active");
		this.pagingDom.off('click','li.paging_next');
		this.pagingDom.on('click','li.paging_next',function(){
			if(tthis.currentPage!=totalPages){
				tthis.currentPage++;
				tthis.executePageFn();
			}
		});
		this.pagingDom.off('click','button.paging_search_btn');
		this.pagingDom.on('click','button.paging_search_btn',function(){
			var page=tthis.pagingDom.find(".paging_search_input").val();
			if(page>0&&page<=totalPages){
				tthis.currentPage=parseInt(page);
				tthis.executePageFn();
			}
		});
	}


});

