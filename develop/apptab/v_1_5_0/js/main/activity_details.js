define(function(require) {

    
    require('commonMain');
    var downloader=new(require('downloader'));
    var components=new(require("components"));


    AJAXMY.send(
        1,
        '/event/detail/content',
        {event_id:components.getGet('id')},
        {},
        function(data){
            $(".news-cont-area").append(data['result']['content']);
        }
    );



    //$(".news-cont-area").append('<p>这是一条测试语句..........</p>');
/*
    AJAXMY.send(1,'/timeline/web_detail',{timeline_id:components.getGet('id')||'584fb8b2bffc3f303b02a359'},{},function(data){
         var result=data['result']['timeline'],
            commentlist=data['result']['commentList'],
            userNickName=result["nickName"],
            userContent=result['content'],
            userHeadPic=result['headPic'];

        function getMainText(str){
            var text='';
            $.each(JSON.parse(str),function(index,value){
                var theKey=Object.keys(value)[0];
                var theValue=value[theKey];
                switch(theKey){
                    case 'forward':
                    text+='@'+theValue['text']+':';
                    break;
                    case 'topic':
                    break;
                    case 'text':
                    text+=theValue;
                    break;
                    case 'at':
                    text+='@'+theValue['text']+':';
                    break;
                    case 'anchor':
                    text+='网页链接';
                    break;
                }
            });
            return text;
        }


        function parseContent(str,isReply){
            var contentHtml='';
            $.each(JSON.parse(str),function(index,value){
                var theKey=Object.keys(value)[0];
                var theValue=value[theKey];
                switch(theKey){
                    case 'forward':
                    contentHtml+='<span class="link_style">@'+theValue['text']+':</span>';
                    break;
                    case 'topic':
                    break;
                    case 'text':
                    contentHtml+=theValue;
                    break;
                    case 'at':
                    isReply?contentHtml+='<span>@'+theValue['text']+':</span>':contentHtml+='<span class="link_style">@'+theValue['text']+':</span>';
                    break;
                    case 'anchor':
                    contentHtml+='<span class="link_style link_url">网页链接</span>';
                    break;
                }
            });
            return contentHtml;
        };
        function generateImgHtml(imgObj){
            if(imgObj!=null){
                var imgHtml='<div class="img_group img_group_';
                var imgGroupNum=imgObj.length;
                if(imgGroupNum>0){
                    if(imgGroupNum<5){
                        imgHtml+=imgGroupNum+'">';
                    }else{
                        imgHtml+='9">';
                    }
                    $.each(imgObj,function(key,value){
                        imgHtml+='<img src="'+value+'">';
                    });
                    imgHtml+='</div>';
                }
                return imgHtml;

            }else{
                return '';
            }
            
            
        };
        function generateMainTextImage(str,isReply,imgObj){
            var htmlTxt='';
            htmlTxt='<p class="timeline_text">'+parseContent(str,isReply)+'</p>';
            htmlTxt+=generateImgHtml(imgObj);
            return htmlTxt;
        };    
        
        function getVClass(type){
            var className='';
            switch (parseInt(type)){
                case 1:
                className='author_icon_person';
                break;
                case 2:
                className='author_icon_org';
                break;
                case 3:
                className='author_icon_media';
                break;
            };
            return className;
        };

        //正文+原文
        var timeline_text=generateMainTextImage(userContent,false,result['images']);

        if(result['displayType']==2){
            //转发动态/评论动态
            timeline_text+='<div class="origin_box origin_timeline"><p class="origin_text">'+parseContent(result['originalContent'],false)+'</p>'+generateImgHtml(result['originalImages'])+'</div>';
        }else if(result['displayType']!=1){
            //分享文章/发文章
            //转发文章动态
            //console.log(result['displayType']);
            var resource=result['resource'];
            if(components.isEmpty(resource)){
                var subjectObj=JSON.parse(resource),
                    keyWordHtml='',
                    keyWordV=subjectObj['keyword'],
                    coverPicHtml='';

                if(components.isEmpty(keyWordV)){
                    keyWordHtml='# '+keyWordV.replace(/,/g,' ');
                }

                if(subjectObj.hasOwnProperty('coverPic')){
                    coverPicHtml='<img src="'+subjectObj['coverPic']+'">';
                }

                timeline_text+='<div class="origin_box"><a href="../../v_1_3_9/html/article-h5.html?id='+subjectObj['id']+'&type=1"  class="subject"><div><p class="subject_title">'+subjectObj['title']+'</p><p class="subject_description">'+subjectObj['summary']+'</p><p class="subject_tag">'+keyWordHtml+'</p></div>'+coverPicHtml+'</a></div>';
                
            }else{
                timeline_text+='<div class="origin_box lost"><span class="lost_box">抱歉，此动态已被作者删除</span></div>';
            }
            
        }
        //评论
        var commentHtml='';
        $.each(commentlist,function(key,value){
            commentHtml+='<div class="comment_wrap"><div class="comment_head"><img class="user_head" src="'+value['user']['headPic']+'"><div><span class="user_name '+getVClass(value['user']['applyType'])+'">'+value['user']['nickName']+'</span><span class="timeline_time comment_time">'+components.MSToNow(value['comment']['createTime'])+'</span></div><div class="praise_wrap"><span class="praise_num">'+value['comment']['favoriteNum']+'</span></div></div><p class="comment_content">'+parseContent(value['comment']['content'],false)+'</p>';
                $.each(value['replyList'],function(keyr,valuer){
                    commentHtml+='<p class="reply_box"><span class="reply_name">'+valuer['nickName']+'</span><span class="reply_content">@'+valuer['repliedNickName']+': '+parseContent(valuer['content'],true)+'</span><span class="reply_time">'+components.MSToNow(valuer['createTime'])+'</span></p>';
                    if(keyr==2)commentHtml+='<p class="reply_more">更多回复>></p>';
                });
                commentHtml+='</div>';
        });
                //整合内容 头部 + 正文+原文 +评论
        var fillHtml='<div class="timeline_content_wrap"><div class="timeline_content_head"><img class="user_head" src="'+userHeadPic+'"><span class="user_name '+getVClass(result["applyType"])+'">'+userNickName+'</span><span class="timeline_time">'+components.MSToNow(result['createTime'])+'</span></div>'+timeline_text+'</div>'+commentHtml;
        $('.main_content').append(fillHtml);

        //微信分享配置
        require("weixinshare")(window.location.href,'分享 '+userNickName+' 的一匡动态',getMainText(userContent),userHeadPic);
    
    });

    
    var e = downloader.createBar(URLHEAD+"/images/banner.png", "");
    $(".container").after(e);
   
    $(".download-block").click(function(){
        window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta';
        
        //downloader.openApp({
          //  packageName: "com.eq.stock",
          //  scheme: 'equanta://',
           // downloadAndroid: "http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta",
         //   downloadIOS: "https://itunes.apple.com/cn/app/yi-kuang/id1137638296?mt=8"
       // });
    });
 */




});