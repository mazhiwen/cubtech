define(function(require) {
	var	commonMain=require('commonMain'),
		paging = require('paging'),

		transformTime=new(require('transformTime')),
		table_body=$("#table_body"),
		ifFinishEdit=false;

	function request(getPaging){
		AJAXMY.send('/adslots/list',{page:getPaging,size:PERPAGINGCOUNT},function(d){
			table_body.empty();
			var s;
			$.each(d['result'],function(k,v){
				var type='',
					index='',
					tab=v['categoryName'],
					status='';
				switch(v['type']){
					case 1:
					type='作者推荐';
					break;
					case 2:
					type='文章推荐';
					break;
					case 3:
					type='专题推荐';
					break;
					case 4:
					type='图片类广告';
					break;
				};
				if(tab=="全部"){
					index='第'+v['indexCategory']+'个板块后';
				}else{
					index='第'+v['indexArticle']+'篇文章后';
				}
				status=v['status']?'<button class="glyphicon-on glyphicon onlyicon" title="当前开启"></button> ':'<button class="glyphicon-off glyphicon onlyicon" title="当前关闭"></button> ';
				s+='<tr data-id="'+v['id']+'"><td>'+v['name']+'</td><td>'+tab+'</td><td>'+index+'</td><td>'+type+'</td><td>'+transformTime.MSToYMDHMS(v['createTime'])+'</td><td>'+status+'<a href="ad_edit.html?id='+v['id']+'" class="glyphicon-edit glyphicon" title="编辑"></a> <button class="glyphicon-trash glyphicon onlyicon" title="删除"></button></td></tr>';
			});
			table_body.append(s);
			myPaging=new paging("#paging",d['pages'],MAXPAGING,getPaging,function(){request(this.clickPaging);
			});
			myPaging._init();
		});
	}
	request(1);	
	
	table_body.on('click','.glyphicon-trash',function(event){
		$(this).prop('disabled',true);
		that=$(this);
		AJAXMY.send('/adslots/delete',{id:$(this).parent().parent().attr("data-id")},function(d){
			if(d['result']){
				alert('删除成功');
				that.parent().parent().remove();
			}
			that.prop('disabled',false);
		});
	});
	
	table_body.on('click','.glyphicon-on,.glyphicon-off',function(event){
		console.log(2);
		var t=$(this);
			bool=t.hasClass("glyphicon-on");
		t.prop('disabled',true);
		
		AJAXMY.send('/adslots/status',{id:$(this).parent().parent().attr("data-id"),status:bool?0:1},function(d){
			if(d['result']){
				t.toggleClass('glyphicon-on');
				t.toggleClass('glyphicon-off');
				if(!bool){
					t.attr("title","当前开启");
				}else{
					t.attr("title","当前关闭");
				}
			}
			t.prop('disabled',false);	
		});
	});


});

