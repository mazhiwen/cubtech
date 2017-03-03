define(function(require) {

    
    require('commonMain');
    var downloader=new(require('downloader')),
        components=new(require("components")),
        articleType=components.getGet('type');


    function getSourceCopyrightHtml(sourceType){
        if(sourceType==null){
            return '';
        }else{
            s=['','感谢原作者的辛苦创作,如转载涉及版权问题,敬请联系一匡','欢迎转载，但请务必注明：本文首发于“一匡”','欢迎转载，但请务必注明：本文转载自“一匡”'];
            return '<div class="source_copyright"><img src="//api.e-quanta.com/images/source_copyright.png"><p class="source_copyright_fp"><span class="source_copyright_title">声明:</span>本文仅代表作者观点，不代表一匡立场</p><p>'+s[sourceType]+'</p></div>';
        }
    }


    AJAXMY.send(
        1,
        '/article/web_detail',
        {article_id:components.getGet('id')},
        {"api-version":"1.6"},
        function(data) {

            var //e = this,
                //r = e.$helpers,
                //t = e.$escape,
                a = data.article,
                s = data.user,
                //i = e.$string,
                c = "";
            var myTitle=a.title;
            var mySummary=myTitle;
            if(components.isEmpty(a.summary)){
                mySummary=a.summary;
            }
            var author_v_type_class='';
            switch (s.applyType){
                case 1:
                author_v_type_class='author_icon_person';
                break;
                case 2:
                author_v_type_class='author_icon_org';
                break;
                case 3:
                author_v_type_class='author_icon_media';
                break;
            };
            var content=a.content;
            
            

            if(articleType==2){
                var newImg='';
                if(components.isValid(a.coverPic)){
                    newImg=a.coverPic;
                }
                content='<p>'+content+'</p><p><img class="new_img" src="'+newImg+'"></p>';
            }
            var authorVita='';
            authorVita=s.vita.substr(0,20)+'...';
            c += '<div class="news-wrap"> <div class="news-title-area "> <h6 class="news-title">';
            c += a.title;
            c += '</h6> <div class="news-subtitle mt10 pr"> <span class="news-icon abs-lm"></span> <span class="news-time ml15">';
            c += components.MSToYMDHM(a.createTime);
            c += '</span> </div> </div> <div class="news-author-area box"> <div class="author-head "> <img class="pct100" src="';
            c += s.headPic;
            c += '" alt=""> </div> <div class="author-info boxItem"> <div class="author-name pr"> <span>';
            c += s.nickName;
            c += '</span><span class="author-icon ml5 '+author_v_type_class+'"></span>  </div> <h6 class="author-des"> ';
            s.vita && (c += ' <span class="mr5">', c += authorVita, c += "</span> ");
            c += ' <span>\u6587\u7ae0\u603b\u6570<span class="main_gold"> ';
            c += s.articleNum;
            c += ' </span>\u7bc7</span> </h6> </div> </div> <article class="news-cont-area mt10"> ',
            c += content;
            c += " ";
            a.originalUrl && (c += ' <div class="ta-r pr15"> <a class="origin-link" href="', 
            c += a.originalUrl,
            c += '" id="originLink" style="display: block;">\u539f\u6587\u94fe\u63a5 <span class="gray">>></span></a> </div> ');
            c += " </article> </div>";   
            $(".main-wrap").html(c);

            $(".news-wrap").append(getSourceCopyrightHtml(data.article.source));
            if(articleType!=1){
                $(".news-author-area").hide();
                $(".news-subtitle").hide();
            }
            

            // 1文章 2 要闻 3 早报
            if(articleType==3){
                $(".morning_top_pic").show();
                $(".news-title-area").hide();
            }
            //微信分享配置
            require("weixinshare")(window.location.href,myTitle,mySummary,'https://api.e-quanta.com/images/favicon.png');
        }
    );

    var e = downloader.createBar(URLHEAD+"/images/banner.png", "");
    $(".main-wrap").after(e);
    $(".download-block").click(function(){
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta";
    });

    if(articleType==1){
        AJAXMY.send(
            1,
            '/article/related_article_list',
            {article_id:components.getGet('id')},
            {"api-version":"1.6"},
            function(data) {
                var str='';
                if(data['result'].length!=0){
                    $.each(data['result'],function(key,value){
                        str+='<div class="readings_item_box"><a class="first" href="article-h5.html?type=1&id='+value['id']+'">'+value['title']+'</a><p>'+ components.MSToYMDHM(value['createTime'])+'</p></div>';
                        //str+='<a href="article-h5.html?type=1&id='+value['id']+'">'+value['title']+'</a>';
                    });
                    $(".top_title").after(str);
                    $(".readings").show();
                }  
            }
        ); 
    }



});