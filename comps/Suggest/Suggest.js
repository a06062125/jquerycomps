(function(e){window.Suggest=JC.Suggest=f;function f(a){a&&(a=e(a));if(f.getInstance(a)){return f.getInstance(a)}f.getInstance(a,this);f._allIns.push(this);this._model=new g(a);this._view=new h(this._model);this._init()}f.prototype={_init:function(){var a=this;e([a._view,a._model]).on("BindEvent",function(d,b,c){a.on(b,c)});e([a._view,a._model]).on("TriggerEvent",function(d,b,c){a.trigger(b,[c])});a._view.init();a._model.init();a.selector().attr("autocomplete","off");a._initActionEvent();a.trigger("SuggestInited");return a},update:function(b,a){var c=this;typeof a=="undefined"&&(a=b);if(c._model.sugdatafilter()){a=c._model.sugdatafilter().call(this,a)}if(a&&a.q){c._model.cache(a.q,a)}this._view.update(a)},show:function(){this._view.show();return this},hide:function(){this._view.hide();return this},selector:function(){return this._model.selector()},layout:function(){return this._model.layout()},on:function(a,b){e(this).on(a,b);return this},trigger:function(a,b){e(this).trigger(a,b);return this},_initActionEvent:function(){var a=this;a.on("SuggestUpdate",a.update);a.on("SuggestInited",function(b){if(a._model.suginitedcallback()){a._model.suginitedcallback().call(a)}});a._model.selector().on("keyup",function(d){var l=e(this),b=l.val().trim(),c=d.keyCode,k=l.data("IgnoreTime");if(k&&(new Date().getTime()-k)<300){return}JC.log("keyup",b,new Date().getTime(),c);if(c){switch(c){case 38:case 40:d.preventDefault();case 37:case 39:return;case 27:a.hide();return}}if(!b){a.update();return}if(!a._model.layout().is(":visible")){if(a._model.cache(b)){a.update(a._model.cache(b));return}}if(a._model.preValue===b){return}a._model.preValue=b;if(a._model.cache(b)){a.update(a._model.cache(b));return}JC.log(b);if(a._model.sugqueryinterval()){if(a._model.timeout){clearTimeout(a._model.timeout)}a._model.timeout=setTimeout(function(){a._model.getData(b)},a._model.sugqueryinterval())}else{a._model.getData(b)}});a._model.selector().on("keydown",function(o){var c=o.keyCode,p=e(this),b,m,d=a._model.items(),n;c==38&&(m=true);JC.log("keyup",new Date().getTime(),c);switch(c){case 38:case 40:b=a._model.nextIndex(m);if(b>=0&&b<d.length){o.preventDefault();n=e(d[b]);a._model.selectedIdentifier(n);a.selector().val(a._model.getKeyword(n));return}break;case 9:a.hide();return;case 13:a.hide();p.data("IgnoreTime",new Date().getTime());a._model.sugprevententer()&&o.preventDefault();break}});e(a._model.layout()).delegate(".js_sugItem","mouseenter",function(b){a._model.selectedIdentifier(e(this),true)});e(a._model.layout()).delegate(".js_sugItem","mouseleave",function(b){e(this).removeClass("active")});a.selector().on("click",function(b){b.stopPropagation();a.selector().trigger("keyup");f._hideOther(a)});e(a._model.layout()).delegate(".js_sugItem","click",function(c){var d=e(this),b=a._model.getKeyword(d);a.selector().val(b);a.hide();a.trigger("SuggestSelected",[d]);a._model.sugselectedcallback()&&a._model.sugselectedcallback().call(a,b)});if(a._model.sugautoposition()){e(window).on("resize",function(){if(a._model.layout().is(":visible")){a._view.show()}})}}};f.getInstance=function(b,a){if(typeof b=="string"&&!/</.test(b)){b=e(b)}if(!(b&&b.length)||(typeof b=="string")){return}typeof a!="undefined"&&b.data("SuggestInstace",a);return b.data("SuggestInstace")};f.isSuggest=function(b){var a;b&&(b=e(b)).length&&(a=b.is("[sugurl]")||b.is("sugstaticdatacb"));return a};f.autoInit=true;f.layoutTpl="";f.dataFilter;f._allIns=[];f._hideOther=function(a){for(var b=0,c=f._allIns.length;b<c;b++){if(f._allIns[b]._model._id!=a._model._id){f._allIns[b].hide()}}};function g(a){this._selector=a;this._id="Suggest_"+new Date().getTime()}g.prototype={init:function(){return this},selector:function(){return this._selector},suglayouttpl:function(){var c=this,a=f.layoutTpl||c.layoutTpl,b;(b=c.selector().attr("suglayouttpl"))&&(a=b);return a},layoutTpl:'<dl class="sug_layout js_sugLayout" style="display:none;"></dl>',layout:function(){var a=this;!a._layout&&a.selector().is("[suglayout]")&&(a._layout=parentSelector(a.selector(),a.selector().attr("suglayout")));!a._layout&&(a._layout=e(a.suglayouttpl()),a._layout.hide(),a._layout.appendTo(document.body),(a._sugautoposition=true));!a._layout.hasClass("js_sugLayout")&&a._layout.addClass("js_sugLayout");if(a.sugwidth()){a._layout.css({width:a.sugwidth()+"px"})}a._layout.css({width:a._layout.width()+a.sugoffsetwidth()+"px"});return a._layout},sugautoposition:function(){this.layout().is("sugautoposition")&&(this._sugautoposition=parseBool(this.layout().attr("sugautoposition")));return this._sugautoposition},sugwidth:function(){this.selector().is("[sugwidth]")&&(this._sugwidth=parseInt(this.selector().attr("sugwidth")));!this._sugwidth&&(this._sugwidth=this.sugplaceholder().width());return this._sugwidth},sugoffsetleft:function(){this.selector().is("[sugoffsetleft]")&&(this._sugoffsetleft=parseInt(this.selector().attr("sugoffsetleft")));!this._sugoffsetleft&&(this._sugoffsetleft=0);return this._sugoffsetleft},sugoffsettop:function(){this.selector().is("[sugoffsettop]")&&(this._sugoffsettop=parseInt(this.selector().attr("sugoffsettop")));!this._sugoffsettop&&(this._sugoffsettop=0);return this._sugoffsettop},sugoffsetwidth:function(){this.selector().is("[sugoffsetwidth]")&&(this._sugoffsetwidth=parseInt(this.selector().attr("sugoffsetwidth")));!this._sugoffsetwidth&&(this._sugoffsetwidth=0);return this._sugoffsetwidth},_dataCallback:function(a){e(this).trigger("TriggerEvent",["SuggestUpdate",a])},sugdatacallback:function(){var a=this;this.selector().is("[sugdatacallback]")&&(this._sugdatacallback=this.selector().attr("sugdatacallback"));!this._sugdatacallback&&(this._sugdatacallback=a._id+"_cb");!window[this._sugdatacallback]&&(window[this._sugdatacallback]=function(b){a._dataCallback(b)});return this._sugdatacallback},sugurl:function(a){this.selector().is("[sugurl]")&&(this._sugurl=this.selector().attr("sugurl"));!this.selector().is("[sugurl]")&&(this._sugurl="?word={0}&callback={1}");this._sugurl=printf(this._sugurl,a,this.sugdatacallback());return this._sugurl},sugneedscripttag:function(){this._sugneedscripttag=true;this.selector().is("[sugneedscripttag]")&&(this._sugneedscripttag=parseBool(this.selector().attr("sugneedscripttag")));return this._sugneedscripttag},getData:function(a){var d=this,c=this.sugurl(a),b,j="script_"+d._id;JC.log(c,new Date().getTime());if(this.sugneedscripttag()){e("#"+j).remove();b=printf('<script id="{1}" src="{0}"><\/script>',c,j);e(b).appendTo(document.body)}else{e.get(c,function(i){i=e.parseJSON(i);d._dataCallback(i)})}},cache:function(b,a){this._cache=this._cache||{};typeof a!="undefined"&&(this._cache[b]=a);return this._cache[b]},sugselectedcallback:function(){var a=this;this.selector().is("[sugselectedcallback]")&&(this._sugselectedcallback=this.selector().attr("sugselectedcallback"));return this._sugselectedcallback?window[this._sugselectedcallback]:null},suginitedcallback:function(){var a=this;this.selector().is("[suginitedcallback]")&&(this._suginitedcallback=this.selector().attr("suginitedcallback"));return this._suginitedcallback?window[this._suginitedcallback]:null},sugdatafilter:function(){var a=this;this.selector().is("[sugdatafilter]")&&(this._sugdatafilter=this.selector().attr("sugdatafilter"));this._sugdatafilter=this._sugdatafilter||f.dataFilter;return this._sugdatafilter?window[this._dataCallback]:null},sugqueryinterval:function(){this.selector().is("[sugqueryinterval]")&&(this._sugqueryinterval=parseInt(this.selector().attr("sugqueryinterval")));this._sugqueryinterval=this._sugqueryinterval||200;return this._sugqueryinterval},sugprevententer:function(){var a;this.selector().is("[sugprevententer]")&&(a=parseBool(this.selector().attr("sugprevententer")));return a},timeout:null,preValue:null,keyindex:-1,nextIndex:function(b){var a=this.items(),c=a.length;if(b){if(this.keyindex<=0){this.keyindex=c-1}else{this.keyindex--}}else{if(this.keyindex>=c-1){this.keyindex=0}else{this.keyindex++}}return this.keyindex},items:function(){return this.layout().find(".js_sugItem")},selectedIdentifier:function(a,b){this._preSelected&&this._preSelected.removeClass("active");a.addClass("active");b&&(this.keyindex=parseInt(a.attr("keyindex")));this._preSelected=a},getKeyword:function(c){var a=c.attr("keyword");try{a=decodeURIComponent(a)}catch(b){}return a},currentData:function(a){typeof a!="undefined"&&(this._currentData=a);return this._currentData},sugsubtagname:function(){var a="dd",b;(b=this.selector().attr("sugsubtagname"))&&(a=b);return a},sugplaceholder:function(){var a=this.selector();this.selector().is("[sugplaceholder]")&&(a=parentSelector(this.selector(),this.selector().attr("sugplaceholder")));return a}};function h(a){this._model=a}h.prototype={init:function(){return this},show:function(){var a=this;e(this).trigger("TriggerEvent",["SuggestBeforeShow"]);this._model.layout().css("z-index",window.ZINDEX_COUNT++);this.autoposition();this._model.layout().show();setTimeout(function(){a._model.layout().show()},10);e(this).trigger("TriggerEvent",["SuggestShow"])},autoposition:function(){if(!this._model.sugautoposition()){return}var c=this,b=c._model.sugplaceholder().offset(),a=c._model.sugplaceholder().height();c._model.layout().css({left:b.left+c._model.sugoffsetleft()+"px",top:b.top+c._model.sugoffsettop()+a+"px"})},hide:function(){this._model.layout().hide();this.reset();e(this).trigger("TriggerEvent",["SuggestHide"])},update:function(p){var q=this,r=[],a,b,c,j=q._model.sugsubtagname();if(!(p&&p.s&&p.s.length)){q.hide();return}for(var d=0,i=p.s.length;d<i;d++){b=p.s[d],c=b,a=p.q||"";if(b.indexOf(a)>-1){c=c.slice(a.length);c="<b>"+c+"</b>"}else{a=""}r.push(printf('<{4} keyword="{2}" keyindex="{3}" class="js_sugItem">{0}{1}</{4}>',a,c,encodeURIComponent(b),d,j))}q._model.layout().html(r.join(""));JC.log("suggest update");this.reset();q._model.currentData(p);e(this).trigger("TriggerEvent",["SuggestUpdated"]);q.show()},reset:function(){JC.log("suggest reset");this._model.keyindex=-1;this._model.layout().find(".js_sugItem").removeClass("active");e(this).trigger("TriggerEvent",["SuggestReset"])}};e(document).delegate("input[type=text]","focus",function(b){var c=e(this),a=f.getInstance(c);if(a||!f.isSuggest(c)||!f.autoInit){return}JC.log("Suggest input fined:",c.attr("name"),new Date().getTime());a=new f(c)});e(document).on("click",function(a){e("dl.js_sugLayout, div.js_sugLayout").hide()})}(jQuery));