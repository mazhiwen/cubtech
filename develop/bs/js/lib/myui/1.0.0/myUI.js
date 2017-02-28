define(function(require, exports, module) {

	module.exports=myUI;

	var myuiid=0;

  	function myUI(){
  		this.table=table;
  		this.DOM=DOM;
  		//this.creatElement=creatElement;
  		//this.tableBody=creatElement;

  	}

  	
  	//生成表格 
  	function table(ttitle,theads){
		//ttitle ''
		//theads ['dsa','eee','wwwww']
		var tthis=this;
		this.myuiid=++myuiid;
		this.initHtml='<table class="table" data-myuiid="'+this.myuiid+'"><caption>'
			+ttitle
			+'</caption><thead><tr><th>'
			+theads.join('</th><th>')
			+'</th></tr></thead><tbody class="table_body"></tbody></table>';

		this.tableBody=function(){
			return DOM(tthis.myuiid).find(".table_body");
		}

		this.trHtml=function(trAttribute,td){
			var trHtml='<tr '+trAttribute+'>';
			$.each(td,function(key,value){
				if(typeof(value)=='object'&&value!=null){
					if(value.hasOwnProperty('attributes')){
						trHtml+='<td '+value['attributes']+'>';	
					}else{
						trHtml+='<td>';
					}
					if(typeof(value['text'])=='object'){

						$.each(value['text'],function(keya,valuea){
							if(valuea['type']=='a'){
								trHtml+='<a '+valuea['attributes']+'><button class="text_button">'+valuea['text']+'</button></a> ';
							}
							if(valuea['type']=='button'){
								trHtml+='<button '+valuea['attributes']+'>'+valuea['text']+'</button> ';		
							}
							if(valuea['type']=='checkbox'){
								trHtml+='<input type="checkbox" '+valuea['attributes']+'>'+valuea['text'];
							}
						});
					}else{
						trHtml+=value['text'];
					}	
					trHtml+='</td>';
				}else{
					trHtml+='<td>'+value+'</td>';
				}
			});
			trHtml+='</tr>';
			return trHtml;
		}
  	}


  	function DOM(myuiid){
  		var result=$('[data-myuiid="'+myuiid+'"]');
		return result;
  	}

  	/*
  	function tableData(trMode){
		//tdata [['1','2','3'],['4','5','6']]		
		//var result='';
		//$.each(tdata,function(key,value){
		//	result+='<tr><td>'
				+value.join('</td><td>')
		//		+'</td></tr>';	
		//});
		//return result;



		//creatElement('td','',);


		//creatElement('tr','',);

  	}*/





  	/*
  	function creatElement(name,attr,innerHtml){
  		var s='<'+name+' '+attr+'>'+innerHtml+'</'+name+'>';
  		return s; 
  	}*/














});

