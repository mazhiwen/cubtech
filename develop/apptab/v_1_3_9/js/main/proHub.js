/* @update: 2016-8-17 15:22:22 */
function getAjax(t) {
    $.ajax({
        url: defaultUrl + t.url,
        data: t.data || {},
        type: t.type || "get",
        dataType: t.dataType || "json",
        success: function(a) {
            t.success && t.success(a)
        },
        error: function() {
            t.error && t.error()
        },
        headers:t.headers
    })
}
var defaultUrl = "//testapi.e-quanta.com",
proHub = {
    article: {
        getArticle: function(t, a) {
            getAjax({
                url: "/app/article/web_detail",
                data: {
                    article_id: t
                },
                type: "post",
                dataType: "json",
                success: function(t) {
                    a && a(t)
                },
                headers:{
                	"api-version":"1.4"
                }
            })
        },
        getArticleDetail: function(t, a) {
            getAjax({
                url: "/app/article/detail/content ",
                data: {
                    article_id: t
                },
                type: "post",
                dataType: "json",
                success: function(t) {
                    a && a(t)
                }
            })
        }
    }
};