(function(b){window.JCForm=JC.Form={disableButton:function(d,a){if(!d){return}d=b(d);a=a||1000;d.attr("disabled",true);setTimeout(function(){d.attr("disabled",false)},a)}};JC.AutoSelect&&(JC.Form.initAutoSelect=JC.AutoSelect);JC.AutoChecked&&(JC.Form.initCheckAll=JC.AutoChecked)}(jQuery));(function(h){JC.Form.initAutoFill=function(b,a){if(!(b&&b.length)){b=h(document)}a=a||location.href;JC.log("JC.Form.initAutoFill");if(b.prop("nodeName").toLowerCase()=="form"){f(b,a)}else{b.find("form.js_autoFillUrlForm").each(function(){f(this,a)})}};function f(c,a){c=h(c);a=g(a);c.find("input[type=text][name],input[type=password][name],textarea[name]").each(function(){var d=h(this);if(hasUrlParam(a,d.attr("name"))){d.val(g(getUrlParam(a,d.attr("name")).replace(/[\+]/g," ")))}});c.find("select[name]").each(function(){var j=h(this),d=g(getUrlParam(a,j.attr("name")).replace(/[\+]/g," "));if(hasUrlParam(a,j.attr("name"))){if(e(j,d)){j.removeAttr("selectignoreinitrequest");j.val(getUrlParam(a,j.attr("name")))}else{j.attr("selectvalue",d)}}});var b={};c.find("input[type=checkbox][name], input[type=radio][name]").each(function(){var n=h(this),d=n.attr("name").trim(),m,l=n.val();if(!(d in b)){m=getUrlParams(a,d);b[d]=m}else{m=b[d]}if(m&&m.length){h.each(m,function(i,j){if(j==l){n.prop("checked",true)}})}});window.jcAutoInitComps&&jcAutoInitComps(c)}JC.Form.initAutoFill.decodeFunc;function g(a){try{a=(JC.Form.initAutoFill.decodeFunc||decodeURIComponent)(a)}catch(b){}return a}function e(c,a){var b=false,a=a.toString();c.find("option").each(function(){var d=h(this);if(d.val()==a){b=true;return false}});return b}h(document).ready(function(a){JC.Form.initAutoFill()})}(jQuery));(function(d){JC.Form.initNumericStepper=function(a){a&&(a=d(a));a.delegate(".js_NStepperPlus, .js_NStepperMinus","click",function(n){var r=d(this),o=c.target(r);if(!(o&&o.length)){return}var p=parseInt(c.fixed(o),10)||0;var b=d.trim(o.val()),m=c.step(o);b=(p?parseFloat(b):parseInt(b,10))||0;var l=c.minvalue(o),q=c.maxvalue(o);r.hasClass("js_NStepperPlus")&&(b+=m);r.hasClass("js_NStepperMinus")&&(b-=m);b<l&&(b=l);b>q&&(b=q);JC.log(l,q,b,p,m);o.val(b.toFixed(p));c.callback(o)&&c.callback(o).call(o,r)})};JC.Form.initNumericStepper.onchange;var c={target:function(a){var b;if(a.attr("nstarget")){if(/^\~/.test(a.attr("nstarget"))){b=a.parent().find(a.attr("nstarget").replace(/^\~[\s]*/g,""));!(b&&b.length)&&(b=d(a.attr("nstarget")))}else{b=d(a.attr("nstarget"))}}return b},fixed:function(a){return a.attr("nsfixed")},step:function(a){return parseFloat(a.attr("nsstep"))||1},minvalue:function(a){return parseFloat(a.attr("nsminvalue")||a.attr("minvalue"))||0},maxvalue:function(a){return parseFloat(a.attr("nsmaxvalue")||a.attr("maxvalue"))||100},callback:function(f){var a=JC.Form.initNumericStepper.onchange,b;f.attr("nschangecallback")&&(b=window[f.attr("nschangecallback")])&&(a=b);return a}};d(document).ready(function(a){JC.Form.initNumericStepper(d(document))})}(jQuery));