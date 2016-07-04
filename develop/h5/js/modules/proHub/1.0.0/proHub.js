define(function (require, exports, module) {
    /**============================
     private
     ==============================*/
    var defaultUrl = "//123.56.237.44:8080/Asset3/"
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
        base: {
            //获取手机验证码
            getTelCode: function (tel, type, successFn) {
                getAjax({
                    url: "base/sms_code",
                    data: {"mobile": tel, "type": type},
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            //提交认证信息
            postSignInfo: function (data, successFn) {
                getAjax({
                    url: "auth",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            //登陆
            login: function (data, successFn) {
                getAjax({
                    url: "login",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data)
                    }
                })
            }
        },
        user: {
            //上传名片
            postCardData: function (data, successFn) {
                var _url = "user/businesscard"
                getAjax({
                    url: _url,
                    data: data,
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            //获取用户详细信息
            getUserInfo: function (token, successFn) {
                getAjax({
                    url: "user/get_user_info",
                    data: {token: token},
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            //提交用户需求调查
            postUserResearch: function (data, successFn) {
                getAjax({
                    url: "user/interesting",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            //获取管家详情
            getSteward: function (data, successFn) {
                getAjax({
                    url: "user/get_steward_detail",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            //提交问题反馈
            postFeedback: function (data, successFn) {
                getAjax({
                    url: "user/feed_back",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            //修改信息
            putUserInfo: function (data, successFn) {
                getAjax({
                    url: "user/update_user",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            },
            postMeetingInfo: function (data, successFn) {
                getAjax({
                    url: "user/add_conference",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        successFn && successFn(data);
                    }
                })
            }

        },
        pro: {
            //拉取banner图
            getBanner: function (callback) {
                /* callback({
                 "bannerlist": [{
                 "category": 1,
                 "createtime": 1457949490000,
                 "id": 3,
                 "imageurl": "../images/testImg/banner-img.png",
                 "priority": 3,
                 "url": "javascript:;"
                 }, {
                 "category": 1,
                 "createtime": 1457949406000,
                 "id": 2,
                 "imageurl": "../images/testImg/banner-img.png",
                 "priority": 2,
                 "url": "javascript:;"
                 }, {
                 "category": 1,
                 "createtime": 1457949316000,
                 "id": 1,
                 "imageurl": "../images/testImg/banner-img.png",
                 "priority": 1,
                 "url": "javascript:;"
                 }]
                 })*/
                getAjax({
                    "url": "base/banner",
                    "success": function (data) {
                        callback(data.data);
                    }
                })
            },
            //拉取热门产品信息
            getHotProInfo: function (data, callback) {
                /* callback({
                 "productlist": [{
                 "type": 5,
                 "proId": 2,
                 "startTime": "2016.3.1",
                 "endTime": "2016.4.1",
                 "name": "Magic Leap",
                 "logo": "../images/testImg/pro-logo.png",
                 "money": "10亿美金",
                 "size": "100亿美金",
                 "yield": "8.2%"
                 }, {
                 "type": 6,
                 "proId": 2,
                 "startTime": "2016.3.1",
                 "endTime": "2016.4.1",
                 "name": "Magic Leap2",
                 "logo": "../images/testImg/pro-logo.png",
                 "money": "20亿美金",
                 "size": "200亿美金",
                 "yield": "8.2%"
                 }, {
                 "type": 1,
                 "proId": 2,
                 "startTime": "2016.3.1",
                 "endTime": "2016.4.1",
                 "name": "Magic Leap2",
                 "logo": "../images/testImg/pro-logo.png",
                 "money": "20亿美金",
                 "size": "200亿美金",
                 "yield": "8.2%"
                 }, {
                 "type": 2,
                 "proId": 2,
                 "startTime": "2016.3.1",
                 "endTime": "2016.4.1",
                 "name": "Magic Leap2",
                 "logo": "../images/testImg/pro-logo.png",
                 "money": "20亿美金",
                 "size": "200亿美金",
                 "yield": "8.2%"
                 }]
                 })*/
                getAjax({
                    "url": "user/hot/productlist",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                })
            },
            //拉取历史产品信息
            getHistoryProInfo: function (data, callback) {
                getAjax({
                    "url": "user/history/productlist",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                })
            },
            //获取产品详细信息
            getProDetail: function (data, callback) {
                getAjax({
                    "url": "user/getproduct_detail",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                })
            },
            //关注产品
            postProAttention: function (data, callback) {
                getAjax({
                    "url": "user/attention_product",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                })
            },
            //取消关注产品
            cancelProAttention: function (data, callback) {
                getAjax({
                    "url": "user/cancel_attention_product",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                })
            },
            //拉取关注产品的列表
            getProAttention: function (data, callback) {
                getAjax({
                    "url": "user/attention_product_list",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                });
            },
            //获取推荐项目
            getRecommend: function (data, callback) {
                getAjax({
                    "url": "user/get_recommend_product_list",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                })
            }
        },
        report: {
            getReportList: function (data, callback) {
                getAjax({
                    "url": "user/get_report_list",
                    "data": data,
                    "success": function (data) {
                        callback(data);
                    }
                });
            }
        }
    }
    module.exports = proHub;
})