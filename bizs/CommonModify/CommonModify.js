(function(b){window.Bizs.CommonModify=a;function a(e){e&&(e=b(e));if(a._instance){return a._instance}if(!a._instance){a._instance=this}this._model=new d(e);this._view=new c(this._model);this._init();e&&e.length&&this.process(e)}a.prototype={_init:function(){var e=this;e._initHandlerEvent();b([e._view,e._model]).on("BindEvent",function(f,h,g){e.on(h,g)});b([e._view,e._model]).on("TriggerEvent",function(f,h){var g=sliceArgs(arguments);g.shift();g.shift();e.trigger(h,g)});e._model.init();e._view.init();return e},_initHandlerEvent:function(){var e=this;e.on("add",function(g,f,h){e._model.cmaddcallback()&&e._model.cmaddcallback().call(e.selector(),e,f,e._model.cmitem(),h)});e.on("del",function(g,f,h){e._model.cmdelcallback()&&e._model.cmdelcallback().call(e.selector(),e,h)});e.on("done",function(g,f,h){e._model.cmdonecallback()&&e._model.cmdonecallback().call(e.selector(),e,h)})},selector:function(){return this._model.selector()},on:function(f,e){b(this).on(f,e);return this},trigger:function(f,e){b(this).trigger(f,e);return this},process:function(e){if(!(e&&(e=b(e)).length)){return this}this._model.selector(e);switch(this._model.action()){case"del":this._view.del();break;default:this._view.add();break}},cmitem:function(){return this._model.cmitem()}};a.getInstance=function(){!a._instance&&(a._instance=new a());return a._instance};a._instance=null;a.isCommonModify=function(e){var f;e&&(e=b(e)).length&&(f=e.is("[CommonModifylayout]"));return f};a.doneCallback=null;a.tplFilterCallback=null;a.beforeAddCallback=null;a.addCallback=null;a.beforeDelCallabck=null;a.delCallback=null;function d(e){this._selector=e}d.prototype={init:function(){return this},selector:function(e){e&&(e=b(e))&&(this._selector=e);return this._selector},layout:function(){},action:function(){var f="add",e;(e=this.selector().attr("cmaction"))&&(f=e.toLowerCase());return f},cmtemplate:function(){var f="",e;this.selector()&&(e=this.selector().attr("cmtemplate")||this.selector().attr("cmtpl"))&&(f=scriptContent(e));return f},cmdonecallback:function(){var f=a.doneCallback,e;this.selector()&&(e=this.selector().attr("cmdonecallback"))&&(e=window[e])&&(f=e);return f},cmtplfiltercallback:function(){var f=a.tplFilterCallback,e;this.selector()&&(e=this.selector().attr("cmtplfiltercallback"))&&(e=window[e])&&(f=e);return f},cmaddcallback:function(){var f=a.addCallback,e;this.selector()&&(e=this.selector().attr("cmaddcallback"))&&(e=window[e])&&(f=e);return f},cmdelcallback:function(){var f=a.delCallback,e;this.selector()&&(e=this.selector().attr("cmdelcallback"))&&(e=window[e])&&(f=e);return f},cmbeforeaddcallabck:function(){var f=a.beforeAddCallback,e;this.selector()&&(e=this.selector().attr("cmbeforeaddcallabck"))&&(e=window[e])&&(f=e);return f},cmbeforedelcallback:function(){var f=a.beforeDelCallabck,e;this.selector()&&(e=this.selector().attr("cmbeforedelcallback"))&&(e=window[e])&&(f=e);return f},cmitem:function(){var f,e;this.selector()&&(e=this.selector().attr("cmitem"))&&(f=parentSelector(this.selector(),e));return f},cmappendtype:function(){var e=this.selector().attr("cmappendtype")||"after";return e}};function c(e){this._model=e}c.prototype={init:function(){return this},add:function(){JC.log("Bizs.CommonModify view add",new Date().getTime());var e=this,i=e._model.cmtemplate(),h=e._model.cmitem(),g=h.parent(),f;if(e._model.cmbeforeaddcallabck()&&e._model.cmbeforeaddcallabck().call(e._model.selector(),h,g)===false){return}e._model.cmtplfiltercallback()&&(i=e._model.cmtplfiltercallback().call(e._model.selector(),i,h,g));i=i.replace(/<([\d]+)>/g,"{$1}");JC.log("_item:",h,h.length);if(!(i&&h&&h.length)){return}f=b(i);switch(e._model.cmappendtype()){case"appendTo":f.appendTo(h);break;case"before":h.before(f);break;default:h.after(f);break}window.jcAutoInitComps&&jcAutoInitComps(f);b(e).trigger("TriggerEvent",["add",f,g]);b(e).trigger("TriggerEvent",["done",f,g])},del:function(){JC.log("Bizs.CommonModify view del",new Date().getTime());var e=this,g=e._model.cmitem(),f=g.parent();if(e._model.cmbeforedelcallback()&&e._model.cmbeforedelcallback().call(e._model.selector(),g,f)===false){return}g&&g.length&&g.remove();b(e).trigger("TriggerEvent",["del",g,f]);b(e).trigger("TriggerEvent",["done",g,f])}};b(document).delegate("a.js_autoCommonModify, button.js_autoCommonModify, a.js_bizsCommonModify, button.js_bizsCommonModify","click",function(e){a.getInstance().process(b(this))})}(jQuery));