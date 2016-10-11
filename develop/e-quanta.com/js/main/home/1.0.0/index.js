define(function(require) {
	var $=require('jquery');
	$=jQuery;
	var	commonMain=new(require('commonMain')),
        ball1=(require('ball'))('s1_canvas',200,2),
        ball2=(require('ball'))('s2_canvas',200,2),
        content_outer=$(".content_outer");

	//$("#navigation_ul>li:eq(0)>a").addClass('navigation_hover');

/*s1 部分 canvas 效果*/
	
/*滚动切换part 事件*/
    var scrollIndex=1;
    var controlScroll=true;
    function setControlScroll(){
        controlScroll=true;
    }
    $('.container').bind('mousewheel DOMMouseScroll', function(e){
        if(controlScroll){
            controlScroll=false;
            /*配置滚动时间限制*/
            setTimeout(setControlScroll,1500);
            content_outer.removeClass("transition_none");
            if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {                
                /*up*/
                if(scrollIndex<5){
                    $("#navigation_ul>li>a").addClass("cl_wt");
                    $("#navigation_ul>li>a").removeClass("cl_bc");
                    $(".dp_tc>a>img").attr("src","./images/home/logo.png");
                }
                if(scrollIndex==5){
                    /*设置视口 overflow*/
                   $("#content_view").css("overflow","hidden");  
                }
                if(scrollIndex>1){
                    /*分页小圆*/
                    $(".page_index_round:eq("+(scrollIndex-2)+")").addClass("select_page_index");
                    $(".page_index_round:not(:eq("+(scrollIndex-2)+"))").removeClass("select_page_index");
                    $(".page_index:eq("+(scrollIndex-2)+")").show();
                    $(".page_index:not(:eq("+(scrollIndex-2)+"))").hide();
                   /*内容展示*/
                    $("#section_"+scrollIndex).removeClass("oacity_1").addClass("oacity_0");
                    $("#section_"+(scrollIndex-1)).removeClass("oacity_0").addClass("oacity_1");
                    content_outer.css("top","-"+(scrollIndex-2)+"00%");          
                    scrollIndex--;
                    console.log(scrollIndex);
                }
            }
            else{
                /*down*/
                if(scrollIndex>2){
                    $("#navigation_ul>li>a").removeClass("cl_wt");
                    $("#navigation_ul>li>a").addClass("cl_bc");
                    $(".dp_tc>a>img").attr("src","./images/home/logo_w.png");
                }
                if(scrollIndex==5){ 
                    $("#content_view").css("overflow","visible");               
                }
                if(scrollIndex<5){
                    $(".page_index_round:eq("+scrollIndex+")").addClass("select_page_index");
                    $(".page_index_round:not(:eq("+scrollIndex+"))").removeClass("select_page_index");
                    $(".page_index:eq("+scrollIndex+")").show();
                    $(".page_index:not(:eq("+scrollIndex+"))").hide();
                    $("#section_"+scrollIndex).removeClass("oacity_1").addClass("oacity_0");    
                    $("#section_"+(scrollIndex+1)).removeClass("oacity_0").addClass("oacity_1");
                    content_outer.css("top","-"+scrollIndex+"00%");
                    scrollIndex++;
                }   
            }
        }
    });

    /*s2 hover 文字的框*/
    $(".s2_text_box").each(function(i,e){
        $(this).hover(function(e){
            $(".s2_text_box").removeClass("s2_text_hover")
            $(this).addClass("s2_text_hover");
            $("#s2_border").css("top",30+i*150+"px");            
        });
    });
    //$("footer").hide();


    /*右侧箭头事件*/
    $(".right_arrow>img:nth-child(2)").click(function(){
        /*导航文字颜色*/
        $("#navigation_ul>li>a").addClass("cl_wt");
        $("#navigation_ul>li>a").removeClass("cl_bc");
        $("#content_view").css("overflow","hidden");
        /*分页小圆*/
        $(".page_index_round:eq(0)").addClass("select_page_index");
        $(".page_index_round:not(:eq(0))").removeClass("select_page_index");
        $(".page_index:eq(0)").show();
        $(".page_index:not(:eq(0))").hide();
        /*内容展示*/
        $("#section_"+scrollIndex).removeClass("oacity_1").addClass("oacity_0");
        $("#section_1").removeClass("oacity_0").addClass("oacity_1");
        content_outer.addClass("transition_none");
        content_outer.css("top","0");          
        scrollIndex=1;
    });

    //var CenterClassIndex=3;
    /*顶部相册插图*/
    $(".album_box>div").each(function(){
        $(this).click(function(){
            var clickClassIndex=$(this).attr("class").substr(5,1);     
            
            //顺时针偏移一位
            if(clickClassIndex==4){
                $(".album_box>div").each(function(){
                    var nowClass=$(this).attr("class");
                    var nowClassIndex=nowClass.substr(5,1);
                    var changeIndex;
                    if(nowClassIndex==1){
                        changeIndex=7;
                    }else{
                        changeIndex=nowClassIndex-1;
                    }
                    $(this).addClass('album'+changeIndex).removeClass(nowClass);
                });
            }
            //顺时针偏移两位
            if(clickClassIndex==5){
                $(".album_box>div").each(function(){
                    var nowClass=$(this).attr("class");
                    var nowClassIndex=nowClass.substr(5,1);
                    var changeIndex;
                    if(nowClassIndex==2){
                        changeIndex=7;
                    }else if(nowClassIndex==1){
                        changeIndex=6;
                    }
                    else{
                        changeIndex=nowClassIndex-2;
                    }
                    $(this).addClass('album'+changeIndex).removeClass(nowClass);
                });
            }
            //逆时针偏移一位
            if(clickClassIndex==2){
                $(".album_box>div").each(function(){
                    var nowClass=$(this).attr("class");
                    var nowClassIndex=nowClass.substr(5,1);
                    var changeIndex;
                    if(nowClassIndex==7){
                        changeIndex=1;
                    }else{
                        changeIndex=parseInt(nowClassIndex)+1;
                    }
                    $(this).addClass('album'+changeIndex).removeClass(nowClass);
                });
            }
            //逆时针偏移两位
            if(clickClassIndex==1){
                $(".album_box>div").each(function(){
                    var nowClass=$(this).attr("class");
                    var nowClassIndex=nowClass.substr(5,1);
                    var changeIndex;
                    if(nowClassIndex==6){
                        changeIndex=1;
                    }else if(nowClassIndex==7){
                        changeIndex=2;
                    }
                    else{
                        changeIndex=parseInt(nowClassIndex)+2;
                    }
                    $(this).addClass('album'+changeIndex).removeClass(nowClass);
                });
            }      
        });
    });

});

