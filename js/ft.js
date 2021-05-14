 //图片全部加载完成
;(function($){
    $.fn.imgLoad = function(callback){
        var len = this.length,
            cur = 0;

        var loadImg = function(url){
            var val= url;
            var img=new Image();
            if(img.readyState){
                img.onreadystatechange = function(){
                    if(img.readyState=="complete"||img.readyState=="loaded"){
                        loadComplete();
                    }
                }
            }else{
                img.onload=function(){
                    if(img.complete==true){
                        loadComplete();
                    }
                }
            }
            img.src=val;
        }

        var loadComplete = function(){
            cur++;
            if( cur == len ){
                callback();
            }
        }

        this.each(function(){
            loadImg($(this).attr("src"));
        });
    }
})(jQuery);
//导航效果
;(function ($) {
    $.fn.navHover = function(options){
        var nav = this;
        var c = nav.find("li");
        //var c_c;

        c.hover(function(){
            $(this).addClass("hover");
            $(this).children("div").show();
        },function(){
            $(this).removeClass("hover");
            $(this).children("div").hide();
        })
    }
})(jQuery);
//分享展示
;(function($){
    $.fn.shareShow = function(options){
        var defaults = {
            min : 226,
            max : 296
            
        }

        var o = $.extend(defaults, options);
        var box = this;

        box.width(o.min).children("span").toggle(function(){
            box.animate({width:o.max});
        },function(){
            box.animate({width:o.min});
        })
    }
})(jQuery);
//无缝滚动
;(function ($) {
    $.fn.myCarousel = function (options) {
        var defaults = {
            prev : null,
            next : null,
            page : null,
            auto : 3000
        }
        var options = $.extend(defaults, options);

        var box = this,
            prev = options.prev && $(options.prev),
            next = options.next && $(options.next),
            page = options.page && $(options.page).children(),
            auto = options.auto,
            c = this.children(),
            c_f = c.first(),
            c_l = c.last(),
            c_w = c_f.outerWidth(),
            c_len = c.length,
            cur = 0,
            si;

        var move = function (dir) {
            var dir = dir || "next";
            if (dir == "next") {
                cur++;
                if (cur <= c_len - 1) {
                    box.stop(true, true).animate({
                        left : -c_w * cur
                    });
                } else {
                    c_f.css("left", c_w * c_len);
                    box.stop(true, true).animate({
                        left : -c_w * cur
                    }, function () {
                        c_f.css("left", 0);
                        box.css("left", 0);
                    });
                    cur = 0;
                }
            } else {
                cur--;
                if (cur >= 0) {
                    box.stop(true, true).animate({
                        left : -c_w * cur
                    });
                } else {
                    c_l.css("left", -c_w * c_len);
                    box.stop(true, true).animate({
                        left : -c_w * cur
                    }, function () {
                        c_l.css("left", 0);
                        box.css("left", -c_w * (c_len - 1));
                    });
                    cur = c_len - 1;
                }
            }
            page && page.eq(cur).addClass("on").siblings().removeClass("on");
        }
        var change = function (dir) {
            auto && clearInt();
            move(dir);
            auto && setInt();
        }
        var setInt = function () {
            clearInt();
            auto && (si = setInterval(function () {
                change("next");
            }, auto));
        }
        var clearInt = function () {
            if (si) {
                clearInterval(si);
            }
        }
        var init = function () {
            if (c_len <= 1) {
                return;
            }
            box.width(c_w * c_len);
            auto && box.hover(clearInt, setInt);
            prev && prev.bind("click", function () {
                change("back");
            });
            next && next.bind("click", function () {
                change("next");
            });
            page && page.bind("click", function () {
                cur = $(this).index() - 1;
                change("next");
            });
            auto && setInt();
        };
        init();
        return this;
    }
})(jQuery);
;(function($){
    $.fn.questionShow = function(options){
        var defaults = {
            qClass : ".question_item",
            aClass : ".answer_content"
        }
        var options = $.extend(defaults,options);

        var q = this.find(options.qClass);
        var a = this.find(options.aClass);
        var cur = 0;

        q.each(function(i){
            $(this).bind("click",function(){
                if( i != cur) {
                    a.eq(cur).slideUp();
                    a.eq(i).slideDown();
                    cur = i;
                }
            });
        });
    }
})(jQuery);
;(function($){
    $.fn.pdDetailKvShow = function(options){
        var defaults = {
            btn : "#pd_detail_btn"
        }

        var options = $.extend(defaults,options);

        var box = this,
            img = box.children(),
            btn = $(options.btn),
            num = 0,
            n = 0;
        
        $(img).imgLoad(function(){
            btn.bind("click",function(){
                n = Math.abs(num%2-1);
                n ? $(this).text("产品细节"):$(this).text("产品展示");
                img.eq(n).fadeIn().siblings().fadeOut();
                num++;
            });
        })

    }
})(jQuery);
;(function($){
    $.fn.pdPointShow = function(){
        var point = this.find("dt");
		var img;
		var imgSrc;
        
        point.bind("click",function(){
			_this = $(this);
            if( ! $(this).hasClass("on") ){
				imgSrc = _this.attr("rel");
				img = _this.parent().next("img");
				imgSrc && img.attr("src",imgSrc);
                _this.addClass("on").siblings("dt").removeClass("on");
                _this.next().show().siblings("dd").hide();
            }else{
				 _this.removeClass("on").next().hide();
			}
        })
    }
})(jQuery);
;(function($){
    $.fn.conceptShow = function(options){
        var defaults = {
            btn : "#concept_btn",
            close : "#concept_close"
        }
        
        var options = $.extend(defaults,options);

        var box = this,
            btn = $(options.btn),
            close = $(options.close);

        btn.bind("click",function(){
            box.show(300);
        });
        
        close.bind("click",function(){
            box.hide(300);
        })
    }
})(jQuery);
;(function($){
	$.fn.conceptPointShow = function(){
		this.children("div").hover(function(){
			$(this).children("a").fadeIn(200);
		},function(){
			$(this).children("a").fadeOut(300);
		});
	}
})(jQuery);
;(function($){
    $.fn.packageKvShow = function(options){
        var defaults = {
            tit : "#package_tit"
        }

        var options = $.extend(defaults,options)

        var tit = $(options.tit);
        var img = this.children("img");

        $(img).imgLoad(function(){
            setTimeout(function(){
                img.eq(1).fadeOut(1000,function(){
                    tit.addClass("light");
                });
            },2000)
        });
    }
})(jQuery);
;(function ($) {
    $.fn.lightBox = function (settings) {
        settings = jQuery.extend({
            overlayBgColor : '#000',
            overlayOpacity : 0.8,
            fixedNavigation : false,
            imageLoading : 'images/lightbox-ico-loading.gif',
            imageBtnPrev : 'images/lightbox-btn-prev.gif',
            imageBtnNext : 'images/lightbox-btn-next.gif',
            imageBtnClose : 'images/lightbox-btn-close.gif',
            imageBlank : 'images/lightbox-blank.gif',
            containerBorderSize : 10,
            containerResizeSpeed : 400,
            txtImage : 'Image',
            txtOf : 'of',
            keyToClose : 'c',
            keyToPrev : 'p',
            keyToNext : 'n',
            imageArray : [],
            activeImage : 0
        }, settings);
        var jQueryMatchedObj = this;
        function _initialize() {
            _start(this, jQueryMatchedObj);
            return false;
        }
        function _start(objClicked, jQueryMatchedObj) {
            $('embed, object, select').css({
                'visibility' : 'hidden'
            });
            _set_interface();
            settings.imageArray.length = 0;
            settings.activeImage = 0;
            if (jQueryMatchedObj.length == 1) {
                settings.imageArray.push(new Array(objClicked.getAttribute('href'), objClicked.getAttribute('title')));
            } else {
                for (var i = 0; i < jQueryMatchedObj.length; i++) {
                    settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'), jQueryMatchedObj[i].getAttribute('title')));
                }
            }
            while (settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href')) {
                settings.activeImage++;
            }
            _set_image_to_view();
        }
        function _set_interface() {
            $('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + settings.imageLoading + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' + settings.imageBtnClose + '"></a></div></div></div></div>');
            var arrPageSizes = ___getPageSize();
            $('#jquery-overlay').css({
                backgroundColor : settings.overlayBgColor,
                opacity : settings.overlayOpacity,
                width : arrPageSizes[0],
                height : arrPageSizes[1]
            }).fadeIn();
            var arrPageScroll = ___getPageScroll();
            $('#jquery-lightbox').css({
                top : arrPageScroll[1] + (arrPageSizes[3] / 10),
                left : arrPageScroll[0]
            }).show();
            $('#jquery-overlay,#jquery-lightbox').click(function () {
                _finish();
            });
            $('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function () {
                _finish();
                return false;
            });
            $(window).resize(function () {
                var arrPageSizes = ___getPageSize();
                $('#jquery-overlay').css({
                    width : arrPageSizes[0],
                    height : arrPageSizes[1]
                });
                var arrPageScroll = ___getPageScroll();
                $('#jquery-lightbox').css({
                    top : arrPageScroll[1] + (arrPageSizes[3] / 10),
                    left : arrPageScroll[0]
                });
            });
        }
        function _set_image_to_view() {
            $('#lightbox-loading').show();
            if (settings.fixedNavigation) {
                $('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
            } else {
                $('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
            }
            var objImagePreloader = new Image();
            objImagePreloader.onload = function () {
                $('#lightbox-image').attr('src', settings.imageArray[settings.activeImage][0]);
                _resize_container_image_box(objImagePreloader.width, objImagePreloader.height);
                objImagePreloader.onload = function () {};
            };
            objImagePreloader.src = settings.imageArray[settings.activeImage][0];
        };
        function _resize_container_image_box(intImageWidth, intImageHeight) {
            var intCurrentWidth = $('#lightbox-container-image-box').width();
            var intCurrentHeight = $('#lightbox-container-image-box').height();
            var intWidth = (intImageWidth + (settings.containerBorderSize * 2));
            var intHeight = (intImageHeight + (settings.containerBorderSize * 2));
            var intDiffW = intCurrentWidth - intWidth;
            var intDiffH = intCurrentHeight - intHeight;
            $('#lightbox-container-image-box').animate({
                width : intWidth,
                height : intHeight
            }, settings.containerResizeSpeed, function () {
                _show_image();
            });
            if ((intDiffW == 0) && (intDiffH == 0)) {
                if ($.browser.msie) {
                    ___pause(250);
                } else {
                    ___pause(100);
                }
            }
            $('#lightbox-container-image-data-box').css({
                width : intImageWidth
            });
            $('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({
                height : intImageHeight + (settings.containerBorderSize * 2)
            });
        };
        function _show_image() {
            $('#lightbox-loading').hide();
            $('#lightbox-image').fadeIn(function () {
                _show_image_data();
                _set_navigation();
            });
            _preload_neighbor_images();
        };
        function _show_image_data() {
            $('#lightbox-container-image-data-box').slideDown('fast');
            $('#lightbox-image-details-caption').hide();
            if (settings.imageArray[settings.activeImage][1]) {
                $('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();
            }
            if (settings.imageArray.length > 1) {
                $('#lightbox-image-details-currentNumber').html(settings.txtImage + ' ' + (settings.activeImage + 1) + ' ' + settings.txtOf + ' ' + settings.imageArray.length).show();
            }
        }
        function _set_navigation() {
            $('#lightbox-nav').show();
            $('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({
                'background' : 'transparent url(' + settings.imageBlank + ') no-repeat'
            });
            if (settings.activeImage != 0) {
                if (settings.fixedNavigation) {
                    $('#lightbox-nav-btnPrev').css({
                        'background' : 'url(' + settings.imageBtnPrev + ') left 15% no-repeat'
                    }).unbind().bind('click', function () {
                            settings.activeImage = settings.activeImage - 1;
                            _set_image_to_view();
                            return false;
                        });
                } else {
                    $('#lightbox-nav-btnPrev').unbind().hover(function () {
                        $(this).css({
                            'background' : 'url(' + settings.imageBtnPrev + ') left 15% no-repeat'
                        });
                    }, function () {
                        $(this).css({
                            'background' : 'transparent url(' + settings.imageBlank + ') no-repeat'
                        });
                    }).show().bind('click', function () {
                            settings.activeImage = settings.activeImage - 1;
                            _set_image_to_view();
                            return false;
                        });
                }
            }
            if (settings.activeImage != (settings.imageArray.length - 1)) {
                if (settings.fixedNavigation) {
                    $('#lightbox-nav-btnNext').css({
                        'background' : 'url(' + settings.imageBtnNext + ') right 15% no-repeat'
                    }).unbind().bind('click', function () {
                            settings.activeImage = settings.activeImage + 1;
                            _set_image_to_view();
                            return false;
                        });
                } else {
                    $('#lightbox-nav-btnNext').unbind().hover(function () {
                        $(this).css({
                            'background' : 'url(' + settings.imageBtnNext + ') right 15% no-repeat'
                        });
                    }, function () {
                        $(this).css({
                            'background' : 'transparent url(' + settings.imageBlank + ') no-repeat'
                        });
                    }).show().bind('click', function () {
                            settings.activeImage = settings.activeImage + 1;
                            _set_image_to_view();
                            return false;
                        });
                }
            }
            _enable_keyboard_navigation();
        }
        function _enable_keyboard_navigation() {
            $(document).keydown(function (objEvent) {
                _keyboard_action(objEvent);
            });
        }
        function _disable_keyboard_navigation() {
            $(document).unbind();
        }
        function _keyboard_action(objEvent) {
            if (objEvent == null) {
                keycode = event.keyCode;
                escapeKey = 27;
            } else {
                keycode = objEvent.keyCode;
                escapeKey = objEvent.DOM_VK_ESCAPE;
            }
            key = String.fromCharCode(keycode).toLowerCase();
            if ((key == settings.keyToClose) || (key == 'x') || (keycode == escapeKey)) {
                _finish();
            }
            if ((key == settings.keyToPrev) || (keycode == 37)) {
                if (settings.activeImage != 0) {
                    settings.activeImage = settings.activeImage - 1;
                    _set_image_to_view();
                    _disable_keyboard_navigation();
                }
            }
            if ((key == settings.keyToNext) || (keycode == 39)) {
                if (settings.activeImage != (settings.imageArray.length - 1)) {
                    settings.activeImage = settings.activeImage + 1;
                    _set_image_to_view();
                    _disable_keyboard_navigation();
                }
            }
        }
        function _preload_neighbor_images() {
            if ((settings.imageArray.length - 1) > settings.activeImage) {
                objNext = new Image();
                objNext.src = settings.imageArray[settings.activeImage + 1][0];
            }
            if (settings.activeImage > 0) {
                objPrev = new Image();
                objPrev.src = settings.imageArray[settings.activeImage - 1][0];
            }
        }
        function _finish() {
            $('#jquery-lightbox').remove();
            $('#jquery-overlay').fadeOut(function () {
                $('#jquery-overlay').remove();
            });
            $('embed, object, select').css({
                'visibility' : 'visible'
            });
        }
        function ___getPageSize() {
            var xScroll,
                yScroll;
            if (window.innerHeight && window.scrollMaxY) {
                xScroll = window.innerWidth + window.scrollMaxX;
                yScroll = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight) {
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else {
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
            var windowWidth,
                windowHeight;
            if (self.innerHeight) {
                if (document.documentElement.clientWidth) {
                    windowWidth = document.documentElement.clientWidth;
                } else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            } else if (document.documentElement && document.documentElement.clientHeight) {
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else if (document.body) {
                windowWidth = document.body.clientWidth;
                windowHeight = document.body.clientHeight;
            }
            if (yScroll < windowHeight) {
                pageHeight = windowHeight;
            } else {
                pageHeight = yScroll;
            }
            if (xScroll < windowWidth) {
                pageWidth = xScroll;
            } else {
                pageWidth = windowWidth;
            }
            arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
            return arrayPageSize;
        };
        function ___getPageScroll() {
            var xScroll,
                yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
                xScroll = self.pageXOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {
                yScroll = document.documentElement.scrollTop;
                xScroll = document.documentElement.scrollLeft;
            } else if (document.body) {
                yScroll = document.body.scrollTop;
                xScroll = document.body.scrollLeft;
            }
            arrayPageScroll = new Array(xScroll, yScroll);
            return arrayPageScroll;
        };
        function ___pause(ms) {
            var date = new Date();
            curDate = null;
            do {
                var curDate = new Date();
            } while (curDate - date < ms);
        };
        return this.unbind('click').click(_initialize);
    };
})(jQuery);
;(function($){
	$.fn.scrollPhotoList = function(option){
	
		var box = this,
			c = box.children(),
			c_w = c.outerWidth(true)+3,
			p_w = box.parent().width();
			len = c.length,
			num = option.moveNum,
			prev = $(option.prev),
			next = $(option.next),
			page = len % num == 0 ? parseInt(len / num) : parseInt(len / num) + 1,
			currPage = 1;
		
		var move = function(i){
			box.stop(true,true).animate({ left : -i*p_w },300);
		}
		var init = function(){
			if ( len <= num ){
				prev.hide();
				next.hide();	
			}else{
				box.width( c_w * len );
				prev.bind("click",function(){
					if( currPage == 1 ){
						return;
					}
					currPage--;
					move(currPage-1);
				});
				next.bind("click",function(){
					if( currPage == page ){
						return;
					}
					currPage++;
					move(currPage-1);
				});
			}
		}
		init();
	}
})(jQuery);
;(function($){
    $.fn.scrollPhotoList2 = function(option){
    
        var box = this,
            c = box.children(),
            c_w = c.outerWidth(true),
            p_w = box.parent().width();
            len = c.length,
            num = option.pageNum,
            prev = $(option.prev),
            next = $(option.next),
            page = len % num == 0 ? parseInt(len / num) : parseInt(len / num) + 1,
            currPage = 1;
        
        var move = function(i){
            box.stop(true,true).animate({ left : -i*c_w },300);
        }
        var init = function(){
            if ( len <= num ){
                prev.hide();
                next.hide();    
            }else{
                box.width( c_w * len );
                prev.bind("click",function(){
                    if( currPage == 1 ){
                        return;
                    }
                    currPage--;
                    move(currPage-1);
                });
                next.bind("click",function(){
                    if( currPage == len-(num-1) ){
                        return;
                    }
                    currPage++;
                    move(currPage-1);
                });
            }
        }
        init();
    }
})(jQuery);
;(function (a) {
    a.fn.touchwipe = function (c) {
        var b = {
            min_move_x : 20,
            min_move_y : 20,
            wipeLeft : function () {},
            wipeRight : function () {},
            wipeUp : function () {},
            wipeDown : function () {},
            wipe : function () {},
            wipehold : function () {},
            preventDefaultEvents : true
        };
        if (c) {
            a.extend(b, c)
        }
        this.each(function () {
            var h;
            var g;
            var j = false;
            var i = false;
            var e;
            function m() {
                this.removeEventListener("touchmove", d);
                h = null;
                j = false;
                clearTimeout(e)
            }
            function d(q) {
                if (b.preventDefaultEvents) {
                    q.preventDefault()
                }
                if (j) {
                    var n = q.touches[0].pageX;
                    var r = q.touches[0].pageY;
                    var p = h - n;
                    var o = g - r;
                    if (Math.abs(p) >= b.min_move_x) {
                        m();
                        if (p > 0) {
                            b.wipeLeft()
                        } else {
                            b.wipeRight()
                        }
                    } else {
                        if (Math.abs(o) >= b.min_move_y) {
                            m();
                            if (o > 0) {
                                b.wipeUp()
                            } else {
                                b.wipeDown()
                            }
                        }
                    }
                }
            }
            function k() {
                clearTimeout(e);
                if (!i && j) {
                    b.wipe()
                }
                i = false
            }
            function l() {
                i = true;
                b.wipehold()
            }
            function f(n) {
                if (n.touches.length == 1) {
                    h = n.touches[0].pageX;
                    g = n.touches[0].pageY;
                    j = true;
                    this.addEventListener("touchmove", d, false);
                    e = setTimeout(l, 750)
                }
            }
            if ("ontouchstart" in document.documentElement) {
                this.addEventListener("touchstart", f, false);
                this.addEventListener("touchend", k, false)
            }
        });
        return this
    };
})(jQuery);
;(function($){
	$.fn.hoverShow = function(option){
		var show = option.show;
		this.hover(function(){
			$(this).find(show).show();
		},function(){
			$(this).find(show).hide();
		})
	}
})(jQuery);
;(function($){
	$.fn.autoSize = function(option){
		var ele = this,
			minW = option.minWidth,
			maxW = option.maxWidth,
			minH = option.minHeight,
			maxH = option.maxHeight,
			main = $(option.mainBox),
			doc = document.documentElement,
			boxW = 0,
			docW = 0,
			boxH = 0,
			docH = 0;
		
		var	changeSize = function(){
			docW = parseInt(doc.clientWidth);
			docH = parseInt(doc.clientHeight);
			if(minW && docW < minW){
				boxW = minW;
			}else if(maxW && docW < maxW){
				boxW = docW;
			}else if( maxW ) {
				boxW = maxW;
			}else{
				boxW = docW;
			}
			if(minH && docH < minH){
				boxH = minH;
			}else if(maxH && docH < maxH){
				boxH = docH;
			}else if( maxH ) {
				boxH = maxH;
			}else{
				boxH = docH;
			}
			ele.width(boxW);
			(minH || maxH) && main.height(boxH-38);
		}
		var	init = function(){
			changeSize();
			$(window).resize(function(){
				changeSize();
			});
		}
		init();
	}
})(jQuery);
;(function($){
	$.fn.showNext = function(option){
		var option = $.extend({ on : "on", next : "dd" },option),
		    dt = this,
			curr = dt.filter(".on").length ? 0:100;
		dt.first().addClass(option.on).next().show();
		dt.each(function(index){
			$(this).bind("click",function(){
				if( curr == index ){ 
					$(this).removeClass(option.on).next().hide();
					curr = 101;
				}else{
					$(this).addClass(option.on).siblings().removeClass(option.on);
					$(this).next().show().siblings(option.next).hide();
					curr = index;
				}
			})
		})
	}
})(jQuery);
;(function($){})(jQuery);
//全局执行
;(function ($) {
    $(function(){
        $("#nav").navHover();
        //$(".s_nav").shareShow();
    })
})(jQuery)





$(function(){
	/*$(".page_job dt").bind("click",function(){
		$(this).next().toggle().siblings("dd").hide();			
		$(this).siblings("dt").removeClass("cur");
		if(! $(this).hasClass("cur")){
			$(this).addClass("cur");
		}
	});
	$("dt.ly3").bind("click",function(){
		if( $(this).parent().parent().prev().hasClass("hi") ){
			$(this).parent().parent().prev().hide();
		}
	})
	$("dt.ly1").bind("click",function(){
		$(this).next().find("dt").show();	
		$(this).next().find("dd").hide();
		$(this).next().find("dd.ly2").show();	
	})*/
	
	$(".page_project dt").bind("click",function(){
		$(this).next().toggle().siblings("dd").hide();			
		$(this).siblings("dt").removeClass("cur");
		if(! $(this).hasClass("cur")){
			$(this).addClass("cur");
		}
		
	});
	$(".cover_list li").bind("click",function(){
		var i = $(this).index();
		$(".coop_desc").eq(i).show().siblings().hide();
		$(this).addClass("cur").siblings().removeClass("cur");
	})
	/*$(".case li").bind("click",function(){
		var i = $(this).index();
		$(".case_desc").eq(i).show().siblings().hide();
		$(this).addClass("cur").siblings().removeClass("cur");
	})*/
	
})
var ddShow = function() {
	$("dt").bind("click",function(){
		$(this).next().toggle().siblings("dd").hide();			
		$(this).siblings("dt").removeClass("cur");
		if(! $(this).hasClass("cur")){
			$(this).addClass("cur");
		}
	})
}
var mtnPage = function(){
	var mtn = $(".desc_body"),
		mtn_c = $(".desc_body .mtn_cont"),
		mtn_h = mtn.innerHeight()
		mtn_c_h = mtn_c.innerHeight(),
		hj = parseInt( mtn_c_h / mtn_h ),
		eh = mtn_h * ( hj +1),
		m_prev = mtn.parent().find(".prev"),
		m_next = mtn.parent().find(".next");
		
	mtn_c.css("height", eh);
	m_next.bind("click",function(){
		var now_top = $(".desc_body").scrollTop()+mtn_h;
		$(".desc_body").animate({
           	scrollTop : (now_top)
        });
	});	
	m_prev.bind("click",function(){
		var now_top = $(".desc_body").scrollTop()-mtn_h;
		$(".desc_body").animate({
           	scrollTop : (now_top)
       	});
	});	
}


var chooseTab = function(){
	$(".choose_menu li").bind("click",function(){
		var i = $(this).index();
		$(".desc_box").eq(i).show().siblings(".desc_box").hide();
		$(this).addClass("on").siblings().removeClass("on");
	})	
}

eventTester = function(e){  
    Media = document.getElementById("media");
    Media.addEventListener(e,function(){  
        $(this).fadeOut();
        $(".padimg").fadeIn();
    });
} 
imgFade = function(ms) {
    var col_prev = $(ms.p),
        col_next = $(ms.n),
        item_wrap = $(ms.wrap),
        item_it = item_wrap.children(),
        item_len = item_it.length,
        cur = 0,
        fnsi;
    var getNext = function(){
        cur++;
        if(cur >= item_len){
            cur = 0;
        }
        item_it.eq(cur).fadeIn('slow').siblings().hide();
    }
    var getPrev = function(){
        cur--;
        if(cur < 0){
            cur = item_len - 1;
        }
        item_it.eq(cur).fadeIn('slow').siblings().hide();
    }
    var clearInt = function(){
        if(fnsi){
            clearInterval(fnsi);
        }
    }
    var setInt = function(){
        clearInt();
        fnsi = setInterval(function(){
            getNext();
        },5000)
    }
    var init = function() {
        item_it.eq(cur).show().siblings().hide();
        setInt();
        col_prev.bind("click",function(){
            clearInt();
            getPrev();
            setInt();
        });
        col_next.bind("click",function(){
            clearInt();
            getNext();
            setInt();
        });
    }
    return init();
}
var nShow = function(sbt){
    var sbt= $(sbt);
    var sbx = sbt.next();
    var nosbx = true;
    sbx.mouseenter(function(){
        nosbx = false;
    });
    sbx.mouseleave(function(){
        nosbx = true;
    });
    sbt.bind("click",function(){
        nosbx = false;
        $(this).hide().next().show().animate({top:0},"");
    });
    $(document).click(function(){
        if( nosbx==true ){
            sbx.animate({top:162},"").end().hide();
            sbt.show();
        }
    });
}

var layout = function(ly){
    var lay = $(ly.ly),
        op = $(ly.op),
        b_w = ly.box_width,
        b_top = ly.box_top
        box = lay.find(".box");
    var init = function(){
        lay.prepend("<div class='"+ "zz'></div>");
        box.prepend("<span id='"+ "ly_close'></span>");
        box.css({"width" : b_w , "top" : b_top});
        op.bind("click",function(){
            lay.fadeIn();
            return false;
        });
        box.find("#ly_close").live("click",function(){
            lay.fadeOut();
        });
    }
    return init();
}




if(location.href=='http://www.cfldcn.com/' || location.href=='http://www.cfldcn.com'){
	var system ={ 
	   win : false, 
	   mac : false, 
	   xll : false 
	}; 
	//检测平台 
	var p = navigator.platform; 
	system.win = p.indexOf("Win") == 0; 
	system.mac = p.indexOf("Mac") == 0; 
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
	//跳转语句 
	if(system.win||system.mac||system.xll){ 
	}else{ 
		location.href="http://t.cfldcn.com";	
	} 
}
$(function(){
	/*$(".nav li.has_list").hover(function(){
		$(this).children("a").addClass("curr");
		$(this).children("div").slideDown(400);							
	},function(){
		$(this).children("a").removeClass("curr");
		$(this).children("div").slideUp(400);
		
	   }
	);*/

	$(".focusBox").slide({ mainCell:".pic",effect:"fold", autoPlay:true, delayTime:100, trigger:"click"});

	$(".home_content_01 .ohbox_differ").slide({ mainCell:"ul",delayTime:100,vis:3,scroll:1,effect:"leftLoop",autoPage:true,prevCell:".prev",nextCell:".next" });

	$(".piclist_differ li").hover(function(){

		$(this).find(".show_02").animate({'top':'2px'});
	},

		function(){
			$(this).find(".show_02").animate({'top':'119px'});
		})
})