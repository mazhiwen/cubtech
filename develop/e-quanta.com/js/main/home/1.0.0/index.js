define(function(require) {

    

    var	commonMain=new(require('commonMain')),
        ball1=(require('ball'))('s1_canvas',200,2),
        ball2=(require('ball'))('s2_canvas',200,2),
        content_outer=$(".content_outer");



    //滚动切换part 事件
    var scrollIndex=1;
    var controlScroll=true;
    function setControlScroll(){
        controlScroll=true;
    }
    //滚动切换up 事件
    function scrollUp(range){
        var toScrollIndex=scrollIndex-range;
        if(toScrollIndex<4){
            $("#navigation_ul>li>a").addClass("cl_wt");
            $("#navigation_ul>li>a").removeClass("cl_bc");
            $(".dp_tc>a>img").attr("src","./images/home/logo.png");
        }
        if(scrollIndex==5){
            //设置视口 overflow
           $("#content_view").css("overflow","hidden");  
        }
        if(scrollIndex>1){
            //分页小圆
            var index=toScrollIndex-1;
            $(".page_index_round:eq("+index+")").addClass("select_page_index");
            $(".page_index_round:not(:eq("+index+"))").removeClass("select_page_index");
            $(".page_index:eq("+index+")").show();
            $(".page_index:not(:eq("+index+"))").hide();
           //内容展示
            $("#section_"+scrollIndex).removeClass("oacity_1").addClass("oacity_0");
            $("#section_"+toScrollIndex).removeClass("oacity_0").addClass("oacity_1");
            content_outer.css("top","-"+index+"00%");          
            scrollIndex=toScrollIndex;
        }
    }
    //滚动切换down 事件
    function scrollDown(range){
        var toScrollIndex=scrollIndex+range;
        if(toScrollIndex>3){
            $("#navigation_ul>li>a").removeClass("cl_wt");
            $("#navigation_ul>li>a").addClass("cl_bc");
            $(".dp_tc>a>img").attr("src","./images/home/logo_w.png");
        }
        if(scrollIndex==5){ 
            $("#content_view").css("overflow","visible");               
        }
        if(scrollIndex<5){
            var index=toScrollIndex-1;
            $(".page_index_round:eq("+index+")").addClass("select_page_index");
            $(".page_index_round:not(:eq("+index+"))").removeClass("select_page_index");
            $(".page_index:eq("+index+")").show();
            $(".page_index:not(:eq("+index+"))").hide();
            //隐藏
            $("#section_"+scrollIndex).removeClass("oacity_1").addClass("oacity_0"); 
            //显示  
            $("#section_"+toScrollIndex).removeClass("oacity_0").addClass("oacity_1");
            content_outer.css("top","-"+index+"00%");
            scrollIndex=toScrollIndex;
        }  
    }
    //鼠标滚轮切换事件
    $(document).on('mousewheel DOMMouseScroll',function(e){
    //$('.container').bind('mousewheel DOMMouseScroll', function(e){
        if(controlScroll){
            controlScroll=false;
            //配置滚动时间限制
            setTimeout(setControlScroll,1500);
            content_outer.removeClass("transition_none");
            if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {                
                //up
                scrollUp(1);
            }
            else{
                //down
                scrollDown(1);
            }
        }
    });


/*
    
    //上下滑动事件
    function preventTouchDefault(event){
        event.preventDefault();

    }
    document.addEventListener('touchmove', preventTouchDefault, false);
    ZEPTO(document).on('swipeUp',function(e){
            //down
            scrollDown(1);
        }
    );
    ZEPTO(document).on('swipeDown',function(e){          
            //up
            scrollUp(1);  
        }
    );

    */
    //上下按键事件
    $(document).on('keydown',function(e){
        if(controlScroll){
            controlScroll=false;
            //配置滚动时间限制
            setTimeout(setControlScroll,1500);
            content_outer.removeClass("transition_none");
            if(e.keyCode==38) {                
                //up
                scrollUp(1);
            }else if(e.keyCode==40){
                //down
                scrollDown(1);   
            }
        }

    });
    //点击切换part事件
    $(".page_index_round").click(function(){
        var range=$(this).attr("data-scrollIndex")-scrollIndex;
        if(range>0){
            scrollDown(range);
        }else{
            scrollUp(-range);
        }
    });

    //s2 hover 文字的框
    $(".s2_text_box").each(function(i,e){
        $(this).hover(function(e){
            $(".s2_text_box").removeClass("s2_text_hover")
            $(this).addClass("s2_text_hover");
            $("#s2_border").css("top",30+i*150+"px");            
        });
    });



    //右侧箭头事件
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
    //顶部相册插图
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
    

    ZEPTO('#section_2').swipeLeft(function(){
        alert(2);
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

