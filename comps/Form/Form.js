(function(a){window.JCForm=JC.Form={disableButton:function(c,b){if(!c){return}c=a(c);b=b||1000;c.attr("disabled",true);setTimeout(function(){c.attr("disabled",false)},b)}}}(jQuery));(function(a){JC.Form.initCheckAll=function(d){d=a(d);var e=d.find("input[type=checkbox][checktype][checkfor]");e.each(function(){var f=a(this),g=f.attr("checktype").toLowerCase(),h=f.attr("checkfor");if(g!="all"||!h){return}c(f,h);if(!f.data("initedCheckall")){f.data("initedCheckall",true);a(document).delegate(h,"click",function(j){var i=a(this);if(b(i)){return}c(f,h)})}})};a(document).ready(function(d){JC.Form.initCheckAll(a(document))});a(document).delegate("input[type=checkbox][checktype][checkfor]","click",function(e){var d=a(this),f=d.attr("checktype").toLowerCase(),g=d.attr("checkfor");JC.log(f,g);switch(f){case"all":a(g).each(function(){var h=a(this);if(b(h)){return}if(h.is("[disabled]")){return}d.prop("checked")&&h.prop("checked",true);!d.prop("checked")&&h.prop("checked",false)});break;case"inverse":a(g).each(function(){var h=a(this);if(b(h)){return}if(h.is("[disabled]")){return}if(h.prop("checked")){h.prop("checked",false)}else{h.prop("checked",true)}});if(d.is("[checkall]")){c(d.attr("checkall"),g)}break}});function b(d){d=a(d);return d.is("[checktype]")&&d.is("[checkfor]")}function c(e,f){var d=true,e=a(e),f=a(f);f.each(function(){var g=a(this);if(b(g)){return}if(g.is("[checktype]")||g.is("[checkfor]")){return}if(!g.prop("checked")){return d=false}});JC.log("_isAll: ",d);e&&e.length&&e.prop("checked",d)}}(jQuery));(function(c){JC.Form.initAutoSelect=g;function g(h){var i=[];h&&(h=c(h));if(g.isSelect(h)){i.push(new b(h))}else{if(h&&h.length){h.find("select[defaultselect]").each(function(){i.push(new b(c(this)))})}}return i}var f={isSelect:function(h){var i;h&&(h=c(h))&&h.is("select")&&h.is("[defaultselect]")&&(i=true);return i},hideEmpty:false,dataFilter:null,beforeInited:null,inited:null,change:null,allChanged:null,triggerInitChange:true,randomurl:false,processUrl:null,getInstance:function(h,i){var j;h&&(h=c(h))&&(typeof i!="undefined"&&h.data("SelectIns",i),j=h.data("SelectIns"));return j}};for(var a in f){g[a]=f[a]}function b(h){this._model=new e(h);this._view=new d(this._model,this);this._init()}b.prototype={_init:function(){var h=this;c.each(h._model.items(),function(j,i){g.getInstance(c(i),h)});h._model.beforeInited()&&h.on("SelectBeforeInited",h._model.beforeInited());h.on("SelectInited",function(){var i=h._model.first();while(h._model.next(i)){i.on("change",h._responeChange);i=h._model.next(i)}h._model.isInited(true);h._model.inited()&&h._model.inited().call(h)});h.on("SelectChange",function(j,i){h._model.change(i)&&h._model.change(i).call(i,j,h)});h._model.allChanged()&&h.on("SelectAllChanged",h._model.allChanged());h.trigger("SelectBeforeInited");h._update(h._model.first(),h._firstInitCb);return h},on:function(h,i){c(this).on(h,i);return this},trigger:function(i,h){c(this).trigger(i,h);return this},first:function(){return this._model.first()},last:function(){return this._model.last()},items:function(){return this._model.items()},isFirst:function(h){return this._model.isFirst(h)},isLast:function(h){return this._model.isLast(h)},isInited:function(){return this._model.isInited()},data:function(h){return this._model.data(h)},_responeChange:function(j){var i=c(this),h=g.getInstance(i),k=h._model.next(i);JC.log("_responeChange:",i.attr("name"),i.val());if(!(k&&k.length)){h.trigger("SelectChange")}else{h._update(k,h._changeCb,i.val())}},_changeCb:function(i,k){var h=this,j=h._model.next(i);h.trigger("SelectChange",[i]);if(h._model.isLast(i)){h.trigger("SelectAllChanged")}if(j&&j.length){JC.log("_changeCb:",i.val(),j.attr("name"),i.attr("name"));h._update(j,h._firstInitCb,i.val())}return this},_firstInitCb:function(i,k){var h=this,j=h._model.next(i);h._model.triggerInitChange()&&(JC.log("triggerInitChange",i.attr("name")),i.trigger("change"));h.trigger("SelectChange",[i]);if(h._model.isLast(i)){h.trigger("SelectAllChanged");h.trigger("SelectInited")}if(j&&j.length){JC.log("_firstInitCb:",i.val(),j.attr("name"),i.attr("name"));h._update(j,h._firstInitCb,i.val())}return this},_update:function(h,j,i){if(this._model.isStatic(h)){this._updateStatic(h,j,i)}else{if(this._model.isAjax(h)){this._updateAjax(h,j,i)}else{this._updateNormal(h,j,i)}}return this},_updateStatic:function(i,l,j){var h=this,k;JC.log("static select");if(h._model.isFirst(i)){typeof j=="undefined"&&(j=h._model.selectparentid(i)||"");if(typeof j!="undefined"){k=h._model.datacb(i)(j)}}else{k=h._model.datacb(i)(j)}h._view.update(i,k);l&&l.call(h,i,k);return this},_updateAjax:function(i,n,k){var h=this,m,j=h._model.next(i),l;JC.log("ajax select");if(h._model.isFirst(i)){typeof k=="undefined"&&(k=h._model.selectparentid(i)||"");if(typeof k!="undefined"){l=h._model.selecturl(i,k);c.get(l,function(o){o=c.parseJSON(o);h._view.update(i,o);n&&n.call(h,i,o)})}}else{l=h._model.selecturl(i,k);c.get(l,function(o){JC.log("_url:",l,k);o=c.parseJSON(o);h._view.update(i,o);n&&n.call(h,i,o)})}return this},_updateNormal:function(i,m,k){var h=this,l;JC.log("normal select");if(h._model.isFirst(i)){var j=h._model.next(i);if(j&&j.length){h._update(j,m,i.val());return this}}else{l=h._model.datacb(i)(k)}h._view.update(i,l);m&&m.call(h,i,l);return this}};function e(h){this._selector=h;this._items=[];this._isInited=false;this._init()}e.prototype={_init:function(){this._findAllItems(this._selector);JC.log("select items.length:",this._items.length);this._initRelationship();return this},_findAllItems:function(h){this._items.push(h);if(h.is("[selecttarget]")){this._findAllItems(c(h.attr("selecttarget")))}},_initRelationship:function(){this._selector.data("FirstSelect",true);if(this._items.length>1){this._items[this._items.length-1].data("LastSelect",true);for(var h=0;h<this._items.length;h++){var j=this._items[h],k=this._items[h-1];if(k){j.data("PrevSelect",k);k.data("NextSelect",j);j.data("parentSelect",k)}}}},items:function(){return this._items},first:function(){return this._items[0]},last:function(){return this._items[this._items-1]},next:function(h){return h.data("NextSelect")},prev:function(h){return h.data("PrevSelect")},isFirst:function(h){return !!h.data("FirstSelect")},isLast:function(h){return !!h.data("LastSelect")},isStatic:function(h){return h.is("[selectdatacb]")},isAjax:function(h){return h.is("[selecturl]")},isInited:function(h){typeof h!="undefined"&&(this._isInited=h);return this._isInited},datacb:function(h){var i;h.attr("selectdatacb")&&(i=window[h.attr("selectdatacb")]);return i},selectparentid:function(h){var i;h.attr("selectparentid")&&(i=h.attr("selectparentid"));h.removeAttr("selectparentid");return i||""},selectvalue:function(h){var i=h.attr("selectvalue");h.removeAttr("selectvalue");return i||""},randomurl:function(h){var i=g.randomurl;h.is("[selectrandomurl]")&&(i=parseBool(h.attr("selectrandomurl")));return i},triggerInitChange:function(){var i=g.triggerInitChange,h=this.first();h.attr("selecttriggerinitchange")&&(i=parseBool(h.attr("selecttriggerinitchange")));return i},hideempty:function(h){var i=g.hideEmpty;h&&h.length&&h.is("[selecthideempty]")&&(i=parseBool(h.attr("selecthideempty")));return i},selecturl:function(h,i){var j=g.processUrl,k=h.attr("selecturl")||"";h.attr("selectprocessurl")&&window[h.attr("selectprocessurl")]&&(j=window[h.attr("selectprocessurl")]);k=printf(k,i);this.randomurl(h)&&(k=add_url_params(k,{rnd:new Date().getTime()}));j&&(k=j.call(h,k,i));return k},_userdatafilter:function(h){var i;h.attr("selectdatafilter")&&(i=window[h.attr("selectdatafilter")]);return i},dataFilter:function(h,j){var i=this._userdatafilter(h)||g.dataFilter;i&&(j=i(j,h));return j},beforeInited:function(){var i=g.beforeInited,h=this.first();h.attr("selectbeforeInited")&&window[h.attr("selectbeforeInited")]&&(i=window[h.attr("selectbeforeinited")]);return i},inited:function(){var i=g.inited,h=this.first();h.attr("selectinited")&&window[h.attr("selectinited")]&&(i=window[h.attr("selectinited")]);return i},change:function(h){var i=g.change;h.attr("selectchange")&&window[h.attr("selectchange")]&&(i=window[h.attr("selectchange")]);return i},allChanged:function(){var i=g.allChanged,h=this.first();h.attr("selectallchanged")&&window[h.attr("selectallchanged")]&&(i=window[h.attr("selectallchanged")]);return i},data:function(h,i){typeof i!="undefined"&&(h.data("SelectData",i));return h.data("SelectData")},hasVal:function(h,j){var i=false,j=j.toString();h.find("option").each(function(){var k=c(this);if(k.val()==j){i=true;return false}});return i}};function d(i,h){this._model=i;this._control=h;this._init()}d.prototype={_init:function(){return this},update:function(k,p){var h=this._model.selectvalue(k);p=this._model.dataFilter(k,p);this._model.data(k,p);this._control.trigger("SelectItemBeforeUpdate",[k,p]);this._removeExists(k);if(!p.length){if(this._model.hideempty(k)){k.hide();this._control.trigger("SelectItemUpdated",[k,p]);return}}else{!k.is(":visible")&&k.show()}var l=[],o,q;for(var n=0,m=p.length;n<m;n++){o=p[n];l.push(printf('<option value="{0}" {2}>{1}</option>',o[0],o[1],q))}c(l.join("")).appendTo(k);if(this._model.hasVal(k,h)){k.val(h)}this._control.trigger("SelectItemUpdated",[k,p])},_removeExists:function(h){h.find("> option:not([defaultoption])").remove()}};c(document).ready(function(h){setTimeout(function(){g(document.body)},100)})}(jQuery));(function(b){JC.Form.initAutoFill=function(d,e){if(!(d&&d.length)){d=b(document)}e=e||location.href;JC.log("JC.Form.initAutoFill");d.find("form.js_autoFillUrlForm").each(function(){var f=b(this);f.find("input[type=text][name],input[type=password][name],textarea[name]").each(function(){var g=b(this);if(has_url_param(e,g.attr("name"))){g.val(c(get_url_param(e,g.attr("name")).replace(/[\+]/g," ")))}});f.find("select[name]").each(function(){var g=b(this),h=c(get_url_param(e,g.attr("name")).replace(/[\+]/g," "));if(has_url_param(e,g.attr("name"))){if(a(g,h)){g.val(get_url_param(e,g.attr("name")))}else{g.attr("selectvalue",h)}}})})};b(document).ready(function(d){JC.Form.initAutoFill()});JC.Form.initAutoFill.decodeFunc;function c(e){try{e=(JC.Form.initAutoFill.decodeFunc||decodeURIComponent)(e)}catch(d){}return e}function a(d,f){var e=false,f=f.toString();d.find("option").each(function(){var g=b(this);if(g.val()==f){e=true;return false}});return e}}(jQuery));(function(a){JC.Form.initNumericStepper=function(c){c&&(c=a(c));c.delegate(".js_NStepperPlus, .js_NStepperMinus","click",function(h){var d=a(this),g=b.target(d);if(!(g&&g.length)){return}var f=parseInt(b.fixed(g),10)||0;var k=a.trim(g.val()),i=b.step(g);k=(f?parseFloat(k):parseInt(k,10))||0;var j=b.minvalue(g),e=b.maxvalue(g);d.hasClass("js_NStepperPlus")&&(k+=i);d.hasClass("js_NStepperMinus")&&(k-=i);k<j&&(k=j);k>e&&(k=e);JC.log(j,e,k,f,i);g.val(k.toFixed(f));b.callback(g)&&b.callback(g).call(g,d)})};JC.Form.initNumericStepper.onchange;var b={target:function(d){var c;if(d.attr("nstarget")){if(/^\~/.test(d.attr("nstarget"))){c=d.parent().find(d.attr("nstarget").replace(/^\~[\s]*/g,""));!(c&&c.length)&&(c=a(d.attr("nstarget")))}else{c=a(d.attr("nstarget"))}}return c},fixed:function(c){return c.attr("nsfixed")},step:function(c){return parseFloat(c.attr("nsstep"))||1},minvalue:function(c){return parseFloat(c.attr("nsminvalue")||c.attr("minvalue"))||0},maxvalue:function(c){return parseFloat(c.attr("nsmaxvalue")||c.attr("maxvalue"))||100},callback:function(c){var e=JC.Form.initNumericStepper.onchange,d;c.attr("nschangecallback")&&(d=window[c.attr("nschangecallback")])&&(e=d);return e}};a(document).ready(function(c){JC.Form.initNumericStepper(a(document))})}(jQuery));