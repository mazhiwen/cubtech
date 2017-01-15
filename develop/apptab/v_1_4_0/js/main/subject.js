define(function(require) {

    
    require('commonMain');
    var downloader=new(require('downloader'));
    var components=new(require("components"));
    var subject_img=$('.subject_img'),
        subject_title=$('.subject_title'),
        subject_desc=$('.subject_desc');

        
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
    
    AJAXMY.send(1,'/subject/web_detail',{subject_id:components.getGet('id')||'57c3d29abffc3f08941dfab5'},{},function(data){
        var dataResult=data['result'],
            dataSubject=dataResult['subject'],
            subjectTitle=dataSubject['name'],
            subjectDesc=dataSubject['description'],
            subjectImg=dataSubject['bgPic'];
        document.title=subjectTitle;
        subject_title.text(subjectTitle);
        subject_img.attr("src",subjectImg);
        subject_desc.text(subjectDesc);
        var articleListHtml='';

        $.each(dataResult['articleList'],function(key,value){
            var coverPicHtml='';
            if(value['coverPic']!=''){
                coverPicHtml='<div><img src="'+value['coverPic']+'"></div>';
            }
            articleListHtml+='<a href="../../v_1_3_9/html/article-h5.html?id='+value['id']+'&type=1"><div class="article_box"><p><img class="user_head" src="'+value['headPic']+'"><span class="user_name '+getVClass(value['applyType'])+'">'+value['nickName']+'</span><span class="user_desc">'+value['vita']+'</span><span class="time"></span></p><div class="article_content"><div class="article_text"><h3>'+value['title']+'</h3><p>'+value['summary']+'</p></div>'+coverPicHtml+'</div></div></a>';
        });
        $(".article_list").append(articleListHtml);
        //微信分享配置
        require("weixinshare")(window.location.href,'一匡专题:'+subjectTitle,subjectDesc,subjectImg);
    });

    

    var e = downloader.createBar(URLHEAD+"/images/banner.png", "");
    $(".container").after(e);

    $(".download-block").click(function(){
        window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta';
    });
 




});