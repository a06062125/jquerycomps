(function(c){!window.JC&&(window.JC={log:function(){}});window.ZINDEX_COUNT=window.ZINDEX_COUNT||50001;window.Tips=JC.Tips=d;function d(g){g=c(g);if(!(g&&g.length)){return this}if(g.length>1){return d.init(g)}if(d.getInstance(g)){return d.getInstance(g)}d.getInstance(g,this);this._model=new f(g);this._view=new e(this._model);this._init()}d.prototype={_init:function(){var g=this;c(this._view).on("BindEvent",function(h,j,i){g.on(j,i)});c(this._view).on("TriggerEvent",function(h,j,i){g.trigger(j,i)});this._view.init();this._model.selector().on("mouseenter",a);return this},show:function(g){this._view.show(g);return this},hide:function(){this._view.hide();return this},selector:function(){return this._model.selector()},layout:function(g){return this._view.layout(g)},data:function(){return this._model.data()},on:function(h,g){c(this).on(h,g);return this},trigger:function(g){c(this).trigger(g);return this}};d.init=function(g){if(!g){return}g=c(g);if(!g.length){return}var h=[];g.each(function(){var i=c(this);if(d.getInstance(i)){return}h.push(new d(i))});return h};d.hide=function(){c("body > div.UTips").hide()};d.autoInit=true;d.tpl=null;d.offset={bottom:{x:15,y:15},left:{x:-28,y:5},top:{x:-2,y:-22}};d.minWidth=200;d.maxWidth=400;d.titleToTipsdata=function(g){g=c(g);if(!JC.Tips.autoInit||(typeof window.event=="object"&&document.attachEvent)){g.each(function(){c(this).attr("tipsData",c(this).attr("title")).removeAttr("title")})}};d.getInstance=function(g,h){h&&g&&c(g).data("TipsIns",h);return g?c(g).data("TipsIns"):null};function f(g){this.tpl=b;this._selector=g;this._data;this._init()}f.prototype={_init:function(){this.update();return this},data:function(g){g&&this.update();return this._data},update:function(){if(!(this._selector.attr("title")||this._selector.attr("tipsData"))){return}this._data=c.trim(this._selector.attr("title")||this._selector.attr("tipsData")).replace(/(?:\r\n|\n\r|\r|\n)/g,"<br />");this._selector.removeAttr("title").removeAttr("tipsData");if(this.isInited()){return}this.isInited(true)},isInited:function(g){typeof g!="undefined"&&(this._selector.data("initedTips",g));return this._selector.data("initedTips")},selector:function(){return this._selector},tipsshowcallback:function(){var g;this._selector.attr("tipsshowcallback")&&(g=window[this._selector.attr("tipsshowcallback")]);return g},tipshidecallback:function(){var g;this._selector.attr("tipshidecallback")&&(g=window[this._selector.attr("tipshidecallback")]);return g},tipsinitedcallback:function(){var g;this._selector.attr("tipsinitedcallback")&&(g=window[this._selector.attr("tipsinitedcallback")]);return g},tipstemplatesbox:function(){var g;this._selector.is("[tipstemplatesbox]")&&(g=c(this._selector.attr("tipstemplatesbox")).html().trim().replace(/[\r\n]+/g,""));return g},layout:function(){if(!this._layout){if(this.tipstemplatesbox()){this._layout=c(this.tipstemplatesbox());this._layout.appendTo(document.body)}else{this._layout=c("#JCTipsLayout");if(!(this._layout&&this._layout.length)){this._layout=c(this.tipstemplatesbox()||JC.Tips.tpl||this.tpl);this._layout.attr("id","JCTipsLayout").css("position","absolute");this._layout.appendTo(document.body)}}}return this._layout}};function e(g){this._model=g;this._layout}e.prototype={init:function(){c(this).trigger("BindEvent",["TipsShow",this._model.tipsshowcallback()]);c(this).trigger("BindEvent",["TipsHide",this._model.tipshidecallback()]);c(this).trigger("BindEvent",["TipsInited",this._model.tipsinitedcallback()]);return this},show:function(i){var q=i.pageX,p=i.pageY;q+=JC.Tips.offset.bottom.x;p+=JC.Tips.offset.bottom.y;var n=c(document).scrollTop(),m=c(document).scrollLeft();var j=c(window).width(),l=c(window).height();var r=this.layout().width(),o=this.layout().height();var t=m+j-r,g=m;var s=n+l-o,u=n;var k=false,h=false;q>t&&(q=q-r+JC.Tips.offset.left.x,p+=JC.Tips.offset.left.y,k=true);q<g&&(q=g);p>s&&(p=p-o+JC.Tips.offset.top.y,q+=JC.Tips.offset.top.x,h=true);p<u&&(p=u);k&&h&&(p-=5);this.layout().css({left:q+"px",top:p+"px"});this.layout().show();c(this).trigger("TriggerEvent",["TipsShow",this._model.tipsshowcallback()])},hide:function(){this.layout().hide();c(this).trigger("TriggerEvent","TipsHide")},layout:function(g){this._layout=this._model.layout();if(g){var i=this._model.data(g);this._layout.html(i).css({width:"auto",left:"-9999px",top:"-9999px",display:"block"});var h=this._layout.width(),j=this._layout.height();h<JC.Tips.minWidth&&this._layout.css("width",JC.Tips.minWidth+"px");h>JC.Tips.maxWidth&&this._layout.css("width",JC.Tips.maxWidth+"px")}return this._layout}};function a(j){var i=c(this),h=d.getInstance(i);h.layout(1).css("z-index",ZINDEX_COUNT++);if(!h.data()){return}h.show(j);c(document).on("mousemove",g);i.on("mouseleave",k);function g(l){if(!h.layout().is(":visible")){c(document).unbind("mousemove",g);c(i).unbind("mouseleave",k);return}h.show(l)}function k(l){c(document).unbind("mousemove",g);c(i).unbind("mouseleave",k);h.hide()}}var b='<div class="UTips"></div>';c(document).ready(function(g){setTimeout(function(){if(!JC.Tips.autoInit){return}d.titleToTipsdata(c("[title]"));c(document).delegate("*","mouseover",function(i){var h=c(this);if(d.getInstance(h)){return}if(!(h.attr("title")||h.attr("tipsData"))){return}JC.Tips.init(h);a.call(this,i)})},10)})}(jQuery));