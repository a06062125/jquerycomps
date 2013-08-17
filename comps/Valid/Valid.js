(function(b){JC.Valid=window.Valid=a;function a(){if(a._instance){return a._instance}a._instance=this;this._model=new d();this._view=new c(this._model);this._init()}a.prototype={_init:function(){var e=this;b([this._view,this._model]).on(d.BIND,function(f,h,g){e.on(h,g)});b([this._view,this._model]).on(d.TRIGGER,function(f,h){var g=sliceArgs(arguments);g.shift();g.shift();e.trigger(h,g)});e.on(d.CORRECT,function(f){var g=sliceArgs(arguments);g.shift();e._view.valid.apply(e._view,g)});e.on(d.ERROR,function(f){var g=sliceArgs(arguments);g.shift();e._view.error.apply(e._view,g)});e.on("FocusMsg",function(f){var g=sliceArgs(arguments);g.shift();e._view.focusmsg.apply(e._view,g)});this._view.init();return this},on:function(f,e){b(this).on(f,e);return this},trigger:function(f,e){b(this).trigger(f,e);return this},parse:function(){var e=this,g=true,f=sliceArgs(arguments);b.each(f,function(i,h){h=b(h);h.each(function(){var m=b(this);if(!e._model.isAvalible(m)){return}if(!e._model.isValid(m)){return}if(e._model.isIgnoreProcess(m)){return}var j=e._model.parseDatatype(m),k=e._model.parseSubdatatype(m),l=m.prop("nodeName").toLowerCase();JC.log("datatype:",j,k);switch(l){case"input":case"textarea":e._model.isAutoTrim(m)&&m.val(b.trim(m.val()));break}if(!e._model.reqmsg(m)){g=false;return}if(!e._model.lengthValid(m)){g=false;return}if(j&&e._model[j]&&m.val()){if(!e._model[j](m)){g=false;return}}if(k&&e._model[k]&&(m.val()||k=="alternative")){if(!e._model[k](m)){g=false;return}}e.trigger(d.CORRECT,m)})});return g},check:function(){var e=this,k=true,h=sliceArgs(arguments),g,f;b.each(h,function(m,j){j=b(j);if(e._model.isForm(j)){var l=e._model.isErrorAbort(j),i;for(g=0,f=j[0].length;g<f;g++){!e.parse(b(j[0][g]))&&(k=false);if(l&&!k){break}}}else{k=e.parse(j)}});return k},clearError:function(){var f=sliceArgs(arguments),e=this;b.each(f,function(h,g){b(g).each(function(){var m=b(this);switch(m.prop("nodeName").toLowerCase()){case"form":for(var l=0,k=m[0].length;l<k;l++){a.setValid(b(m[0][l]),1,true)}break;default:a.setValid(m,1,true);break}})});return this},isValid:function(e){return this._model.isValid(e)},formHasValue:function(e,k){var m=false,h,l;e&&(e=b(e));if(e&&e.length){for(var g=0,f=e[0].length;g<f;g++){h=b(e[0][g]);if(h.is("[disabled]")){continue}l=h.prop("nodeName").toLowerCase();if(k&&h.is(k)){continue}switch(h.prop("type").toLowerCase()){case"select-multiple":case"select-one":case"select":case"file":case"textarea":case"password":case"hidden":case"text":if(b.trim(h.val()).length){return true}break;case"checkbox":case"radio":if(h.prop("checked")){return true}break}}}return m}};a.checkAll=a.check=function(){return a.getInstance().check.apply(a.getInstance(),sliceArgs(arguments))};a.getInstance=function(){!a._instance&&new a();return a._instance};a.isValid=function(e){return a.getInstance().isValid(e)};a.setValid=function(e,f){return a.getInstance().trigger(d.CORRECT,sliceArgs(arguments))};a.setError=function(g,f,e){return a.getInstance().trigger(d.ERROR,sliceArgs(arguments))};a.focusmsg=function(e,f){return a.getInstance().trigger("FocusMsg",sliceArgs(arguments))};a.focusmsgEverytime=true;a.showValidStatus=false;a.clearError=function(){return a.getInstance().clearError.apply(a.getInstance(),sliceArgs(arguments))};a.errorAbort=false;a.autoTrim=true;a.itemCallback;a.formHasValue=function(){return a.getInstance().formHasValue.apply(a.getInstance(),sliceArgs(arguments))};function d(){this._init()}d.TRIGGER="TriggerEvent";d.BIND="BindEvent";d.ERROR="ValidError";d.CORRECT="ValidCorrect";d.SELECTOR_ERROR="~ em.error, ~ em.errormsg";d.CSS_ERROR="error errormsg";d.FILTER_ERROR="em.error em.errormsg";d.prototype={_init:function(){return this},parseDatatype:function(e){return(e.attr("datatype")||"text").toLowerCase().replace(/\-.*/,"")},parseSubdatatype:function(e){return(e.attr("subdatatype")||"").toLowerCase().replace(/\-.*/,"")},isAvalible:function(e){return e.is(":visible")&&!e.is("[disabled]")},isForm:function(e){var f;e.prop("nodeName")&&e.prop("nodeName").toLowerCase()=="form"&&(f=true);return f},isErrorAbort:function(e){var f=a.errorAbort;e.is("[errorabort]")&&(f=parseBool(e.attr("errorabort")));return f},isIgnoreProcess:function(e){return e.is("[ignoreprocess]")},isValid:function(e){e=b(e);var g,f;e.each(function(){f=b(this);if(f.is("[datatype]")||f.is("[subdatatype]")||f.is("[minlength]")||f.is("[maxlength]")||f.is("[reqmsg]")||f.is("form")){g=true}});return g},isAutoTrim:function(f){f=b(f);var g=a.autoTrim,e=getJqParent(f,"form");e.length&&e.is("[validautotrim]")&&(g=parseBool(e.attr("validautotrim")));f.is("[validautotrim]")&&(g=parseBool(f.attr("validautotrim")));return g},isReqmsg:function(e){return e.is("[reqmsg]")},isValidMsg:function(f){f=b(f);var g=a.showValidStatus,e=getJqParent(f,"form");e.length&&e.is("[validmsg]")&&(g=parseBool(e.attr("validmsg")));f.is("[validmsg]")&&(g=parseBool(f.attr("validmsg")));return g},validitemcallback:function(f){f=b(f);var h=a.itemCallback,e=getJqParent(f,"form"),g;e.length&&e.is("[validitemcallback]")&&(g=e.attr("validitemcallback"))&&(g=window[g])&&(h=g);f.is("[validitemcallback]")&&(g=f.attr("validitemcallback"))&&(g=window[g])&&(h=g);return h},isMinlength:function(e){return e.is("[minlength]")},isMaxlength:function(e){return e.is("[maxlength]")},minlength:function(e){return parseInt(e.attr("minlength"),10)||0},maxlength:function(e){return parseInt(e.attr("maxlength"),10)||0},isMinvalue:function(e){return e.is("[minvalue]")},isMaxvalue:function(e){return e.is("[maxvalue]")},isDatatarget:function(e){return e.is("[datatarget]")},datatarget:function(e){return b(e.attr("datatarget"))},minvalue:function(e,g){if(typeof g=="string"){var f=g.toLowerCase().trim();switch(f){default:return parseISODate(e.attr("minvalue"))}}else{if(g){return parseFloat(e.attr("minvalue"))||0}else{return parseInt(e.attr("minvalue"),10)||0}}},maxvalue:function(e,g){if(typeof g=="string"){var f=g.toLowerCase().trim();switch(f){default:return parseISODate(e.attr("maxvalue"))}}else{if(g){return parseFloat(e.attr("maxvalue"))||0}else{return parseInt(e.attr("maxvalue"),10)||0}}},lengthValid:function(i){var f=this,k=true,i=b(i),e=f.parseDatatype(i),j,h,l=b.trim(i.val()),g;if(!l){return k}f.isMinlength(i)&&(j=f.minlength(i));f.isMaxlength(i)&&(h=f.maxlength(i));switch(e){case"bytetext":g=f.bytelen(l);break;case"richtext":default:g=l.length;break}j&&(g<j)&&(k=false);h&&(g>h)&&(k=false);JC.log("lengthValid: ",j,h,k,l.length);!k&&b(f).trigger(d.TRIGGER,[d.ERROR,i]);return k},n:function(l,g){var e=this,o=true,m=l.val(),h=+m,j=0,n=Math.pow(10,10),f,i,k;e.isMinvalue(l)&&(j=e.minvalue(l,/\./.test(l.attr("minvalue")))||j);if(!isNaN(h)&&h>=j){l.attr("datatype").replace(/^n[^\-]*\-(.*)$/,function(q,p){k=p.split(".");f=k[0];i=k[1]});e.isMaxvalue(l)&&(n=e.maxvalue(l,/\./.test(l.attr("maxvalue")))||n);if(h>=j&&h<=n){typeof f!="undefined"&&typeof i!="undefined"&&(o=new RegExp("^(?:-|)(?:[\\d]{0,"+f+"}|)(?:\\.[\\d]{1,"+i+"}|)$").test(m));typeof f!="undefined"&&typeof i=="undefined"&&(o=new RegExp("^(?:-|)[\\d]{1,"+f+"}$").test(m));typeof f=="undefined"&&typeof i!="undefined"&&(o=new RegExp("^(?:-|)\\.[\\d]{1,"+i+"}$").test(m));typeof i=="undefined"&&/\./.test(m)&&(o=false)}else{o=false}}else{o=false}!o&&!g&&b(e).trigger(d.TRIGGER,[d.ERROR,l]);return o},nrange:function(g){var e=this,l=e.n(g),h,f,k,j,i;if(l){if(g.is("[fromNEl]")){k=e.getElement(g.attr("fromNEl"));j=g}if(g.is("[toNEl]")){k=g;j=e.getElement(g.attr("toNEl"))}if(!(k&&k.length||j&&j.length)){i=e.sametypeitems(g);if(i.length>=2){k=b(i[0]);j=b(i[1])}}if(k&&k.length||j&&j.length){JC.log("nrange",k.length,j.length);j.val(b.trim(j.val()));k.val(b.trim(k.val()));if(j[0]!=k[0]&&j.val().length&&k.val().length){l&&(l=e.n(j,true));l&&(l=e.n(k,true));l&&(+k.val())>(+j.val())&&(l=false);JC.log("nrange:",+k.val(),+j.val(),l);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,k]);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,j]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,k]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,j]);return l}}}return l},d:function(h,f){var e=this,k=b.trim(h.val()),i=true,g=parseISODate(k),j;if(k&&g){if(e.isMinvalue(h)&&(j=e.minvalue(h,"d"))){g.getTime()<j.getTime()&&(i=false)}if(i&&e.isMaxvalue(h)&&(j=e.maxvalue(h,"d"))){g.getTime()>j.getTime()&&(i=false)}}!i&&!f&&b(e).trigger(d.TRIGGER,[d.ERROR,h]);return i},date:function(){return this.d.apply(this,sliceArgs(arguments))},daterange:function(g){var e=this,l=e.d(g),h,f,i,k,j;if(l){if(g.is("[fromDateEl]")){i=e.getElement(g.attr("fromDateEl"));k=g}if(g.is("[toDateEl]")){i=g;k=e.getElement(g.attr("toDateEl"))}if(!(i&&i.length&&k&&k.length)){j=e.sametypeitems(g);if(j.length>=2){i=b(j[0]);k=b(j[1])}}if(i&&i.length||k&&k.length){JC.log("daterange",i.length,k.length);k.val(b.trim(k.val()));i.val(b.trim(i.val()));if(k[0]!=i[0]&&k.val().length&&i.val().length){l&&(l=e.d(k,true))&&(h=parseISODate(i.val()));l&&(l=e.d(i,true))&&(f=parseISODate(k.val()));l&&h&&f&&h.getTime()>f.getTime()&&(l=false);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,i]);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,k]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,i]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,k])}}}return l},time:function(f){var e=this,g=/^(([0-1]\d)|(2[0-3])):[0-5]\d:[0-5]\d$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},minute:function(f){var e=this,g=/^(([0-1]\d)|(2[0-3])):[0-5]\d$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},bankcard:function(f){var e=this,g=/^[1-9][\d]{3}(?: |)(?:[\d]{4}(?: |))(?:[\d]{4}(?: |))(?:[\d]{4})(?:(?: |)[\d]{3}|)$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},cnname:function(f){var e=this,g=e.bytelen(f.val())<32&&/^[\u4e00-\u9fa5a-zA-Z.\u3002\u2022]{2,32}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},username:function(f){var e=this,g=/^[a-zA-Z0-9][\w-]{2,30}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},idnumber:function(f){var e=this,g=/^[0-9]{15}(?:[0-9]{2}(?:[0-9xX])|)$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},mobilecode:function(g,f){var e=this,h=/^(?:13|14|15|16|18|19)[\d]{9}$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},mobile:function(f,e){return this.mobilecode(f,e)},mobilezonecode:function(g,f){var e=this,h=/^(?:\+[0-9]{1,6} |)(?:0|)(?:13|14|15|16|18|19)\d{9}$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},phonecode:function(f){var e=this,g=/^[1-9][0-9]{6,7}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},phone:function(g,f){var e=this,h=/^(?:0(?:10|2\d|[3-9]\d\d)(?: |\-|)|)[1-9][\d]{6,7}$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},phoneall:function(g,f){var e=this,h=/^(?:\+[\d]{1,6}(?: |\-)|)(?:0[\d]{2,3}(?:\-| |)|)[1-9][\d]{6,7}(?:(?: |)\#[\d]{1,6}|)$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},phonezone:function(f){var e=this,g=/^[0-9]{3,4}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},phoneext:function(f){var e=this,g=/^[0-9]{1,6}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},mobilephone:function(f){var e=this,g=this.mobilecode(f,true)||this.phone(f,true);!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},mobilephoneall:function(f){var e=this,g=this.mobilezonecode(f,true)||phoneall(f,true);!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},reg:function(g){var e=this,h=true,f;if(g.is("[reg-pattern]")){f=g.attr("reg-pattern")}if(!f){f=b.trim(g.attr("datatype")).replace(/^reg(?:\-|)/i,"")}f.replace(/^\/([\s\S]*)\/([\w]{0,3})$/,function(j,i,k){JC.log(i,k);h=new RegExp(i,k||"").test(g.val())});!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},vcode:function(g){var e=this,h,f=parseInt(b.trim(g.attr("datatype")).replace(/^vcode(?:\-|)/i,""),10)||4;JC.log("vcodeValid: "+f);h=new RegExp("^[0-9a-zA-Z]{"+f+"}$").test(g.val());!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},text:function(e){return true},bytetext:function(e){return true},richtext:function(e){return true},bytelen:function(e){return e.replace(/[^\x00-\xff]/g,"11").length},url:function(f){var e=this,g=/^((http|ftp|https):\/\/|)[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},domain:function(f){var e=this,g=/^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.(\w{2,6})(?:\/|)$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},stricdomain:function(f){var e=this,g=/^((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.(\w{2,6})$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},email:function(f){var e=this,g=/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},zipcode:function(f){var e=this,g=/^[0-9]{6}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},alternative:function(h){var e=this,i=true,g;JC.log("alternative");e.isDatatarget(h)&&(g=e.datatarget(h));!(g&&g.length)&&(g=e.samesubtypeitems(h));if(g.length&&!b.trim(h.val())){var f=false;g.each(function(){if(b(this).val()){f=true;return false}});i=f}!i&&b(e).trigger(d.TRIGGER,[d.ERROR,h,"alternativemsg",true]);!i&&g&&g.length&&g.each(function(){b(e).trigger(d.TRIGGER,[d.ERROR,b(this),"alternativemsg",true])});if(i&&g&&g.length){g.each(function(){b(e).trigger(d.TRIGGER,[d.CORRECT,b(this)])})}return i},reconfirm:function(g){var e=this,h=true,f;JC.log("reconfirm");e.isDatatarget(g)&&(f=e.datatarget(g));!(f&&f.length)&&(f=e.samesubtypeitems(g));if(f&&f.length){f.each(function(){if(g.val()!=b(this).val()){h=false}})}!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g,"reconfirmmsg",true]);!h&&f.length&&f.each(function(){b(e).trigger(d.TRIGGER,[d.ERROR,b(this),"reconfirmmsg",true])});if(h&&f&&f.length){f.each(function(){b(e).trigger(d.TRIGGER,[d.CORRECT,b(this)])})}return h},findValidEle:function(f){var e="~ em.validmsg",h=f.find(e),g;if(f.attr("validel")&&(g=_p.getElement(f.attr("validel"),f,e)).length){h=g}return h},findFocusEle:function(f){var e="~ em.focusmsg",h=f.find(e),g;if(f.attr("focusel")&&(g=_p.getElement(f.attr("focusel"),f,e)).length){h=g}return h},findErrorEle:function(g){var e=this;var f=d.SELECTOR_ERROR,h=g.find(f);if(g.attr("emel")&&(_tmp=e.getElement(g.attr("emel"),g,f)).length){h=_tmp}return h},getElement:function(e,f,g){if(/^\^$/.test(e)){g=g||d.SELECTOR_ERROR;e=b(f.parent().find(g))}else{if(/^[\w-]+$/.test(e)){e="#"+e}}e=e.replace(/[\#]+/g,"#");return b(e)},errorMsg:function(g,f,e){var h=g.is("[errmsg]")?" "+g.attr("errmsg"):g.is("[reqmsg]")?g.attr("reqmsg"):"";f&&(h=g.attr(f)||h);e&&h&&(h=" "+h);if(h&&!/^[\s]/.test(h)){switch(g.prop("type").toLowerCase()){case"file":h="请上传"+h;break;case"select-multiple":case"select-one":case"select":h="请选择"+h;break;case"textarea":case"password":case"text":h="请填写"+h;break}}return b.trim(h)},reqmsg:function(f){var g=true,e=this;if(!e.isReqmsg(f)){return g}if(f.val()&&f.val().constructor==Array){g=!!(b.trim(f.val().join("")+""))}else{g=!!b.trim(f.val()||"")}!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f,"reqmsg"]);JC.log("regmsgValid: "+g);return g},sametypeitems:function(g){var e=this,i=[],h=g.parent(),f=g.attr("datatype"),j=new RegExp(f,"i");h.find("input[datatype]").each(function(){j.test(b(this).attr("datatype"))&&i.push(b(this))});return i.length?b(i):i},samesubtypeitems:function(g){var e=this,i=[],h=g.parent(),f=g.attr("subdatatype"),j=new RegExp(f,"i");h.find("input[subdatatype]").each(function(){j.test(b(this).attr("subdatatype"))&&i.push(b(this))});return i.length?b(i):i},focusmsgeverytime:function(e){var f=a.focusmsgEverytime;e.is("[focusmsgeverytime]")&&(f=parseBool(e.attr("focusmsgeverytime")));return f}};function c(e){this._model=e}c.prototype={init:function(){return this},valid:function(g,i,f){g&&(g=b(g));var e=this,h;if(!e._model.isValid(g)){return false}setTimeout(function(){g.removeClass(d.CSS_ERROR);g.find(printf('~ em:not("em.focusmsg, em.validmsg, {0}")',d.FILTER_ERROR)).show();g.find(d.SELECTOR_ERROR).hide();g.attr("emel")&&(h=e._model.getElement(g.attr("emel"),g))&&h.hide();typeof f=="undefined"&&!g.val().trim()&&(f=1);e.validMsg(g,f);(h=e._model.validitemcallback(g))&&h(g,true)},i||150)},validMsg:function(g,f){var e=this,k=(g.attr("validmsg")||"").trim().toLowerCase();if(e._model.isValidMsg(g)){if(k=="true"||k=="1"){k=""}!k&&(k="&nbsp;");var j=e._model.findFocusEle(g),i=e._model.findValidEle(g),h=e._model.findErrorEle(g);!i.length&&(i=b('<em class="validmsg"></em>'),g.after(i));i.html(k);f?i.hide():(i.show(),j&&j.hide(),h&&h.hide())}},error:function(i,h,g){i&&(i=b(i));var f=this,e=arguments;if(!f._model.isValid(i)){return true}if(i.is("[validnoerror]")){return true}setTimeout(function(){var k=f._model.errorMsg.apply(f._model,sliceArgs(e)),j;i.addClass(d.CSS_ERROR);i.find(printf("~ em:not({0})",d.FILTER_ERROR)).hide();if(i.is("[emEl]")){(j=f._model.getElement(i.attr("emEl"),i))&&j.addClass(d.CSS_ERROR)}!(j&&j.length)&&(j=i.find(d.SELECTOR_ERROR));if(!j.length){(j=b(printf('<em class="{0}"></em>',d.CSS_ERROR))).insertAfter(i)}j.html(k).show();JC.log("error:",k)},150);(_tmp=f._model.validitemcallback(i))&&_tmp(i,false);return false},focusmsg:function(f,h){if(f&&(f=b(f)).length&&f.is("[focusmsg]")){JC.log("focusmsg",new Date().getTime());var j,e=this,k=e._model.findFocusEle(f),i=e._model.findValidEle(f),g=e._model.findErrorEle(f);if(h&&k&&k.length){k.hide();return}g.length&&g.is(":visible")&&g.hide();if(i.length&&i.is(":visible")){return}!k.length&&(k=b('<em class="focusmsg"></em>'),f.after(k));if(f.is("[validnoerror]")){j=a.getInstance().parse(f)}else{f.attr("validnoerror",true);j=a.getInstance().parse(f);f.removeAttr("validnoerror")}if(e._model.focusmsgeverytime(f)){k.html(f.attr("focusmsg")).show()}else{j&&k.html(f.attr("focusmsg")).show()}}}};b(document).delegate("input[type=text], input[type=password], textarea","blur",function(e){a.getInstance().trigger("FocusMsg",[b(this),true]);a.check(b(this))});b(document).delegate("select, input[type=file]","change",function(e){a.check(b(this))});b(document).delegate("input[type=text], input[type=password], textarea, select, input[type=file]","focus",function(e){a.getInstance().trigger("FocusMsg",[b(this)])});b(document).delegate("select, input[type=file]","blur",function(e){a.getInstance().trigger("FocusMsg",[b(this),true])})}(jQuery));