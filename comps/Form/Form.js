(function(a){window.JCForm=JC.Form={disableButton:function(c,b){if(!c){return}c=a(c);b=b||1000;c.attr("disabled",true);setTimeout(function(){c.attr("disabled",false)},b)}};JC.AutoSelect&&(JC.Form.initAutoSelect=JC.AutoSelect);JC.AutoChecked&&(JC.Form.initCheckAll=JC.AutoChecked)}(jQuery));(function(c){JC.Form.initAutoFill=function(e,f){if(!(e&&e.length)){e=c(document)}f=f||location.href;JC.log("JC.Form.initAutoFill");if(e.prop("nodeName").toLowerCase()=="form"){a(e,f)}else{e.find("form.js_autoFillUrlForm").each(function(){a(this,f)})}};function a(e,f){e=c(e);e.find("input[type=text][name],input[type=password][name],textarea[name]").each(function(){var g=c(this);if(hasUrlParam(f,g.attr("name"))){g.val(d(getUrlParam(f,g.attr("name")).replace(/[\+]/g," ")))}});e.find("select[name]").each(function(){var g=c(this),h=d(getUrlParam(f,g.attr("name")).replace(/[\+]/g," "));if(hasUrlParam(f,g.attr("name"))){if(b(g,h)){g.val(getUrlParam(f,g.attr("name")))}else{g.attr("selectvalue",h)}}})}JC.Form.initAutoFill.decodeFunc;function d(f){try{f=(JC.Form.initAutoFill.decodeFunc||decodeURIComponent)(f)}catch(e){}return f}function b(e,g){var f=false,g=g.toString();e.find("option").each(function(){var h=c(this);if(h.val()==g){f=true;return false}});return f}c(document).ready(function(e){JC.Form.initAutoFill()})}(jQuery));(function(a){JC.Form.initNumericStepper=function(c){c&&(c=a(c));c.delegate(".js_NStepperPlus, .js_NStepperMinus","click",function(h){var d=a(this),g=b.target(d);if(!(g&&g.length)){return}var f=parseInt(b.fixed(g),10)||0;var k=a.trim(g.val()),i=b.step(g);k=(f?parseFloat(k):parseInt(k,10))||0;var j=b.minvalue(g),e=b.maxvalue(g);d.hasClass("js_NStepperPlus")&&(k+=i);d.hasClass("js_NStepperMinus")&&(k-=i);k<j&&(k=j);k>e&&(k=e);JC.log(j,e,k,f,i);g.val(k.toFixed(f));b.callback(g)&&b.callback(g).call(g,d)})};JC.Form.initNumericStepper.onchange;var b={target:function(d){var c;if(d.attr("nstarget")){if(/^\~/.test(d.attr("nstarget"))){c=d.parent().find(d.attr("nstarget").replace(/^\~[\s]*/g,""));!(c&&c.length)&&(c=a(d.attr("nstarget")))}else{c=a(d.attr("nstarget"))}}return c},fixed:function(c){return c.attr("nsfixed")},step:function(c){return parseFloat(c.attr("nsstep"))||1},minvalue:function(c){return parseFloat(c.attr("nsminvalue")||c.attr("minvalue"))||0},maxvalue:function(c){return parseFloat(c.attr("nsmaxvalue")||c.attr("maxvalue"))||100},callback:function(c){var e=JC.Form.initNumericStepper.onchange,d;c.attr("nschangecallback")&&(d=window[c.attr("nschangecallback")])&&(e=d);return e}};a(document).ready(function(c){JC.Form.initNumericStepper(a(document))})}(jQuery));