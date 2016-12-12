define(function(require, exports, module) {

	function dateTimePicker(activateDom,fillDom,finishChooseListener){
		var myDate=new Date();
		var showYear=myDate.getFullYear().toString();
		var showMonth=(myDate.getMonth()+1).toString();	
		this.activateDom=$(activateDom);
		this.fillDom=$(fillDom);
		this.finishChooseListener=finishChooseListener;
		this.isShow=false;
		this.chooseDate={
			year:showYear,
			month:showMonth,
			day:myDate.getDate().toString(),
			hour:'00',
			min:'00',
			sec:'00'
		};
		this.showDate={
			year:showYear,
			month:showMonth,
			day:myDate.getDate().toString()
		};
		/*
		activateDom  激活日期的入口
		fillDom  填充日期Dom
		finishChooseListener  点击日期事件
		*/	
	}
	module.exports=dateTimePicker;
	dateTimePicker.prototype._init=function(){
		this.activateDom.after('<div class="dateTimePicker" style="display:none;"><div><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-chevron-left"></span></button><span>2016</span>年<span>6</span>月<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-chevron-right"></span></button></div><div><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div><div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div><select><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>时<select><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>分<select><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>秒<button>确认</button></div></div>');
		this.fillDateDom(this.showDate['year'],this.showDate['month']);	
		this.addFillDateListener();
		this.addChangeMonthListener();
		this.addSwitchDateListener();
	}
	//日历显示隐藏 触发
	dateTimePicker.prototype.addSwitchDateListener=function(){
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
	}
	//填充日历 数字 dom
	dateTimePicker.prototype.fillDateDom=function(year,month){
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
	}

	dateTimePicker.prototype.monthDaysArray=function(year){
		var countMonthDays=[31,28,31,30,31,30,31,31,30,31,30,31];
		if((!(year%4)&&year%100)||!(year%400))
		countMonthDays[1]=29;
		return(countMonthDays);
	}

	//按钮  填充 输出时间
	dateTimePicker.prototype.addFillDateListener=function(){
		var mythis=this;
		//确定按钮事件
		this.activateDom.next().children("div:eq(3)").children("button").click(function(){
			mythis.chooseDate['hour']=$(this).prev().prev().prev().val();
			mythis.chooseDate['min']=$(this).prev().prev().val();
			mythis.chooseDate['sec']=$(this).prev().val();
			var fillStr=mythis.chooseDate['year']+'-'+mythis.chooseDate['month']+'-'+mythis.chooseDate['day']+' '+mythis.chooseDate['hour']+':'+mythis.chooseDate['min']+':'+mythis.chooseDate['sec'];
			mythis.fillDom.val(fillStr);
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
	}
	//选中日期样式
	dateTimePicker.prototype.choosedStyle=function(dom){
		dom.siblings().css("background-color","transparent").css("color","black");
		dom.css("background-color","rgb(0, 162, 202)").css("color","white");
	}
	//切换月份
	dateTimePicker.prototype.addChangeMonthListener=function(){
		var mythis=this;
		function clearStyle(){
			var dom=mythis.activateDom.next().children("div:eq(2)").children();
			dom.css("background-color","transparent").css("color","black");
		}
		this.activateDom.next().children("div:eq(0)").children("button:eq(0)").click(function(){
			if(mythis.showDate['month']==1){
				mythis.showDate['year']--;
				mythis.showDate['month']=13;	
			}
			clearStyle();
			mythis.fillDateDom(mythis.showDate['year'],(mythis.showDate['month']-1));
			mythis.showDate['month']--;
		});
		this.activateDom.next().children("div:eq(0)").children("button:eq(1)").click(function(){
			if(mythis.showDate['month']==12){
				mythis.showDate['year']++;
				mythis.showDate['month']=0;	
			}
			clearStyle();
			mythis.fillDateDom(mythis.showDate['year'],(parseInt(mythis.showDate['month'])+1));
			mythis.showDate['month']++;
		});
	}
});

