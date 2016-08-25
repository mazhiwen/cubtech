/**============================
 private
 ==============================*/
var defaultUrl = "//api.e-quanta.com"
// var defaultUrl = "//app.asset3.com/Asset3/"

function getAjax(settings) {
    $.ajax({
        url: defaultUrl + settings.url,
        data: settings.data || {},
        type: settings.type || "get",
        dataType: settings.dataType || "json",
        success: function (data) {
            settings.success && settings.success(data);
        },
        error: function () {
            settings.error && settings.error();
        }
    })
}

/**============================
 public
 ==============================*/
var proHub = {
    article: {
        //获取文章信息
        getArticle: function (id, successFn) {
            getAjax({
                url: "/app/article/web_detail",
                data: {"article_id": id},
                type: "post",
                dataType: "json",
                success: function (data) {
                    successFn && successFn(data);
                }
            })
        },
        getArticleDetail: function (id, successFn) {
            getAjax({
                url: "/app/article/detail/content ",
                data: {"article_id": id},
                type: "post",
                dataType: "json",
                success: function (data) {
                    successFn && successFn(data);
                }
            })
        }
    }
}