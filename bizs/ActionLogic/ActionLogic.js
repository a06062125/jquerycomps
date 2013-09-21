(function(b){window.Bizs.ActionLogic=a;function a(c){c&&(c=b(c));if(a.getInstance(c)){return a.getInstance(c)}a.getInstance(c,this);this._model=new a.Model(c);this._view=new a.View(this._model);this._init()}!JC.Panel&&JC.use("Panel");a.getInstance=function(c,d){if(typeof c=="string"&&!/</.test(c)){c=b(c)}if(!(c&&c.length)||(typeof c=="string")){return}typeof d!="undefined"&&c.data("ActionLogicIns",d);return c.data("ActionLogicIns")};a.isActionLogic=function(c){var d;c&&(c=b(c)).length&&(d=c.is("[baltype]"));return d};a.init=function(c){c&&b(c).find(["a.js_bizsActionLogic","input.js_bizsActionLogic","button.js_bizsActionLogic"].join()).on("click",function(e){var d=b(this);a.process(d)&&(d.prop("nodeName").toLowerCase()=="a"&&e.preventDefault())})};a.process=function(c){c=b(c);if(!(c&&c.length)){return null}if(!a.isActionLogic(c)){return}var d=a.getInstance(c);!d&&(d=new a(c));d&&d.process();return d};a.random=true;a.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var c=this;c.on("StaticPanel",function(d,e){c.trigger("ShowPanel",[scriptContent(e)])});c.on(a.Model.SHOW_PANEL,function(e,d){var f=JC.Dialog(d);f.on("confirm",function(){if(c._model.balCallback()&&c._model.balCallback().call(c._model.selector(),f,c)){return true}return false})});c.on("AjaxPanel",function(d,e,f){if(!(e&&f)){return}c._model.balRandom()&&(f=addUrlParams(f,{rnd:new Date().getTime()}));b.get(f).done(function(g){switch(e){case a.Model.SHOW_PANEL:c.trigger("ShowPanel",[g]);break;case a.Model.DATA_PANEL:try{g=b.parseJSON(g)}catch(h){}if(g){if(g.errorno){c.trigger("ShowError",[g.errmsg||"操作失败, 请重试!",1])}else{c.trigger("ShowPanel",[g.data])}}break}})});c.on("Go",function(d,e){if(!e){return}c._model.balRandom()&&(e=addUrlParams(e,{rnd:new Date().getTime()}));reloadPage(e)});c.on("AjaxAction",function(d,e){if(!e){return}c._model.balRandom()&&(e=addUrlParams(e,{rnd:new Date().getTime()}));b.get(e).done(function(f){try{f=b.parseJSON(f)}catch(g){}if(c._model.balCallback()){c._model.balCallback().call(c.selector(),f,c)}else{if(f&&"errorno" in f){if(f.errorno){c.trigger("ShowError",[f.errmsg||"操作失败, 请重试!",1])}else{c.trigger("ShowSuccess",[f.errmsg||"操作完成",function(){c._model.balDoneUrl()&&reloadPage(c._model.balDoneUrl()||location.href)}])}}else{JC.Dialog.alert(f,1)}}})});c.on("ShowError",function(d,h,f,e){var g;switch(c._model.balErrorPopupType()){case"alert":g=JC.alert(h,c._model.selector(),f||1);e&&g.on("confirm",function(){e()});break;case"msgbox":g=JC.msgbox(h,c._model.selector(),f||1);e&&g.on("close",function(){e()});break;case"dialog.msgbox":g=JC.Dialog.msgbox(h,f||1);e&&g.on("close",function(){e()});break;default:g=JC.Dialog.alert(h,f||1);e&&g.on("confirm",function(){e()});break}});c.on("ShowConfirm",function(d,h,f,e){var g;switch(c._model.balConfirmPopupType()){case"dialog.confirm":g=JC.Dialog.confirm(h,f||1);e&&g.on("confirm",function(){e()});break;default:g=JC.confirm(h,c._model.selector(),f||1);e&&g.on("confirm",function(){e()});break}});c.on("ShowSuccess",function(d,g,e){var f;switch(c._model.balSuccessPopupType()){case"alert":f=JC.alert(g,c._model.selector());e&&f.on("confirm",function(){e()});break;case"dialog.alert":f=JC.Dialog.alert(g);e&&f.on("confirm",function(){e()});break;case"dialog.msgbox":f=JC.Dialog.msgbox(g);e&&f.on("close",function(){e()});break;default:f=JC.msgbox(g,c.selector());e&&f.on("close",function(){e()});break}})},process:function(){var c=this;JC.hideAllPopup(1);switch(c._model.baltype()){case"panel":if(c._model.is("[balPanelTpl]")){c.trigger("StaticPanel",[c._model.balPanelTpl()])}else{if(c._model.is("[balAjaxHtml]")){c.trigger("AjaxPanel",[a.Model.SHOW_PANEL,c._model.balAjaxHtml()])}else{if(c._model.is("[balAjaxData]")){c.trigger("AjaxPanel",[a.Model.DATA_PANEL,c._model.balAjaxData()])}}}break;case"link":if(c._model.is("[balConfirmMsg]")){c.trigger("ShowConfirm",[c._model.balConfirmMsg(),2,function(){c.trigger("Go",c._model.balUrl())}])}else{c.trigger("Go",c._model.balUrl())}break;case"ajaxaction":if(c._model.is("[balConfirmMsg]")){var d=JC.confirm(c._model.balConfirmMsg(),c.selector(),2);d.on("confirm",function(){c.trigger("AjaxAction",c._model.balUrl())})}else{c.trigger("AjaxAction",c._model.balUrl())}break}return this}};JC.BaseMVC.buildModel(a);a.Model.SHOW_PANEL="ShowPanel";a.Model.DATA_PANEL="DataPanel";a.Model.prototype={init:function(){},baltype:function(){return this.stringProp("baltype")},balPanelTpl:function(){var d,c=this;d=c.selectorProp("balPanelTpl")||d;return d},balCallback:function(){var d,c=this;d=c.callbackProp("balCallback")||d;return d},balAjaxHtml:function(){return this.selector().attr("balAjaxHtml")},balAjaxData:function(){return this.selector().attr("balAjaxData")},balRandom:function(){var d=a.random,c=this;c.is("[balRandom]")&&(d=parseBool(c.stringProp("balRandom")));return d},balUrl:function(){var d="?",c=this;c.selector().prop("nodeName").toLowerCase()=="a"&&(d=c.selector().attr("href"));c.is("[balUrl]")&&(d=c.selector().attr("balUrl"));return urlDetect(d)},balDoneUrl:function(){var c=this.stringProp("balDoneUrl");return urlDetect(c)},balConfirmMsg:function(){var c="确定要执行吗?";c=this.selector().attr("balConfirmMsg")||c;return c},balErrorPopupType:function(){var c=this.stringProp("balErrorPopupType")||"dialog";return c},balSuccessPopupType:function(){var c=this.stringProp("balSuccessPopupType")||"msgbox";return c},balConfirmPopupType:function(){var c=this.stringProp("balConfirmPopupType")||"confirm";return c}};JC.BaseMVC.buildView(a);a.View.prototype={init:function(){}};JC.BaseMVC.build(a);b(document).ready(function(){b(document).delegate(["a.js_bizsActionLogic","input.js_bizsActionLogic","button.js_bizsActionLogic"].join(),"click",function(d){var c=b(this);a.process(c)&&(c.prop("nodeName").toLowerCase()=="a"&&d.preventDefault())})})}(jQuery));