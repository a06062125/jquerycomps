(function(b){Bizs.FormLogic=a;function a(c){c&&(c=b(c));if(a.getInstance(c)){return a.getInstance(c)}a.getInstance(c,this);this._model=new a.Model(c);this._view=new a.View(this._model);this._init()}a.getInstance=function(c,d){if(typeof c=="string"&&!/</.test(c)){c=b(c)}if(!(c&&c.length)||(typeof c=="string")){return}typeof d!="undefined"&&c.data("FormLogicIns",d);return c.data("FormLogicIns")};!JC.Valid&&JC.use("Valid");!JC.Form&&JC.use("Form");!JC.Panel&&JC.use("Panel");!b(document).ajaxForm&&JC.use("plugins.jquery.form");a.init=function(c){var d=[];c&&(c=b(c));if(!(c&&c.length)){return}if(c.prop("nodeName").toLowerCase()=="form"){d.push(new a(c))}else{c.find("form.js_bizsFormLogic, form.js_autoFormLogic").each(function(){d.push(new a(this))})}return d};a.popupCloseMs=2000;a.formSubmitType="";a.submitDisable=true;a.resetAfterSubmit=true;a.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var c=this,d=c._model.formType();c._view.initQueryVal();c.selector().on("submit",function(e){c._model.isSubmited(true);if(c._model.formBeforeProcess()){if(c._model.formBeforeProcess().call(c.selector(),e,c)===false){return c._model.prevent(e)}}if(!JC.Valid.check(c.selector())){return c._model.prevent(e)}if(c._model.formAfterProcess()){if(c._model.formAfterProcess().call(c.selector(),e,c)===false){return c._model.prevent(e)}}if(c.selector().data(a.Model.SUBMIT_CONFIRM_BUTTON)){c.trigger(a.Model.EVT_CONFIRM);return c._model.prevent(e)}c.trigger("ProcessDone")});c.on("BindFrame",function(f){var h,g=c._model.formType(),e;if(g!=a.Model.AJAX){return}h=c._model.frame();h.on("load",function(k){var l=h.prop("contentWindow"),j=l.document.body,i=b.trim(j.innerHTML);if(!c._model.isSubmited()){return}JC.log("common ajax done");c.trigger("AjaxDone",[i])})});c.on("AjaxDone",function(f,j){var g=c._model.selector().find("button[type=reset], input[type=reset]");c._model.formSubmitDisable()&&c.trigger("EnableSubmit");var e,i,l=c._model.formAjaxResultType();if(l=="json"){try{e=b.parseJSON(j)}catch(h){i=true;e=j}}if(i){var k=printf('服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>',j);JC.Dialog.alert(k,1);return}e&&l=="json"&&"errorno" in e&&!parseInt(e.errorno,10)&&c._model.formResetAfterSubmit()&&g.length&&c.selector().trigger("reset");e=e||j||{};c._model.formAjaxDone()&&c._model.formAjaxDone().call(c._model.selector(),e,c._model.selector().data(a.Model.GENERIC_SUBMIT_BUTTON),c);c._model.formResetAfterSubmit()&&!c._model.userFormAjaxDone()&&g.length&&c.selector().trigger("reset")});c.on("ProcessDone",function(){c._model.formSubmitDisable()&&c.selector().find("input[type=submit], button[type=submit]").each(function(){b(this).prop("disabled",true)})});c.on(a.Model.EVT_CONFIRM,function(e){var f=c.selector().data(a.Model.SUBMIT_CONFIRM_BUTTON);f&&(f=b(f));if(!(f&&f.length)){return}var g;if(c._model.formConfirmPopupType(f)=="dialog"){g=JC.Dialog.confirm(c._model.formSubmitConfirm(f),2)}else{g=JC.confirm(c._model.formSubmitConfirm(f),f,2)}g.on("confirm",function(){c.selector().data(a.Model.SUBMIT_CONFIRM_BUTTON,null);c.selector().trigger("submit")});g.on("close",function(){c.selector().data(a.Model.SUBMIT_CONFIRM_BUTTON,null)})});c.selector().on("reset",function(e){if(c.selector().data(a.Model.RESET_CONFIRM_BUTTON)){c.trigger(a.Model.EVT_RESET);return c._model.prevent(e)}else{c._view.reset();c.trigger("EnableSubmit")}});c.on("EnableSubmit",function(){c.selector().find("input[type=submit], button[type=submit]").each(function(){b(this).prop("disabled",false)})});c.on(a.Model.EVT_RESET,function(e){var f=c.selector().data(a.Model.RESET_CONFIRM_BUTTON);f&&(f=b(f));if(!(f&&f.length)){return}var g;if(c._model.formConfirmPopupType(f)=="dialog"){g=JC.Dialog.confirm(c._model.formResetConfirm(f),2)}else{g=JC.confirm(c._model.formResetConfirm(f),f,2)}g.on("confirm",function(){c.selector().data(a.Model.RESET_CONFIRM_BUTTON,null);c.selector().trigger("reset");c._view.reset();c.trigger("EnableSubmit")});g.on("close",function(){c.selector().data(a.Model.RESET_CONFIRM_BUTTON,null)})})},_inited:function(){JC.log("FormLogic#_inited",new Date().getTime());var c=this,d=c.selector().find("input[type=file][name]");d.length&&c.selector().attr("enctype","multipart/form-data")&&c.selector().attr("encoding","multipart/form-data");c.trigger("BindFrame")}};JC.BaseMVC.buildModel(a);a.Model._instanceName="FormLogicIns";a.Model.GET="get";a.Model.POST="post";a.Model.AJAX="ajax";a.Model.IFRAME="iframe";a.Model.SUBMIT_CONFIRM_BUTTON="SubmitButton";a.Model.RESET_CONFIRM_BUTTON="ResetButton";a.Model.GENERIC_SUBMIT_BUTTON="GenericSubmitButton";a.Model.GENERIC_RESET_BUTTON="GenericResetButton";a.Model.EVT_CONFIRM="ConfirmEvent";a.Model.EVT_RESET="ResetEvent";a.Model.EVT_AJAX_SUBMIT="AjaxSubmit";a.Model.INS_COUNT=1;a.Model.prototype={init:function(){this.id()},id:function(){if(!this._id){this._id="FormLogicIns_"+(a.Model.INS_COUNT++)}return this._id},isSubmited:function(c){typeof c!="undefined"&&(this._submited=c);return this._submited},formType:function(){var c=this.stringProp("method");!c&&(c=a.Model.GET);c=this.stringProp("formType")||c;return c},frame:function(){var c=this;if(!(c._frame&&c._frame.length&&c._frame.parent())){if(c.selector().is("[target]")){c._frame=b(printf("iframe[name={0}]",c.selector().attr("target")))}if(!(c._frame&&c._frame.length)){c.selector().prop("target",c.frameId());c._frame=b(printf(a.frameTpl,c.frameId()));c.selector().after(c._frame)}}return c._frame},frameId:function(){return this.id()+"_iframe"},formSubmitType:function(){var c=this.stringProp("ajaxSubmitType")||this.stringProp("formSubmitType")||a.formSubmitType||"plugins";return c.toLowerCase()},formAjaxResultType:function(){var c=this.stringProp("formAjaxResultType")||"json";return c},formAjaxMethod:function(){var c=this.stringProp("formAjaxMethod")||this.stringProp("method");!c&&(c=a.Model.GET);return c.toLowerCase()},formAjaxAction:function(){var c=this.attrProp("formAjaxAction")||this.attrProp("action")||"?";return urlDetect(c)},formSubmitDisable:function(){var c=this,e=a.submitDisable,d=c.selector().data(a.Model.GENERIC_SUBMIT_BUTTON);c.selector().is("[formSubmitDisable]")&&(e=parseBool(c.selector().attr("formSubmitDisable")));d&&d.is("[formSubmitDisable]")&&(e=parseBool(d.attr("formSubmitDisable")));return e},formResetAfterSubmit:function(){var c=this,d=a.resetAfterSubmit;c.selector().is("[formResetAfterSubmit]")&&(d=parseBool(c.selector().attr("formResetAfterSubmit")));return d},formAjaxDone:function(){var c=this,e=c._innerAjaxDone,d=c.selector().data(a.Model.GENERIC_SUBMIT_BUTTON);e=c.userFormAjaxDone()||e;return e},userFormAjaxDone:function(){var c=this,e,d=c.selector().data(a.Model.GENERIC_SUBMIT_BUTTON);c.selector().is("[formAjaxDone]")&&(e=this.callbackProp("formAjaxDone")||e);d&&(d=b(d)).length&&(e=c.callbackProp(d,"formAjaxDone")||e);return e},_innerAjaxDone:function(d,g,c){var f=b(this),h,e="";d.data&&d.data.returnurl&&(e=d.data.returnurl);d.url&&(e=d.url);if(d.errorno){h=JC.Dialog.alert(d.errmsg||"操作失败, 请重新尝试!",1)}else{h=JC.Dialog.msgbox(d.errmsg||"操作成功",0,function(){c._model.formAjaxDoneAction()&&reloadPage(e||c._model.formAjaxDoneAction())},c._model.formPopupCloseMs())}},formPopupCloseMs:function(d){var c=this,e=a.popupCloseMs,d=d||c.selector().data(a.Model.GENERIC_SUBMIT_BUTTON);c.selector().is("[formPopupCloseMs]")&&(e=this.intProp("formPopupCloseMs")||e);d&&(d=b(d)).length&&(e=c.intProp(d,"formPopupCloseMs")||e);return e},formAjaxDoneAction:function(){var c=this,e="",d=c.selector().data(a.Model.GENERIC_SUBMIT_BUTTON);c.selector().is("[formAjaxDoneAction]")&&(e=this.attrProp("formAjaxDoneAction")||e);d&&(d=b(d)).length&&(e=c.attrProp(d,"formAjaxDoneAction")||e);return urlDetect(e)},formBeforeProcess:function(){return this.callbackProp("formBeforeProcess")},formAfterProcess:function(){return this.callbackProp("formAfterProcess")},formProcessError:function(){return this.callbackProp("formProcessError")},prevent:function(c){c&&c.preventDefault();return false},formConfirmPopupType:function(c){var d=this.stringProp("formConfirmPopupType")||"dialog";c&&(c=b(c)).length&&c.is("[formConfirmPopupType]")&&(d=c.attr("formConfirmPopupType"));return d.toLowerCase()},formResetUrl:function(){var c=this,e=c.stringProp("formResetUrl"),d=c.selector().data(a.Model.GENERIC_RESET_BUTTON);d&&(d=b(d)).length&&(e=c.stringProp(d,"formResetUrl")||e);return urlDetect(e)},formSubmitConfirm:function(c){var d=this.stringProp("formSubmitConfirm");c&&(c=b(c)).length&&c.is("[formSubmitConfirm]")&&(d=this.stringProp(c,"formSubmitConfirm"));!d&&(d="确定要提交吗?");return d.trim()},formResetConfirm:function(c){var d=this.stringProp("formResetConfirm");c&&(c=b(c)).length&&c.is("[formResetConfirm]")&&(d=this.stringProp(c,"formResetConfirm"));!d&&(d="确定要重置吗?");return d.trim()}};JC.BaseMVC.buildView(a);a.View.prototype={initQueryVal:function(){var c=this;if(c._model.formType()!=a.Model.GET){return}JC.Form&&JC.Form.initAutoFill(c._model.selector())},reset:function(e){var c=this,d=c._model.formResetUrl();d&&reloadPage(d);c._model.resetTimeout&&clearTimeout(c._model.resetTimeout);c._model.resetTimeout=setTimeout(function(){var f=c._model.selector();f.find("input[type=text], input[type=password], input[type=file], textarea").val("");f.find("select").each(function(){var i=b(this);var g=i.find("option");if(g.length>1){i.val(b(g[0]).val())}var h=i.is("[ignoreprocess]");i.attr("ignoreprocess",true);i.trigger("change");setTimeout(function(){!h&&i.removeAttr("ignoreprocess")},500)});JC.Valid&&JC.Valid.clearError(f)},50);JC.hideAllPopup(1)}};JC.BaseMVC.build(a,"Bizs");b(document).delegate("input[formSubmitConfirm], button[formSubmitConfirm]","click",function(e){var d=b(this),c=getJqParent(d,"form"),f=a.getInstance(c),g;if(c&&c.length){if(f){if(d.is("[formConfirmCheckSelector]")){g=parentSelector(d,d.attr("formConfirmCheckSelector"));if(!(g&&g.length)){return}}else{if(d.is("[formConfirmCheckCallback]")){g=window[d.attr("formConfirmCheckCallback")];if(g){if(!g.call(c,d,e,f)){return}}}}}c.data(a.Model.SUBMIT_CONFIRM_BUTTON,d)}});b(document).delegate("input[formResetConfirm], button[formResetConfirm]","click",function(e){var d=b(this),c=getJqParent(d,"form");c&&c.length&&c.data(a.Model.RESET_CONFIRM_BUTTON,d)});b(document).delegate("input[type=reset], button[type=reset]","click",function(e){var d=b(this),c=getJqParent(d,"form");c&&c.length&&c.data(a.Model.GENERIC_RESET_BUTTON,d)});b(document).delegate("input[type=submit], button[type=submit]","click",function(e){var d=b(this),c=getJqParent(d,"form");c&&c.length&&c.data(a.Model.GENERIC_SUBMIT_BUTTON,d)});b(document).delegate("a[buttonReturnUrl], input[buttonReturnUrl], button[buttonReturnUrl]","click",function(e){var d=b(this),f=d.attr("buttonReturnUrl").trim(),i=d.is("[returnConfirm]")?d.attr("returnConfirm"):"",c=d.is("[popuptype]")?d.attr("popuptype"):"confirm",h=parseInt(d.is("[popupstatus]")?d.attr("popupstatus"):"2",10),g;if(!f){return}f=urlDetect(f);d.prop("nodeName").toLowerCase()=="a"&&e.preventDefault();if(i){switch(c){case"dialog.confirm":g=JC.Dialog.confirm(i,h);break;default:g=JC.confirm(i,d,h);break}g.on("confirm",function(){reloadPage(f)})}else{reloadPage(f)}});a.frameTpl='<iframe src="about:blank" id="{0}" name="{0}" frameborder="0" class="BFLIframe" style="display:none;"></iframe>';b(document).ready(function(){setTimeout(function(){a.autoInit&&a.init(b(document))},1)})}(jQuery));