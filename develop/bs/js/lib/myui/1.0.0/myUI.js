define(function(require, exports, module) {

	module.exports=MyUI;

	var myuiid=0;

  	function MyUI(config){
  		this.myUIConfig={
  			DateTimePicker:{
  				pattern:'YY/MM/DD HH MM SS'
  			}


  		};
  	}

  	MyUI.prototype={
  		DateTimePicker:DateTimePicker,
  		table:table,
  		button:button,
  		DOM:DOM
  	};


  	//生成表格 
  	function table(ttitle,theads){
		//ttitle '' 标题
		//theads ['dsa','eee','wwwww']  头部

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

  	//根据 myuiid 获取 DOM
  	function DOM(myuiid){
  		var result=$('[data-myuiid="'+myuiid+'"]');
		return result;
  	}



  	function button(inputConfig){
  		var config={
	  			//唯一选择器 selector
	  			selector:inputConfig['selector'],
	  			//类型 type
	  			type:inputConfig['type'],
	  			//可无  是否持续点击 isKeepClicking   默认 false
	  			isKeepClicking:inputConfig['isKeepClicking']||false,
	  			//点击函数clickFn
	  			clickFn:inputConfig['clickFn']
	  		},
	  		html='';
  		 if(config['type']=='commit'){
  		 	html='';
  		 }
  		//$(config['selector'])  		
  		$(document).on('click',config['selector'],function(event){

  		});
  		return html;
  	}





  	//生成日历
  	function DateTimePicker(inputConfig){
  		//继承myui 的 config 包括日期时间的格式
  		MyUI.call(this);
		var config={
				//点击日期事件
				finishChooseListener:function(){},
				//box 布局的外层
				box:null,
				//是否默认选择时间
				HMSEmpty:false
			},
			
			myDate=new Date(),
			showYear=myDate.getFullYear().toString(),
			showMonth=(myDate.getMonth()+1).toString();	
		this.myuiid=++myuiid;	
		this.showDate={
				year:showYear,
				month:showMonth,
				day:myDate.getDate().toString()
			};
		$.each(config,function(key,value){
			if(inputConfig[key]!=undefined){
				config[key]=inputConfig[key];
			}
		});
		this.config=config;
		//选择器 显示状态
		this.isShow=false;	

		//保存选择的日期
		this.chooseDate={
			year:showYear,
			month:showMonth,
			day:myDate.getDate().toString(),
			hour:'00',
			min:'00',
			sec:'00'
		};
		this._init();		
	}

	DateTimePicker.prototype={
		setDate:function(date){
			this.chooseDate['year']=date['year'];
			this.chooseDate['month']=parseInt(date['month']);
			this.chooseDate['day']=parseInt(date['day']);
			this.fillDateDom(this.chooseDate['year'],this.chooseDate['month']);	
			DOM(this.myuiid).find(".dtm_hour").val(date['hour']);
			DOM(this.myuiid).find(".dtm_minute").val(date['minute']);
			DOM(this.myuiid).find(".dtm_second").val(date['second']);
		},
		xtoxx:function(paramater){
			var result=paramater;
			if(paramater<10) result='0'+parseInt(paramater);
			return result;
		},
		getDate:function(pattern){
			var date=null;
			if(pattern=='YMD'){
				date=this.chooseDate['year']+'-'+this.xtoxx(this.chooseDate['month'])+'-'+this.xtoxx(this.chooseDate['day']);
			}
			if(pattern=='HMS'){
				date=this.xtoxx(this.chooseDate['hour'])+':'+this.xtoxx(this.chooseDate['min'])+':'+this.xtoxx(this.chooseDate['sec']);
			}
			return date;
		},
		/*
		getDate:function(patternn){
			var date=null;
			var pattern='YY-MM-DD HH:MM:SS';
			///[\s\S]*?(HH)[\s\S]*?(MM)[\s\S]*?/
			date=pattern.replace(/(YY)*(MM)*(DD)*(HH)*(MM)*(SS)*//*,function(match,p1,p2,p3){
				p1=22;p2=33;p3=44;


			});
			console.log(date);
			return date;
		},
		*/
		_init:function(){

			var theMyuiid=this.myuiid;
			
			//给box 添加选择器html 
			var defaultHMS='';
			if(this.config['HMSEmpty']){
				defaultHMS='<option value=" "> </option>';
			}	
			var pickerHtml=['<div class="dateTimePicker" style="display:none;">',
								'<div><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-chevron-left"></span></button><span>2016</span>年<span>6</span>月<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-chevron-right"></span></button></div>',
								'<div><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>',
								'<div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>',
								'<div><select class="dtm_hour">'+defaultHMS+'<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>时<select class="dtm_minute">'+defaultHMS+'<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>分<select class="dtm_second">'+defaultHMS+'<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>秒<button>确认</button></div>',
							'</div>'].join('');
			var html=['<div class="date-time-picker-outer" data-myuiid="'+theMyuiid+'"><button class="button date_time_picker_activebtn">选择</button>',pickerHtml,'<input type="text" disabled class="input date_time_picker_filldate"></div>'].join('');
			$(this.config['box']).append(html);
			
			//获取日历触发按钮  日历填充按钮
			this.activateDom=DOM(theMyuiid).find(".date_time_picker_activebtn");
			this.renderDateDom=DOM(theMyuiid).find(".date_time_picker_filldate");
			
			this.fillDateDom(this.showDate['year'],this.showDate['month']);	
			this.addFillDateListener();
			this.addChangeMonthListener(this.showDate);
			this.addSwitchDateListener();
		},
		//日历显示隐藏 触发
		addSwitchDateListener:function(){
			var mythis=this;
			this.activateDom.click(function(){
				if(mythis.isShow){
					mythis.activateDom.next().hide();
					mythis.isShow=false;
				}else{
					mythis.activateDom.next().show();
					mythis.isShow=true;
				}	
			});
		},
		//填充日历 数字 dom
		fillDateDom:function(year,month){
			var countMonthDays=this.monthDaysArray(year);
			var a=new Date(year,(month-1),1);
			var b=a.getDay();
			if(b==0)b=7;
			var c=b;
			a=1;

			var IsChooseYearMonth=this.chooseDate['year']==year&&this.chooseDate['month']==month;
			while(a<=countMonthDays[month-1]){
				var dom=this.activateDom.next().children("div:eq(2)").children("span:eq("+c+")");
				if(IsChooseYearMonth&&a==this.chooseDate['day']){
					//是选中天数 执行样式
					this.choosedStyle(dom);
				}
				dom.attr("data-isnow","");
				dom.text(a);
				a++;
				c++;
			}
			a=1;
			while(c<=41){
				this.activateDom.next().children("div:eq(2)").children("span:eq("+c+")").attr("data-isnow","next");
				this.activateDom.next().children("div:eq(2)").children("span:eq("+c+")").text(a);
				c++;
				a++;
			}
			if(month==1){
				countMonthDays=this.monthDaysArray(year-1);
				a=countMonthDays[11];
			}
			else{
				a=countMonthDays[month-2];
			}
			while((b-1)>=0){
				this.activateDom.next().children("div:eq(2)").children("span:eq("+(b-1)+")").attr("data-isnow","pre");
				this.activateDom.next().children("div:eq(2)").children("span:eq("+(b-1)+")").text(a);
				a--;
				b--;
			}
			this.activateDom.next().children("div:eq(0)").children("span:eq(0)").text(year);
			this.activateDom.next().children("div:eq(0)").children("span:eq(1)").text(month);
		},
		monthDaysArray:function(year){
			var countMonthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
			if((!(year%4)&&year%100)||!(year%400))
			countMonthDays[1]=29;
			return(countMonthDays);
		},
		//按钮  填充 输出时间
		addFillDateListener:function(){
			var mythis=this;
			//确定按钮事件
			this.activateDom.next().children("div:eq(3)").children("button").click(function(){
				mythis.chooseDate['hour']=$(this).prev().prev().prev().val();
				mythis.chooseDate['min']=$(this).prev().prev().val();
				mythis.chooseDate['sec']=$(this).prev().val();
				var fillHMS='';
				if(PARSESTRING.isEmpty([mythis.chooseDate['hour'],mythis.chooseDate['min'],mythis.chooseDate['sec']])){
					fillHMS=' '+mythis.chooseDate['hour']+':'+mythis.chooseDate['min']+':'+mythis.chooseDate['sec'];
				}
				var fillStr=mythis.chooseDate['year']+'-'+mythis.chooseDate['month']+'-'+mythis.chooseDate['day']+fillHMS;
				mythis.renderDateDom.val(fillStr);
				mythis.activateDom.next().hide();
				mythis.isShow=false;
			});
			//选中日期事件  样式
			this.activateDom.next().children("div:eq(2)").children().each(function(index, element) {
				$(this).click(function(){
					mythis.choosedStyle($(this));
					var y=$(this).parent().prev().prev().children("span").eq(0).text();
					var m=$(this).parent().prev().prev().children("span").eq(1).text();
					if($(this).attr("data-isnow")=="pre"){
						m--;
						if(m==0){m=12;y--;}
					}
					if($(this).attr("data-isnow")=="next"){
						m++;
						if(m==13){m=1;y++;	}
					}
					if(m<10)m='0'+m;
					var d=$(this).text();
					if(d<10)d='0'+d;
					mythis.chooseDate['year']=y;
					mythis.chooseDate['month']=m;
					mythis.chooseDate['day']=d;
				});
			});
		},
		//选中日期样式
		choosedStyle:function(dom){
			dom.siblings().css("background-color","transparent").css("color","black");
			dom.css("background-color","rgb(0, 162, 202)").css("color","white");
		},
		//切换月份
		addChangeMonthListener:function(showDate){
			var mythis=this;
			function clearStyle(){
				var dom=mythis.activateDom.next().children("div:eq(2)").children();
				dom.css("background-color","transparent").css("color","black");
			}
			this.activateDom.next().children("div:eq(0)").children("button:eq(0)").click(function(){
				if(showDate['month']==1){
					showDate['year']--;
					showDate['month']=13;	
				}
				clearStyle();
				mythis.fillDateDom(showDate['year'],(showDate['month']-1));
				showDate['month']--;
			});
			this.activateDom.next().children("div:eq(0)").children("button:eq(1)").click(function(){
				if(showDate['month']==12){
					showDate['year']++;
					showDate['month']=0;	
				}
				clearStyle();
				mythis.fillDateDom(showDate['year'],(parseInt(showDate['month'])+1));
				showDate['month']++;
			});
		}



	}
	

	





















});

