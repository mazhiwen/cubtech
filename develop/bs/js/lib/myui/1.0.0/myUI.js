define(function(require, exports, module) {

	module.exports=MyUI;

	var myUIConfig=null;
	var myuiid=0;
	var isShowDTP=false;

  	function MyUI(config){
  		myUIConfig=config;
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

		var config={
				//点击日期事件
				finishChooseListener:function(){},
				//box 布局的外层
				box:null,
				//是否默认选择时间
				HMSEmpty:false
			},
			myDate=new Date(),
			nowYear=myDate.getFullYear().toString(),
			nowMonth=this.xtoxx((myDate.getMonth()+1).toString()),
			nowDay=this.xtoxx(myDate.getDate().toString());	
		this.myuiid=++myuiid;	
		this.hasChoosed=false;
		$.each(config,function(key,value){
			if(inputConfig[key]!=undefined){
				config[key]=inputConfig[key];
			}
		});
		this.config=config;
		//选择器 显示状态

		this.isShow=false;	

		//当前选中 或者 设置 的日期  xxxx xx xx xx  xx  xx格式
		//默认 年月日为当天 
		this.chooseDate={
			year:nowYear,
			month:nowMonth,
			day:nowDay,
			hour:'',
			min:'',
			sec:''
		};

		if(!this.config['HMSEmpty']){
			this.chooseDate['hour']='00';
			this.chooseDate['min']='00';
			this.chooseDate['sec']='00';
		}
		//当前显示的日期  默认今天的年月日 showDate 
		this.showDate={
			year:nowYear,
			month:nowMonth,
			day:nowDay
		};
		this._init();		
	}
	//继承公有变量
	DateTimePicker.prototype=new MyUI();

	DateTimePicker.prototype.setDate=function(date){
		var resultYMD=date.match(/(\d{0,4})-(\d{0,2})-(\d{0,2})/);
		var resultHMS=date.match(/(\d{0,2}):(\d{0,2}):(\d{0,2})/);
		if(resultYMD!=null){
			this.chooseDate['year']=resultYMD[1];
			this.chooseDate['month']=this.xtoxx(resultYMD[2]);
			this.chooseDate['day']=this.xtoxx(resultYMD[3]);
			this.fillDateDom(this.chooseDate['year'],this.chooseDate['month']);	
		}
		if(resultHMS!=null){
			this.chooseDate['hour']=this.xtoxx(resultHMS[1]);
			this.chooseDate['min']=this.xtoxx(resultHMS[2]);
			this.chooseDate['sec']=this.xtoxx(resultHMS[3]);
			DOM(this.myuiid).find(".dtm_hour").val(this.chooseDate['hour']);
			DOM(this.myuiid).find(".dtm_minute").val(this.chooseDate['min']);
			DOM(this.myuiid).find(".dtm_second").val(this.chooseDate['sec']);
		}
		this.fillChoosedDate();
	}
	DateTimePicker.prototype.fillChoosedDate=function(){
		this.hasChoosed=true;
		//给填充的元素  按照格式显示日期
		var fillHMS='';
		if(PARSESTRING.isEmpty([this.chooseDate['hour'],this.chooseDate['min'],this.chooseDate['sec']])){
			fillHMS=' '+this.chooseDate['hour']+':'+this.chooseDate['min']+':'+this.chooseDate['sec'];
		}
		var fillStr=this.chooseDate['year']+'-'+this.chooseDate['month']+'-'+this.chooseDate['day']+fillHMS;
		this.renderDateDom.val(fillStr);
	}
	DateTimePicker.prototype.xtoxx=function(paramater){
		var result=paramater;
		if(paramater<10) result='0'+parseInt(paramater);
		return result;
	}
	//默认为空,  未选中状态     getDate
	//getDate  时分秒为空
	/*DateTimePicker.prototype.getDateTime=function(){
		var date=null;
		if(this.hasChoosed){
			date=this.chooseDate['year']+'-'+this.chooseDate['month']+'-'+this.chooseDate['day'];
			if(PARSESTRING.isEmpty([this.chooseDate['hour'],this.chooseDate['min'],this.chooseDate['sec']])){
				date+=' '+this.chooseDate['hour']+':'+this.chooseDate['min']+':'+this.chooseDate['sec'];			
			}
		}
		return date;
	}*/
	DateTimePicker.prototype.getDateTime=function(pattern){
		var date=null;
		var tthis=this;
		if(this.hasChoosed){
			
			if(PARSESTRING.isEmpty([this.chooseDate['hour'],this.chooseDate['min'],this.chooseDate['sec']])){
				pattern=myUIConfig.DateTimePicker.pattern.YMDHIS;		
			}else{
				pattern=myUIConfig.DateTimePicker.pattern.YMD;
			}			
  			pattern=pattern.replace('YY',this.chooseDate['year']);
  			pattern=pattern.replace('MM',this.chooseDate['month']);
  			pattern=pattern.replace('DD',this.chooseDate['day']);
  			pattern=pattern.replace('HH',this.chooseDate['hour']);
  			pattern=pattern.replace('II',this.chooseDate['min']);
  			pattern=pattern.replace('SS',this.chooseDate['sec']);
	  		date=pattern;	
		}
		return date;
	}
	DateTimePicker.prototype.getDate=function(pattern){
		var date=null;
		if(this.hasChoosed){
			pattern=myUIConfig.DateTimePicker.pattern.YMD;
			pattern=pattern.replace('YY',this.chooseDate['year']);
  			pattern=pattern.replace('MM',this.chooseDate['month']);
  			pattern=pattern.replace('DD',this.chooseDate['day']);
	  		date=pattern;
		}
		return date;
	}
	DateTimePicker.prototype.getTime=function(pattern){
		var date=null;
		if(this.hasChoosed){
			if(PARSESTRING.isEmpty([this.chooseDate['hour'],this.chooseDate['min'],this.chooseDate['sec']])){
	  			pattern=myUIConfig.DateTimePicker.pattern.HIS;
	  			pattern=pattern.replace('HH',this.chooseDate['hour']);
	  			pattern=pattern.replace('II',this.chooseDate['min']);
	  			pattern=pattern.replace('SS',this.chooseDate['sec']);
		  		date=pattern;
			}			
		}
		return date;
	}
	/*

	DateTimePicker.prototype.getDate=function(pattern){
		var date=null;
		if(this.hasChoosed){
			date=this.chooseDate['year']+'-'+this.chooseDate['month']+'-'+this.chooseDate['day'];
		}
		return date;
	}
	DateTimePicker.prototype.getTime=function(pattern){
		var date=null;
		if(this.hasChoosed){
			if(PARSESTRING.isEmpty([this.chooseDate['hour'],this.chooseDate['min'],this.chooseDate['sec']])){
				date=this.chooseDate['hour']+':'+this.chooseDate['min']+':'+this.chooseDate['sec'];
			}			
		}
		return date;
	}
*/
	DateTimePicker.prototype._init=function(){

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
							'<div><select class="dtm_hour input">'+defaultHMS+'<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>时<select class="dtm_minute input">'+defaultHMS+'<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>分<select class="dtm_second input">'+defaultHMS+'<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>秒<button class="button dtp_confirm btn_xs">确认</button> <button class="button btn_xs dtp_empty">清空</button></div>',
						'</div>'].join('');
		var html=['<div class="date-time-picker-outer" data-myuiid="'+theMyuiid+'"><button class="button date_time_picker_activebtn">选择</button>',pickerHtml,'<input type="text" disabled class="input date_time_picker_filldate"></div>'].join('');
		$(this.config['box']).append(html);
		
		//获取日历触发按钮  日历填充按钮
		this.activateDom=DOM(theMyuiid).find(".date_time_picker_activebtn");
		this.renderDateDom=DOM(theMyuiid).find(".date_time_picker_filldate");
		//初始化 默认填充选中的 年月
		this.fillDateDom(this.chooseDate['year'],this.chooseDate['month']);	
		this.addFillDateListener();
		this.addChangeMonthListener();
		this.addSwitchDateListener();
		this.addTimeChangeListener();
	}
	DateTimePicker.prototype.addTimeChangeListener=function(){
		var mythis=this;
		DOM(mythis.myuiid).on('change',".dtm_hour,.dtm_minute,.dtm_second",function(){
			$(this).siblings('select').each(function(key,value){
				if(!PARSESTRING.isEmpty($(this).val())){
					$(this).val('00');
				}
			});
		});
	}
	//日历显示隐藏 触发
	DateTimePicker.prototype.addSwitchDateListener=function(){
		var mythis=this;
		this.activateDom.click(function(){
			//如果正在显示
			if(mythis.isShow){
				mythis.activateDom.next().hide();
				mythis.isShow=false;
			//如果正在关闭
			}else{
				console.log(isShowDTP);

				if(mythis.showDate['year']!=mythis.chooseDate['year']||mythis.showDate['month']!=mythis.chooseDate['month']){
					//设置显示日期为 选中日期
					mythis.showDate['year']=mythis.chooseDate['year'];
					mythis.showDate['month']=mythis.chooseDate['month'];
					mythis.showDate['day']=mythis.chooseDate['day'];
					mythis.fillDateDom(mythis.chooseDate['year'],mythis.chooseDate['month']);
				}
				mythis.activateDom.next().show();
				mythis.isShow=true;
			}	
		});
	}
	//填充日历 数字 dom
	DateTimePicker.prototype.fillDateDom=function(year,month){		
		var countMonthDays=this.monthDaysArray(year);
		var a=new Date(year,(month-1),1);
		var b=a.getDay();
		if(b==0)b=7;
		//当月1日的 星期数
		var c=b;
		a=1;
		//要填充的年 月==当前选中年月
		var IsChooseYearMonth=this.chooseDate['year']==year&&this.chooseDate['month']==month;
		//遍历填充月的 日期数
		while(a<=countMonthDays[month-1]){
			var dom=this.activateDom.next().children("div:eq(2)").children("span:eq("+c+")");
			//如果显示年月日完全等于设置 或者 选中的 年月日 设置样式
			if(IsChooseYearMonth&&a==this.chooseDate['day']){
				this.choosedStyle(dom);
			}
			dom.attr("data-isnow","");
			dom.text(a);
			a++;
			c++;
		}
		//遍历下一个月的 日期数  并填充
		a=1;
		while(c<=41){
			this.activateDom.next().children("div:eq(2)").children("span:eq("+c+")").attr("data-isnow","next");
			this.activateDom.next().children("div:eq(2)").children("span:eq("+c+")").text(a);
			c++;
			a++;
		}

		//如果当前月 1月  计算上一年12月的日期数
		if(month==1){
			countMonthDays=this.monthDaysArray(year-1);
			a=countMonthDays[11];
		}
		//如果不是1月  计算上一个月的日期数
		else{
			a=countMonthDays[month-2];
		}
		//填充上一个月的日期数
		while((b-1)>=0){
			this.activateDom.next().children("div:eq(2)").children("span:eq("+(b-1)+")").attr("data-isnow","pre");
			this.activateDom.next().children("div:eq(2)").children("span:eq("+(b-1)+")").text(a);
			a--;
			b--;
		}
		//填充上方现实的 年 月
		this.activateDom.next().children("div:eq(0)").children("span:eq(0)").text(year);
		this.activateDom.next().children("div:eq(0)").children("span:eq(1)").text(month);
	}
	DateTimePicker.prototype.monthDaysArray=function(year){
		var countMonthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
		if((!(year%4)&&year%100)||!(year%400))
		countMonthDays[1]=29;
		return(countMonthDays);
	}
	//按钮  填充 输出时间
	DateTimePicker.prototype.addFillDateListener=function(){
		var mythis=this;
		//确定按钮事件  dtp_confirm  
		//this.activateDom.next().children("div:eq(3)").children("button").click(function(){
		DOM(this.myuiid).find(".dtp_confirm").click(function(){
			
			mythis.chooseDate['hour']=DOM(mythis.myuiid).find(".dtm_hour").val();
			mythis.chooseDate['min']=DOM(mythis.myuiid).find(".dtm_minute").val();
			mythis.chooseDate['sec']=DOM(mythis.myuiid).find(".dtm_second").val();
			mythis.fillChoosedDate();
			mythis.activateDom.next().hide();
			mythis.isShow=false;
		});
		//选中日期事件  样式
		this.activateDom.next().children("div:eq(2)").children().each(function(index, element) {
			$(this).click(function(){
				
				mythis.choosedStyle($(this));
				//获取选中的年月
				var y=mythis.showDate['year'];
				var m=mythis.showDate['month'];
				//如果选中 上下月的 月份变更
				if($(this).attr("data-isnow")=="pre"){
					m--;
					if(m==0){m=12;y--;}
				}
				if($(this).attr("data-isnow")=="next"){
					m++;
					if(m==13){m=1;y++;	}
				}
				//获取选中的 天
				var d=$(this).text();
				mythis.chooseDate['year']=y;
				mythis.chooseDate['month']=mythis.xtoxx(m);
				mythis.chooseDate['day']=mythis.xtoxx(d);
				mythis.fillChoosedDate();

			});
		});

		//dtp_empty 清空按钮事件
		DOM(this.myuiid).find(".dtp_empty").click(function(){
			mythis.hasChoosed=false;
			mythis.renderDateDom.val('');
			var HMSValue='';
			if(!mythis.config['HMSEmpty']){
				HMSValue='00';
			}
			DOM(mythis.myuiid).find(".dtm_hour").val(HMSValue);
			DOM(mythis.myuiid).find(".dtm_minute").val(HMSValue);
			DOM(mythis.myuiid).find(".dtm_second").val(HMSValue);
			mythis.chooseDate['hour']=HMSValue;
			mythis.chooseDate['min']=HMSValue;
			mythis.chooseDate['sec']=HMSValue;
		});

	}
	//选中日期样式
	DateTimePicker.prototype.choosedStyle=function(dom){
		dom.siblings().css("background-color","transparent").css("color","black");
		dom.css("background-color","rgb(0, 162, 202)").css("color","white");
	}
	//切换月份    显示  显示日期 而非 设置日期   并更改显示日期的值
	DateTimePicker.prototype.addChangeMonthListener=function(){
		var mythis=this;
		function clearStyle(){
			var dom=mythis.activateDom.next().children("div:eq(2)").children();
			dom.css("background-color","transparent").css("color","black");
		}
		//上个月
		this.activateDom.next().children("div:eq(0)").children("button:eq(0)").click(function(){
			if(mythis.showDate['month']==1){
				mythis.showDate['year']--;
				mythis.showDate['month']=13;	
			}
			clearStyle();
			mythis.fillDateDom(mythis.showDate['year'],--mythis.showDate['month']);
		});
		//下个月
		this.activateDom.next().children("div:eq(0)").children("button:eq(1)").click(function(){
			if(mythis.showDate['month']==12){
				mythis.showDate['year']++;
				mythis.showDate['month']=0;	
			}
			clearStyle();
			mythis.fillDateDom(mythis.showDate['year'],++mythis.showDate['month']);
		});

	}



	
	

	





















});

