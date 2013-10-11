(function(b){JC.Valid=window.Valid=a;function a(){var e=sliceArgs(arguments);if(e.length){return a.check.apply(null,e)}if(a._instance){return a._instance}a._instance=this;this._model=new d();this._view=new c(this._model);this._init()}a.prototype={_init:function(){var e=this;b([this._view,this._model]).on(d.BIND,function(f,h,g){e.on(h,g)});b([this._view,this._model]).on(d.TRIGGER,function(f,h){var g=sliceArgs(arguments).slice(2);e.trigger(h,g)});e.on(d.CORRECT,function(f){var g=sliceArgs(arguments).slice(1);e._view.valid.apply(e._view,g)});e.on(d.ERROR,function(f){var g=sliceArgs(arguments).slice(1);e._view.error.apply(e._view,g)});e.on("FocusMsg",function(f){var g=sliceArgs(arguments).slice(1);e._view.focusmsg.apply(e._view,g)});this._view.init();return this},on:function(f,e){b(this).on(f,e);return this},trigger:function(f,e){b(this).trigger(f,e);return this},parse:function(){var e=this,g=true,f=sliceArgs(arguments);b.each(f,function(i,h){h=b(h);h.each(function(){var l=b(this);if(!e._model.isAvalible(l)){return}if(!e._model.isValid(l)){return}if(a.ignore(l)){return}var j=e._model.parseDatatype(l),k=l.prop("nodeName").toLowerCase();switch(k){case"input":case"textarea":(l.attr("type")||"").toLowerCase()!="file"&&e._model.isAutoTrim(l)&&l.val(b.trim(l.val()));break}if(!e._model.reqmsg(l)){g=false;return}if(!e._model.lengthValid(l)){g=false;return}if(j&&e._model[j]&&l.val()){if(!e._model[j](l)){g=false;return}}var m=l.attr("subdatatype");if(m){m=m.replace(/[\s]+/g,"").split(/[,\|]/);b.each(m,function(n,o){o=e._model.parseSubdatatype(o);if(o&&e._model[o]&&(l.val()||o=="alternative")){if(!e._model[o](l)){g=false;return false}}});if(!g){return}}e.trigger(d.CORRECT,l)})});return g},check:function(){var e=this,k=true,h=sliceArgs(arguments),g,f;b.each(h,function(m,j){j=b(j);a.isFormValid=false;if(e._model.isForm(j)){a.isFormValid=true;var l=e._model.isErrorAbort(j),i;for(g=0,f=j[0].length;g<f;g++){var n=b(b(j[0][g]));if(!e._model.isValid(n)){continue}!e.parse(n)&&(k=false);if(l&&!k){break}}}else{if(a.isFormControl(j)){if(!e._model.isValid(j)){return}!e.parse(j)&&(k=false)}else{!e.check(j.find(a._formControls))&&(k=false)}}});return k},clearError:function(){var f=sliceArgs(arguments),e=this;b.each(f,function(h,g){b(g).each(function(){var m=b(this);switch(m.prop("nodeName").toLowerCase()){case"form":for(var l=0,k=m[0].length;l<k;l++){a.setValid(b(m[0][l]),1,true)}break;default:a.setValid(m,1,true);break}})});return this},isValid:function(e){return this._model.isValid(e)}};a.checkAll=a.check=function(){return a.getInstance().check.apply(a.getInstance(),sliceArgs(arguments))};a.getInstance=function(){!a._instance&&new a();return a._instance};a.dataValid=function(e,g,i,f){var h=false,j="datavalidmsg";e&&(e=b(e));if(typeof g!="undefined"){h=g;e.attr("datavalid",g);if(!i){if(g){e.trigger("blur",[true])}else{f&&(j=" "+f);a.setError(e,j,true)}}}else{if(e&&e.length){h=parseBool(e.attr("datavalid"))}}return h};a.isValid=function(e){return a.getInstance().isValid(e)};a.setValid=function(e,f){return a.getInstance().trigger(d.CORRECT,sliceArgs(arguments))};a.setError=function(h,g,f){if(g&&g.trim()&&/^[\s]/.test(g)){var e="autoGenerateErrorMsg";h.attr(e,g);g=e}return a.getInstance().trigger(d.ERROR,sliceArgs(arguments))};a.focusmsg=function(e,f){return a.getInstance().trigger("FocusMsg",sliceArgs(arguments))};a.focusmsgEverytime=true;a.emDisplayType="inline";a.showValidStatus=false;a.clearError=function(){return a.getInstance().clearError.apply(a.getInstance(),sliceArgs(arguments))};a.errorAbort=false;a.autoTrim=true;a.itemCallback;a.ignore=function(e,g){e=b(e);if(!(e&&e.length)){return true}var f=false;if(typeof g!="undefined"){g?e.removeAttr("ignoreprocess"):e.attr("ignoreprocess",true);f=g}else{e.is("[ignoreprocess]")&&((e.attr("ignoreprocess")||"").trim()?(f=parseBool(e.attr("ignoreprocess"))):(f=true))}return f};a._formControls="input, select, textarea";a.isFormControl=function(e){var f=false;e&&(e=b(e)).length&&(f=e.is(a._formControls));return f};function d(){this._init()}d.TRIGGER="TriggerEvent";d.BIND="BindEvent";d.ERROR="ValidError";d.CORRECT="ValidCorrect";d.SELECTOR_ERROR="~ em.error, ~ em.errormsg";d.CSS_ERROR="error errormsg";d.FILTER_ERROR="em.error em.errormsg";d.prototype={_init:function(){return this},parseDatatype:function(e){var f="";if(typeof e=="string"){f=e}else{f=e.attr("datatype")||"text"}return f.toLowerCase().replace(/\-.*/,"")},parseSubdatatype:function(e){var f="";if(typeof e=="string"){f=e}else{f=e.attr("subdatatype")||""}return f.toLowerCase().replace(/\-.*/,"")},isAvalible:function(e){return e.is(":visible")&&!e.is("[disabled]")},isForm:function(e){var f;e.prop("nodeName")&&e.prop("nodeName").toLowerCase()=="form"&&(f=true);return f},isErrorAbort:function(e){var f=a.errorAbort;e.is("[errorabort]")&&(f=parseBool(e.attr("errorabort")));return f},isValid:function(e){e=b(e);var g,f;e.each(function(){f=b(this);if(f.is("[datatype]")||f.is("[subdatatype]")||f.is("[minlength]")||f.is("[maxlength]")||f.is("[reqmsg]")||f.is("form")){g=true}});return g},isAutoTrim:function(f){f=b(f);var g=a.autoTrim,e=getJqParent(f,"form");e&&e.length&&e.is("[validautotrim]")&&(g=parseBool(e.attr("validautotrim")));f.is("[validautotrim]")&&(g=parseBool(f.attr("validautotrim")));return g},isReqmsg:function(e){return e.is("[reqmsg]")},isValidMsg:function(f){f=b(f);var g=a.showValidStatus,e=getJqParent(f,"form");e&&e.length&&e.is("[validmsg]")&&(g=parseBool(e.attr("validmsg")));f.is("[validmsg]")&&(g=parseBool(f.attr("validmsg")));return g},validitemcallback:function(f){f=b(f);var h=a.itemCallback,e=getJqParent(f,"form"),g;e&&e.length&&e.is("[validitemcallback]")&&(g=e.attr("validitemcallback"))&&(g=window[g])&&(h=g);f.is("[validitemcallback]")&&(g=f.attr("validitemcallback"))&&(g=window[g])&&(h=g);return h},isMinlength:function(e){return e.is("[minlength]")},isMaxlength:function(e){return e.is("[maxlength]")},minlength:function(e){return parseInt(e.attr("minlength"),10)||0},maxlength:function(e){return parseInt(e.attr("maxlength"),10)||0},isMinvalue:function(e){return e.is("[minvalue]")},isMaxvalue:function(e){return e.is("[maxvalue]")},isDatatarget:function(e,f){var h=false,g="datatarget";f&&(f+=g)&&(h=e.is("["+f+"]"));!h&&(h=e.is("["+g+"]"));return h},datatarget:function(e,f){var h,g="datatarget";f&&(f+=g)&&(f=e.attr(f))&&(h=parentSelector(e,f));!(h&&h.length)&&(h=parentSelector(e,e.attr(g)));return h},minvalue:function(e,g){if(typeof g=="string"){var f=g.toLowerCase().trim();switch(f){default:return parseISODate(e.attr("minvalue"))}}else{if(g){return parseFloat(e.attr("minvalue"))||0}else{return parseInt(e.attr("minvalue"),10)||0}}},maxvalue:function(e,g){if(typeof g=="string"){var f=g.toLowerCase().trim();switch(f){default:return parseISODate(e.attr("maxvalue"))}}else{if(g){return parseFloat(e.attr("maxvalue"))||0}else{return parseInt(e.attr("maxvalue"),10)||0}}},lengthValid:function(i){var f=this,k=true,i=b(i),e=f.parseDatatype(i),j,h,l=b.trim(i.val()),g;if(!l){return k}f.isMinlength(i)&&(j=f.minlength(i));f.isMaxlength(i)&&(h=f.maxlength(i));switch(e){case"bytetext":g=f.bytelen(l);break;case"richtext":default:g=l.length;break}j&&(g<j)&&(k=false);h&&(g>h)&&(k=false);JC.log("lengthValid: ",j,h,k,l.length);!k&&b(f).trigger(d.TRIGGER,[d.ERROR,i]);return k},n:function(l,g){var e=this,o=true,m=l.val(),h=+m,j=0,n=Math.pow(10,10),f,i,k;e.isMinvalue(l)&&(j=e.minvalue(l,/\./.test(l.attr("minvalue")))||j);if(!isNaN(h)&&h>=j){l.attr("datatype").replace(/^n[^\-]*\-(.*)$/,function(q,p){k=p.split(".");f=k[0];i=k[1]});e.isMaxvalue(l)&&(n=e.maxvalue(l,/\./.test(l.attr("maxvalue")))||n);if(h>=j&&h<=n){typeof f!="undefined"&&typeof i!="undefined"&&(o=new RegExp("^(?:-|)(?:[\\d]{0,"+f+"}|)(?:\\.[\\d]{1,"+i+"}|)$").test(m));typeof f!="undefined"&&typeof i=="undefined"&&(o=new RegExp("^(?:-|)[\\d]{1,"+f+"}$").test(m));typeof f=="undefined"&&typeof i!="undefined"&&(o=new RegExp("^(?:-|)\\.[\\d]{1,"+i+"}$").test(m));typeof i=="undefined"&&/\./.test(m)&&(o=false)}else{o=false}}else{o=false}!o&&!g&&b(e).trigger(d.TRIGGER,[d.ERROR,l]);return o},nrange:function(g){var e=this,l=e.n(g),h,f,k,j,i;if(l){if(g.is("[fromNEl]")){k=e.getElement(g.attr("fromNEl"),g);j=g}if(g.is("[toNEl]")){k=g;j=e.getElement(g.attr("toNEl"),g)}if(!(k&&k.length||j&&j.length)){i=e.sametypeitems(g);if(i.length>=2){k=b(i[0]);j=b(i[1])}}if(k&&k.length||j&&j.length){JC.log("nrange",k.length,j.length);j.val(b.trim(j.val()));k.val(b.trim(k.val()));if(j[0]!=k[0]&&j.val().length&&k.val().length){l&&(l=e.n(j,true));l&&(l=e.n(k,true));l&&(+k.val())>(+j.val())&&(l=false);JC.log("nrange:",+k.val(),+j.val(),l);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,k]);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,j]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,k]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,j]);return l}}}return l},d:function(h,f){var e=this,k=b.trim(h.val()),i=true,g=parseISODate(k),j;if(k&&g){if(e.isMinvalue(h)&&(j=e.minvalue(h,"d"))){g.getTime()<j.getTime()&&(i=false)}if(i&&e.isMaxvalue(h)&&(j=e.maxvalue(h,"d"))){g.getTime()>j.getTime()&&(i=false)}}!i&&!f&&b(e).trigger(d.TRIGGER,[d.ERROR,h]);return i},date:function(){return this.d.apply(this,sliceArgs(arguments))},daterange:function(g){var e=this,l=e.d(g),h,f,i,k,j;if(l){if(g.is("[fromDateEl]")){i=e.getElement(g.attr("fromDateEl"),g);k=g}if(g.is("[toDateEl]")){i=g;k=e.getElement(g.attr("toDateEl"),g)}if(!(i&&i.length&&k&&k.length)){j=e.sametypeitems(g);if(j.length>=2){i=b(j[0]);k=b(j[1])}}if(i&&i.length||k&&k.length){JC.log("daterange",i.length,k.length);k.val(b.trim(k.val()));i.val(b.trim(i.val()));if(k[0]!=i[0]&&k.val().length&&i.val().length){l&&(l=e.d(k,true))&&(h=parseISODate(i.val()));l&&(l=e.d(i,true))&&(f=parseISODate(k.val()));l&&h&&f&&h.getTime()>f.getTime()&&(l=false);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,i]);l&&b(e).trigger(d.TRIGGER,[d.CORRECT,k]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,i]);!l&&b(e).trigger(d.TRIGGER,[d.ERROR,k])}}}return l},time:function(f){var e=this,g=/^(([0-1]\d)|(2[0-3])):[0-5]\d:[0-5]\d$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},minute:function(f){var e=this,g=/^(([0-1]\d)|(2[0-3])):[0-5]\d$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},bankcard:function(f){var e=this,g=/^[1-9][\d]{3}(?: |)(?:[\d]{4}(?: |))(?:[\d]{4}(?: |))(?:[\d]{4})(?:(?: |)[\d]{3}|)$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},cnname:function(f){var e=this,g=e.bytelen(f.val())<32&&/^[\u4e00-\u9fa5a-zA-Z.\u3002\u2022]{2,32}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},username:function(f){var e=this,g=/^[a-zA-Z0-9][\w-]{2,30}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},idnumber:function(f){var e=this,g=/^[0-9]{15}(?:[0-9]{2}(?:[0-9xX])|)$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},mobilecode:function(g,f){var e=this,h=/^(?:13|14|15|16|18|19)[\d]{9}$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},mobile:function(f,e){return this.mobilecode(f,e)},mobilezonecode:function(g,f){var e=this,h=/^(?:\+[0-9]{1,6} |)(?:0|)(?:13|14|15|16|18|19)\d{9}$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},phonecode:function(f){var e=this,g=/^[1-9][0-9]{6,7}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},phone:function(g,f){var e=this,h=/^(?:0(?:10|2\d|[3-9]\d\d)(?: |\-|)|)[1-9][\d]{6,7}$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},phoneall:function(g,f){var e=this,h=/^(?:\+[\d]{1,6}(?: |\-)|)(?:0[\d]{2,3}(?:\-| |)|)[1-9][\d]{6,7}(?:(?: |)(?:\#|\-)[\d]{1,6}|)$/.test(g.val());!f&&!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},phonezone:function(g){var e=this,h=g.val().trim(),i,j=/^[0-9]{3,4}$/,f;f=g.attr("datatype").split("-");f.length>1&&(j=new RegExp("^[0-9]{"+f[1]+"}$"));i=j.test(h);!i&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return i},phoneext:function(f){var e=this,g=/^[0-9]{1,6}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},mobilephone:function(f){var e=this,g=this.mobilecode(f,true)||this.phone(f,true);!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},mobilephoneall:function(f){var e=this,g=this.mobilezonecode(f,true)||this.phoneall(f,true);!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},reg:function(g){var e=this,h=true,f;if(g.is("[reg-pattern]")){f=g.attr("reg-pattern")}if(!f){f=b.trim(g.attr("datatype")).replace(/^reg(?:\-|)/i,"")}f.replace(/^\/([\s\S]*)\/([\w]{0,3})$/,function(j,i,k){JC.log(i,k);h=new RegExp(i,k||"").test(g.val())});!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},vcode:function(g){var e=this,h,f=parseInt(b.trim(g.attr("datatype")).replace(/^vcode(?:\-|)/i,""),10)||4;JC.log("vcodeValid: "+f);h=new RegExp("^[0-9a-zA-Z]{"+f+"}$").test(g.val());!h&&b(e).trigger(d.TRIGGER,[d.ERROR,g]);return h},text:function(e){return true},bytetext:function(e){return true},richtext:function(e){return true},bytelen:function(e){return e.replace(/[^\x00-\xff]/g,"11").length},url:function(f){var e=this,g=/^((http|ftp|https):\/\/|)[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},domain:function(f){var e=this,g=/^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.(\w{2,6})(?:\/|)$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},stricdomain:function(f){var e=this,g=/^((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.(\w{2,6})$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},email:function(f){var e=this,g=/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},countrycode:function(f){var e=this,g=f.val().trim(),h=/^(?:\+|)[\d]{1,6}$/.test(g);!h&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return h},zipcode:function(f){var e=this,g=/^[0-9]{6}$/.test(f.val());!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return g},taxcode:function(f){var e=this,h=false,g=f.val().trim();h=/^[\w]{15}$/.test(g)||/^[\w]{18}$/.test(g)||/^[\w]{20}$/.test(g);!h&&b(e).trigger(d.TRIGGER,[d.ERROR,f]);return h},reconfirm:function(j){var e=this,k=true,f,h="ReconfirmValidTime",i="reconfirm";JC.log(i,new Date().getTime());e.isDatatarget(j,i)&&(f=e.datatarget(j,i));!(f&&f.length)&&(f=e.samesubtypeitems(j,i));var g=false;if(f&&f.length){f.each(function(){var l=b(this);if(e.checkRepeatProcess(l,h,true)){g=true}if(j.val()!=b(this).val()){k=false}})}!k&&f.length&&f.each(function(){if(j[0]==this){return}b(e).trigger(d.TRIGGER,[d.ERROR,b(this),"reconfirmmsg",true])});if(k&&f&&f.length){f.each(function(){if(j[0]==this){return}if(g){return false}b(e).trigger(d.TRIGGER,[d.CORRECT,b(this)])})}k?b(e).trigger(d.TRIGGER,[d.CORRECT,j]):b(e).trigger(d.TRIGGER,[d.ERROR,j,"reconfirmmsg",true]);return k},checkRepeatProcess:function(f,g,e,i){var h=new Date().getTime(),j=false;i=i||200;if(f.data(g)){if((h-f.data(g))<i){j=true;f.data(g,h)}}e&&f.data(g,h);return j},alternative:function(k){var f=this,o=true,e,j="AlternativeValidTime",n=f.parseDatatype(k),m="alternative";JC.log(m,new Date().getTime());f.isDatatarget(k,m)&&(e=f.datatarget(k,m));!(e&&e.length)&&(e=f.samesubtypeitems(k,m));var i=false;if(e.length&&!b.trim(k.val())){var g=false;e.each(function(){var p=b(this);if(k[0]==this){return}if(f.checkRepeatProcess(p,j,true)){i=true}if(b(this).val()){g=true;return false}});o=g}!o&&e&&e.length&&e.each(function(){if(k[0]==this){return}if(i){return false}b(f).trigger(d.TRIGGER,[d.ERROR,b(this),"alternativemsg",true])});if(o&&e&&e.length){e.each(function(){if(k[0]==this){return}var p=b(this),q=f.parseDatatype(p);if(q&&f[q]&&b(this).val()){f[q](b(this))}else{if(!b(this).val()){b(f).trigger(d.TRIGGER,[d.CORRECT,b(this)])}}})}if(o&&e&&e.length){var h=false,l=[];e.each(function(){if(k[0]==this){return}var p=b(this),q;if(p.is("[alternativeReqTarget]")){q=parentSelector(p,p.attr("alternativeReqTarget"));if(q&&q.length){q.each(function(){var s=b(this),r=s.val().trim();if(!r){l.push(s);h=true}})}}});if(k.is("[alternativeReqTarget]")){_reqTarget=parentSelector(k,k.attr("alternativeReqTarget"));if(_reqTarget&&_reqTarget.length){_reqTarget.each(function(){var q=b(this),p=q.val().trim();if(!p){l.push(q);h=true}})}}if(h&&l.length){o=false;b.each(l,function(p,q){q=b(q);b(f).trigger(d.TRIGGER,[d.ERROR,q,"alternativeReqmsg",true])});return o}}if(o){if(n&&f[n]&&k.val()){f[n](k)}else{if(!k.val()){b(f).trigger(d.TRIGGER,[d.CORRECT,k])}}}else{b(f).trigger(d.TRIGGER,[d.ERROR,k,"alternativemsg",true])}return o},unique:function(m){var g=this,p=true,f,k,e=[],o=g.typeLen(m.attr("subdatatype"))[0],l="UniqueValidTime",n="unique",j=parseBool(m.attr("uniqueIgnoreCase"));JC.log(n,new Date().getTime());g.isDatatarget(m,n)&&(f=g.datatarget(m,n));!(f&&f.length)&&(f=g.samesubtypeitems(m,n));_errLs=[];_corLs=[];var i=false;if(f&&f.length){k={};f.each(function(r){var q=b(this);if(g.checkRepeatProcess(q,l,true)){i=true}if(r%o===0){e.push([])}e[e.length-1]&&e[e.length-1].push(q)});b.each(e,function(r,u){var t=[];b.each(u,function(v,w){t.push(b(w).val().trim())});var q=t.join(""),s=t.join("IOU~IOU");if(!q){return}j&&(s=s.toLowerCase());if(s in k){k[s].push(u);p=false}else{k[s]=[u]}});for(var h in k){if(k[h].length>1){p=false;b.each(k[h],function(q,r){_errLs=_errLs.concat(r)})}else{b.each(k[h],function(q,r){_corLs=_corLs.concat(r)})}}}b.each(_corLs,function(q,r){a.setValid(r)});!p&&_errLs.length&&b.each(_errLs,function(q,r){r=b(r);if(i){return false}r.val()&&b(g).trigger(d.TRIGGER,[d.ERROR,r,"uniquemsg",true])});return p},datavalid:function(e){var f=true;if(!a.isFormValid){return f}f=parseBool(e.attr("datavalid"));!f&&b(this).trigger(d.TRIGGER,[d.ERROR,e,"datavalidmsg",true]);return f},typeLen:function(f){var e=[1];f&&(f=f.replace(/[^\d\.]/g,""))&&(e=f.split("."))&&(e[0]=parseInt(e[0],10)||1,e[1]=parseInt(e[1],10)||0);return e},findValidEle:function(g){var e=this,f="~ em.validmsg",i=g.find(f),h;if(g.attr("validel")&&(h=e.getElement(g.attr("validel"),g,f)).length){i=h}return i},findFocusEle:function(g){var e=this,f="~ em.focusmsg",i=g.find(f),h;if(g.attr("focusel")&&(h=e.getElement(g.attr("focusel"),g,f)).length){i=h}return i},findErrorEle:function(g){var e=this,f=d.SELECTOR_ERROR,h=g.find(f);if(g.attr("emel")&&(_tmp=e.getElement(g.attr("emel"),g,f)).length){h=_tmp}return h},getElement:function(e,f,g){if(/^\^$/.test(e)){g=g||d.SELECTOR_ERROR;e=b(f.parent().find(g))}else{if(/^[\/\|\<\(]/.test(e)){e=parentSelector(f,e)}else{if(/\./.test(e)){return b(e)}else{if(/^[\w-]+$/.test(e)){e="#"+e;e=b(e.replace(/[\#]+/g,"#"))}}}}return b(e)},errorMsg:function(g,f,e){var h=g.is("[errmsg]")?" "+g.attr("errmsg"):g.is("[reqmsg]")?g.attr("reqmsg"):"";f&&(h=g.attr(f)||h);e&&h&&(h=" "+h);h=(h||"").trim().toLowerCase()=="undefined"||typeof h==undefined?"":h;if(h&&!/^[\s]/.test(h)){switch(g.prop("type").toLowerCase()){case"file":h="请上传"+h;break;case"select-multiple":case"select-one":case"checkbox":case"radio":case"select":h="请选择"+h;break;case"textarea":case"password":case"text":h="请填写"+h;break}}return b.trim(h)},reqmsg:function(f){var g=true,e=this;if(!e.isReqmsg(f)){return g}if(f.val()&&f.val().constructor==Array){g=!!(b.trim(f.val().join("")+""))}else{g=!!b.trim(f.val()||"")}!g&&b(e).trigger(d.TRIGGER,[d.ERROR,f,"reqmsg"]);JC.log("regmsgValid: "+g);return g},sametypeitems:function(g){var e=this,i=[],h=g.parent(),f=g.attr("datatype"),j=new RegExp(f,"i");if(/select/i.test(g.prop("nodeName"))){h.find("[datatype]").each(function(){j.test(b(this).attr("datatype"))&&i.push(b(this))})}else{h.find("input[datatype]").each(function(){j.test(b(this).attr("datatype"))&&i.push(b(this))})}return i.length?b(i):i},samesubtypeitems:function(i,h){var f=this,k=[],j=i.parent(),h=h||i.attr("subdatatype"),l=new RegExp(h,"i"),e=i.prop("nodeName").toLowerCase(),g="input";if(/select/.test(e)){g="select"}else{if(/textarea/.test(e)){g="textarea"}}j.find(g+"[subdatatype]").each(function(){l.test(b(this).attr("subdatatype"))&&k.push(b(this))});return k.length?b(k):k},focusmsgeverytime:function(e){var f=a.focusmsgEverytime;e.is("[focusmsgeverytime]")&&(f=parseBool(e.attr("focusmsgeverytime")));return f},validemdisplaytype:function(f){f&&(f=b(f));var h=a.emDisplayType,e=getJqParent(f,"form"),g;e&&e.length&&e.is("[validemdisplaytype]")&&(g=e.attr("validemdisplaytype"))&&(h=g);f.is("[validemdisplaytype]")&&(g=f.attr("validemdisplaytype"))&&(h=g);return h},checkedType:function(l,i){l&&(l=b(l));i=i||"checkbox";var f=this,o=true,n,k,g=1,m=0,j=l,h=l.parent().prop("nodeName").toLowerCase()=="label",e=i+"finder";JC.log(l.attr("name")+", "+l.val());if(l.is("[datatarget]")){n=parentSelector(l,l.attr("datatarget"));k=[];n.each(function(){var p=b(this);p.is(":visible")&&!p.prop("disabled")&&k.push(p)});n=b(k)}else{if(h){if(!j.is("["+e+"]")){j=l.parent().parent()}else{j=parentSelector(l,l.attr(e))}k=parentSelector(j,"|input[datatype]")}else{k=parentSelector(j,"/input[datatype]")}n=[];k.each(function(){var p=b(this);var q=new RegExp(i,"i");q.test(p.attr("datatype"))&&p.is(":visible")&&!p.prop("disabled")&&n.push(p)});n=b(n)}if(h){n.each(function(){var p=b(this);if(!p.is("[emel]")){p.attr("emel","//em.error")}if(!p.is("[validel]")){p.attr("validel","//em.validmsg")}if(!p.is("[focusel]")){p.attr("focusel","//em.focusmsg")}})}n.length&&b(l=n[n.length-1]).data("Last"+i,true);if(n.length){l.is("[datatype]")&&l.attr("datatype").replace(/[^\-]+?\-([\d]+)/,function(q,p){g=parseInt(p,10)||g});if(n.length>=g){n.each(function(){b(this).prop("checked")&&m++});if(m<g){o=false}}!o&&b(f).trigger(d.TRIGGER,[d.ERROR,l])}return o},checkbox:function(e){return this.checkedType(e,"checkbox")},radio:function(e){return this.checkedType(e,"radio")},file:function(g){var f=this,j=true,i=g.val().trim().toLowerCase(),e=f.dataFileExt(g),k,h;if(e.length){j=false;b.each(e,function(m,l){l+="$";k=new RegExp(l,"i");if(k.test(i)){j=true;return false}})}!j&&b(f).trigger(d.TRIGGER,[d.ERROR,g]);return j},dataFileExt:function(e){var g=[],f;e.is("[fileext]")&&(f=e.attr("fileext").replace(/[\s]+/g,""))&&(f=f.replace(/\./g,"\\."))&&(g=f.toLowerCase().split(","));return g}};function c(e){this._model=e}c.prototype={init:function(){return this},valid:function(g,i,f){g&&(g=b(g));var e=this,h;g.data("JCValidStatus",true);setTimeout(function(){g.removeClass(d.CSS_ERROR);g.find(printf('~ em:not("em.focusmsg, em.validmsg, {0}")',d.FILTER_ERROR)).css("display",e._model.validemdisplaytype(g));g.find(d.SELECTOR_ERROR).hide();g.attr("emel")&&(h=e._model.getElement(g.attr("emel"),g))&&h.hide();typeof f=="undefined"&&typeof g.val()!="object"&&!g.val().trim()&&(f=1);e.validMsg(g,f);(h=e._model.validitemcallback(g))&&h(g,true)},i||150)},validMsg:function(g,f){var e=this,k=(g.attr("validmsg")||"").trim().toLowerCase();if(e._model.isValidMsg(g)){if(k=="true"||k=="1"){k=""}!k.trim()&&(k="&nbsp;");var j=e._model.findFocusEle(g),i=e._model.findValidEle(g),h=e._model.findErrorEle(g);!i.length&&(i=b('<em class="validmsg"></em>'),g.after(i));i.html(k);f?i.hide():(i.css("display",e._model.validemdisplaytype(g)),j&&j.hide(),h&&h.hide())}},error:function(i,h,g){i&&(i=b(i));var f=this,e=arguments;if(i.is("[validnoerror]")){return true}i.data("JCValidStatus",false);setTimeout(function(){var m=f._model.errorMsg.apply(f._model,sliceArgs(e)),j,l,k;i.addClass(d.CSS_ERROR);i.find(printf("~ em:not({0})",d.FILTER_ERROR)).hide();if(i.is("[validel]")){(l=f._model.getElement(i.attr("validel"),i))&&l.hide()}if(i.is("[focusel]")){(k=f._model.getElement(i.attr("focusel"),i))&&k.hide()}if(i.is("[emEl]")){(j=f._model.getElement(i.attr("emEl"),i))&&j.addClass(d.CSS_ERROR)}!(j&&j.length)&&(j=i.find(d.SELECTOR_ERROR));if(!j.length){(j=b(printf('<em class="{0}"></em>',d.CSS_ERROR))).insertAfter(i)}!m.trim()&&(m="&nbsp;");j.html(m).css("display",f._model.validemdisplaytype(i));JC.log("error:",m)},150);(_tmp=f._model.validitemcallback(i))&&_tmp(i,false);return false},focusmsg:function(f,h){if(f&&(f=b(f)).length&&f.is("[focusmsg]")){JC.log("focusmsg",new Date().getTime());var j,e=this,l=e._model.findFocusEle(f),i=e._model.findValidEle(f),g=e._model.findErrorEle(f),k=f.attr("focusmsg");if(h&&l&&l.length){l.hide();return}g.length&&g.is(":visible")&&g.hide();if(i.length&&i.is(":visible")){return}!l.length&&(l=b('<em class="focusmsg"></em>'),f.after(l));if(f.is("[validnoerror]")){j=a.getInstance().parse(f)}else{f.attr("validnoerror",true);j=a.getInstance().parse(f);f.removeAttr("validnoerror")}!k.trim()&&(k="&nbsp;");if(e._model.focusmsgeverytime(f)){l.html(k).css("display",e._model.validemdisplaytype(f))}else{j&&l.html(k).css("display",e._model.validemdisplaytype(f))}}}};b(document).delegate("input[type=text], input[type=password], textarea","blur",function(e){a.getInstance().trigger("FocusMsg",[b(this),true]);a.check(b(this))});b(document).delegate("select, input[type=file], input[type=checkbox], input[type=radio]","change",function(e){a.check(b(this))});b(document).delegate("input[type=text], input[type=password], textarea, select, input[type=file], input[type=checkbox], input[type=radio]","focus",function(e){a.getInstance().trigger("FocusMsg",[b(this)])});b(document).delegate("select, input[type=file], input[type=checkbox], input[type=radio]","blur",function(e){a.getInstance().trigger("FocusMsg",[b(this),true])});b(document).delegate("input[type=text][subdatatype]","keyup",function(g){var f=b(this);var e=/datavalid/i.test(f.attr("subdatatype"));if(!e){return}a.dataValid(f,false,true);if(f.data("DataValidInited")){return}f.data("DataValidInited",true);f.on("blur",function(i,h){JC.log("datavalid",new Date().getTime());if(h){return}var l=f.val().trim(),k,m,j=f.attr("datavalidurl");if(!l){return}if(!j){return}f.data("DataValidTm")&&clearTimeout(f.data("DataValidTm"));f.data("DataValidTm",setTimeout(function(){l=f.val().trim();if(!l){return}if(!f.data("JCValidStatus")){return}j=printf(j,l);f.attr("datavalidUrlFilter")&&(k=window[f.attr("datavalidUrlFilter")])&&(j=k.call(f,j));b.get(j).done(function(n){m=n;try{n=b.parseJSON(n)}catch(o){n={errorno:1}}l==="suchestest"&&(n.errorno=0);a.dataValid(f,!n.errorno,false,n.errmsg);f.attr("datavalidCallback")&&(k=window[f.attr("datavalidCallback")])&&k.call(f,n,m)})},151))})})}(jQuery));