(function(a){window.Bizs.MultiDate=d;function d(e){if(d.getInstance(e)){return d.getInstance(e)}d.getInstance(e,this);this._model=new c(e);this._view=new b(this._model);this._init()}d.prototype={_init:function(){var e=this;a([e._view,e._model]).on("BindEvent",function(f,h,g){e.on(h,g)});a([e._view,e._model]).on("TriggerEvent",function(f,h){var g=sliceArgs(arguments);g.shift();g.shift();e.trigger(h,g)});e._model.init();e._view.init();e._initDefaultValue();e._initHandlerEvent();return e},_initDefaultValue:function(){var e=this,f=e._model.qstartdate(),g=e._model.qenddate();e._model.selector(e._model.qtype());e._model.mdstartdate(f);e._model.mdenddate(g);if(!e._model.mddate().attr("name")){if(f&&g){if(f==g){e._model.mddate(formatISODate(parseISODate(f)))}else{e._model.mddate(printf("{0} 至 {1}",formatISODate(parseISODate(f)),formatISODate(parseISODate(g))))}}}else{e._model.mddate(e._model.qdate())}},_initHandlerEvent:function(){var e=this;e._model.selector().on("change",function(g){var f=a(this);JC.log("type:",f.val());e._model.settype(f.val());setTimeout(function(){JC.Calendar.pickDate(e._model.mddate()[0]);e._model.mdstartdate("");e._model.mdenddate("")},10)})},selector:function(){return this._model.selector()},on:function(f,e){a(this).on(f,e);return this},trigger:function(f,e){a(this).trigger(f,e);return this}};d.getInstance=function(e,f){if(typeof e=="string"&&!/</.test(e)){e=a(e)}if(!(e&&e.length)||(typeof e=="string")){return}typeof f!="undefined"&&e.data("MultiDateIns",f);return e.data("MultiDateIns")};d.isMultiDate=function(e){var f;e&&(e=a(e)).length&&(f=e.is("[MultiDatelayout]"));return f};function c(e){this._selector=e}c._inscount=1;c.prototype={init:function(){var e=this,h="Bizs.MultiDate_"+(c._inscount),f="Bizs.MultiDate_show_"+(c._inscount),g="Bizs.MultiDate_hide_"+(c._inscount),i="Bizs.MultiDate_layoutchange_"+(c._inscount);c._inscount++;window[h]=function(k,j,l){e.mdstartdate(formatISODate(j,""));e.mdenddate(formatISODate(l,""))};e.mddate().attr("calendarupdate",h);window[f]=function(){var j=a("body > div.UXCCalendar:visible");j.length&&JC.Tips&&JC.Tips.init(j.find("[title]"))};e.mddate().attr("calendarshow",f);window[g]=function(){JC.Tips&&JC.Tips.hide();e.updateHiddenDate()};e.mddate().attr("calendarhide",g);window[i]=function(){JC.Tips&&JC.Tips.hide();var j=a("body > div.UXCCalendar:visible");j.length&&JC.Tips&&JC.Tips.init(j.find("[title]"))};e.mddate().attr("calendarlayoutchange",i);return e},selector:function(e){typeof e!="undefined"&&this.hastype(this.qtype())&&this._selector.val(e)&&this.settype(e);return this._selector},mddate:function(e){var f=parentSelector(this.selector(),this.selector().attr("mddate"));typeof e!="undefined"&&f.val(e);return f},mdstartdate:function(e){var f=parentSelector(this.selector(),this.selector().attr("mdstartdate"));typeof e!="undefined"&&f.val(e.replace(/[^\d]/g,""));return f},mdenddate:function(e){var f=parentSelector(this.selector(),this.selector().attr("mdenddate"));typeof e!="undefined"&&f.val(e.replace(/[^\d]/g,""));return f},qtype:function(){return this.decodedata(get_url_param(this.selector().attr("name")||"")||"").toLowerCase()},qdate:function(){return this.decodedata(get_url_param(this.mddate().attr("name")||"")||"").toLowerCase()},qstartdate:function(){return this.decodedata(get_url_param(this.mdstartdate().attr("name")||"")||"").toLowerCase()},qenddate:function(){return this.decodedata(get_url_param(this.mdenddate().attr("name")||"")||"").toLowerCase()},hastype:function(e){var f=false;this.selector().find("> option").each(function(){if(a(this).val().trim()==e){f=true;return false}});return f},settype:function(e){this.mddate().val("").attr("multidate",e)},decodedata:function(e){e=e.replace(/[\+]/g," ");try{e=decodeURIComponent(e)}catch(f){}return e},updateHiddenDate:function(){var e=a.trim(this.mddate().val());if(!e){this.mdstartdate("");this.mdenddate("");return}e=e.replace(/[^\d]+/g,"");if(e.length==8){this.mdstartdate(e);this.mdenddate(e)}if(e.length==16){this.mdstartdate(e.slice(0,8));this.mdenddate(e.slice(8))}}};function b(e){this._model=e}b.prototype={init:function(){return this},hide:function(){},show:function(){}};a(document).ready(function(){a("select.js_autoMultidate").each(function(){new d(a(this))})})}(jQuery));