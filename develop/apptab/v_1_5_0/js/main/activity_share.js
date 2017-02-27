define(function(require) {

    
    require('commonMain');
    var downloader=new(require('downloader'));
    var components=new(require("components"));


    AJAXMY.send(
        1,
        '/event/web_detail',
        {event_id:components.getGet('id')},
        {},
        function(data){
            var dr=data['event'],
                title=dr['eventName'],
                coverImg=dr['coverPic']
                applyCount='';
            if(dr['applyCount']==0){
                applyCount='不限';
            }else{
                applyCount='限'+dr['applyCount']+'人';
            }    
            document.title='一匡活动-'+title;    
            $(".cover_img").attr("src",coverImg);
            $(".activity_title").text(title);
            $(".time").text(components.MSToYMDHM(dr['startTime'])+' 至 '+components.MSToYMDHM(dr['endTime']));
            $(".address").text(dr['addressDetail']);
            $(".count_person").text(applyCount);
            $(".org").text('主办方：'+dr['organizer']);
            $(".news-cont-area").append(dr['content']);
            //微信分享配置
            require("weixinshare")(window.location.href,title,'投资全球，一匡天下',coverImg);
        }
    );

    var e = downloader.createBar(URLHEAD+"/images/banner.png", "");
    $(".container").after(e);
   
    $(".download-block").click(function(){
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.equanta";
    });

});