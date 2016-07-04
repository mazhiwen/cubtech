/**
 * Created by SDX on 2016/3/12.
 * vision:1.0
 * title:
 * e-mail:373409324@jd.com
 */
define(function (require, exports, module) {

    function WebSlider(settings) {
        this.slideHolder = settings.slideHolder; //整体容器
        this.scrollHolder = settings.scrollHolder; //滚动区域
        this.loop = settings.loop || false;
        this.autoPlay = settings.autoPlay || false;
        this.pagination = settings.pagination;  //index按钮
        this.changeTime = settings.changeTime || 5000;
        this.currentClass = settings.currentClass; //当前index下按钮的Class
        this.init();
    }

    WebSlider.prototype = {
        init: function () {
            var self = this;
            this.itemLength = this.scrollHolder.children().length; //总共几页
            if (this.itemLength <= 1) {
                this.pagination.hide();
                return false;
            }

            this.sliding = false;
            this.moveStartTime = 0;
            if (this.loop) {
                var originHtml = this.scrollHolder.html();
                this.scrollHolder.html(originHtml + originHtml);
                this.currentIndex = this.itemLength;  //当前页索引
            } else {
                this.currentIndex = 0;
            }
            this.realIndex = 0;   //换算后索引
            var ua = navigator.userAgent.toLowerCase();
            this.isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;
            this.reset(function () {
                self.bindEvent();
            });

            return this;
        },
        reset: function (callback) {
            var self = this;
            setTimeout(function () {
                self.itemWidth = $(window).width(); //页宽
                self.slideTimer = null;
                self.currentX = -self.itemWidth * self.currentIndex;    //当前偏移量
                var target = "translateX(" + self.currentX + "px)"
                self._animate(self.scrollHolder, target, 0);
                if (self.autoPlay)self._autoPlay();
                callback && callback();
            }, 300)


        },
        _autoPlay: function () {
            var self = this;
            clearInterval(self.autoTimer);
            self.autoTimer = setInterval(function () {
                self.slideToCurrent("next");
            }, self.changeTime)
        },
        bindEvent: function () {
            var _this = this;
            var lastX = 0;
            var lastY = 0;
            var lastTime = 0;
            var moveX = 0;
            var startX = 0;
            var disX = 0;
            var scrollPage = false;  //是否触发了向下滚动
            var slideStart = false;//是否点击在轮播区内
            var sliding = false; //是否轮播中
            this.slideHolder
                .on("touchstart", function (e) {
                    _this.moveStartTime = new Date().getTime();
                    lastX = e.changedTouches[0].clientX;
                    lastY = e.changedTouches[0].clientY;
                    startX = e.changedTouches[0].clientX;
                    _this.scrollHolder.css({"transition": "0s", "-webkit-transition": "0s"});
                    clearInterval(_this.autoTimer);
                    slideStart = true;
                })
            $(document)
                .on("touchmove", function (e) {
                    var curTime = new Date().getTime();
                    if (slideStart && !scrollPage && curTime - lastTime > 30) {
                        moveHandler(e);
                        lastTime = curTime;
                    }
                }).on("touchend", function () {
                if (slideStart && sliding) {
                    _this.slideToCurrent();
                }
                slideStart = false;
                scrollPage = false;
                sliding = false;
                if (_this.autoPlay)_this._autoPlay();
            })

            $(window).on('orientationchange', function (e) {
                if (_this.isiOS) {
                    _this.reset();
                } else {
                    setTimeout(function () {
                        _this.reset();
                    }, 500)
                }
            });
            function moveHandler(e) {
                disX = e.changedTouches[0].clientX - lastX;
                moveX = e.changedTouches[0].clientX - startX;
                disY = e.changedTouches[0].clientY - lastY;
                if ((Math.abs(disY) > Math.abs(disX)) && !scrollPage && !sliding) {   //判断初始状态是滚动页面还是轮播
                    scrollPage = true;
                } else {
                    sliding = true;
                    e.preventDefault();
                    _this.slide(disX, moveX);
                    lastX = e.changedTouches[0].clientX;
                }
                lastY = e.changedTouches[0].clientY;
            }

        },
        slide: function (disX, moveX) {
            if (this.sliding)return false;
            var target = "";
            disX = this.currentX + disX;
            if (!this.loop && this.realIndex == 0 && disX > 0) {  //橡皮筋效果
                target = "translateX(" + moveX / 3 + "px)";
            } else if (!this.loop && this.realIndex == this.itemLength - 1 && disX < 0) {
                target = "translateX(" + (disX - moveX / 3 * 2) + "px)"
            } else {
                target = "translateX(" + disX + "px)"
            }
            this._animate(this.scrollHolder, target, 0);
            this.currentX = disX;
        },
        slideToCurrent: function (next) {
            var _this = this;
            if (_this.sliding)return false;
            _this.sliding = true;
            var totalMove = (this.currentX - (-this.itemWidth * this.currentIndex)) / this.itemWidth; //单次滑动的比例
            var totalMoveTime = new Date().getTime() - this.moveStartTime; //单次滑动的时间
            if (totalMove > 0.5 || (totalMoveTime < 300 && totalMove > 0)) {
                this.currentIndex = Math.max(0, this.currentIndex - 1);
            } else if (totalMove < -0.5 || (totalMoveTime < 300 && totalMove < 0) || next) {
                if (!this.loop) {
                    this.currentIndex = Math.min(this.itemLength - 1, this.currentIndex + 1);
                } else {
                    this.currentIndex = Math.min(this.itemLength * 2 - 1, this.currentIndex + 1);
                }
            }
            this.realIndex = this.currentIndex % this.itemLength;
            this.pagination.children().eq(this.realIndex).addClass(this.currentClass).siblings().removeClass(this.currentClass);
            this.currentX = (-this.currentIndex) * this.itemWidth;
            var target = "translateX(" + this.currentX + "px)";
            this._animate(this.scrollHolder, target, 0.3);
            clearTimeout(this.slideTimer);
            this.slideTimer = setTimeout(function () {
                _this.sliding = false;
                if (_this.currentIndex >= _this.itemLength * 2 - 1 && _this.loop) {
                    _this.currentIndex = _this.itemLength - 1;
                    _this.currentX = -_this.currentIndex * _this.itemWidth
                    var target = "translateX(" + _this.currentX + "px)";
                    _this._animate(_this.scrollHolder, target, 0);
                } else if (_this.currentIndex <= 0 && _this.loop) {
                    _this.currentIndex = _this.itemLength;
                    _this.currentX = -_this.itemWidth * _this.itemLength;
                    var target = "translateX(-" + _this.currentX + "px)";
                    _this._animate(_this.scrollHolder, target, 0);
                }
            }, 300);
        },
        _animate: function (obj, target, time) {
            obj.css({
                "transition": time + "s",
                "-webkit-transition": time + "s",
                "transform": target,
                "-webkit-transform": target,
                "transition-timing-function": "ease-out",
                "-webkit-transition-timing-function": "ease-out"
            });
            return obj;
        }
    }

    module.exports = WebSlider;
})
