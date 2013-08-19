(function(c){window.Panel=JC.Panel=b;function b(f,h,i,g){typeof f=="string"&&(f=f.trim().replace(/[\r\n]+/g,""));typeof h=="string"&&(h=h.trim().replace(/[\r\n]+/g,""));typeof i=="string"&&(i=i.trim().replace(/[\r\n]+/g,""));if(b.getInstance(f)){return b.getInstance(f)}this._model=new e(f,h,i,g);this._view=new d(this._model);this._init()}b.getInstance=function(f){if(typeof f=="string"&&!/</.test(f)){f=c(f)}if(f&&typeof f=="string"){return}return c(f).data("PanelInstace")};b.focusButton=true;b.clickClose=false;b.autoCloseMs=2000;b.prototype={_init:function(){var f=this;this._view.getPanel().data("PanelInstace",this);this._model.addEvent("close_default",function(g,h){h._view.close()});this._model.addEvent("show_default",function(g,h){h._view.show()});this._model.addEvent("hide_default",function(g,h){h._view.hide()});this._model.addEvent("confirm_default",function(g,h){h.trigger("close")});this._model.addEvent("cancel_default",function(g,h){h.trigger("close")});this._model.panelautoclose()&&this.autoClose();return this},on:function(g,f){g&&f&&this._model.addEvent(g,f);return this},show:function(g){var f=this;setTimeout(function(){switch(typeof g){case"number":switch(g){case 0:f.center();break}break;case"object":g=c(g);g.length&&f._view.positionWith(g);if(!f._model.bindedPositionWithEvent){f._model.bindedPositionWithEvent=true;c(window).on("resize",h);f.on("close",function(){f._model.bindedPositionWithEvent=false;c(window).unbind("resize",h)});function h(){f.positionWith(g)}}break}},10);this.trigger("beforeshow",this._view.getPanel());this.trigger("show",this._view.getPanel());return this},positionWith:function(f){f=c(f);f&&f.length&&this._view.positionWith(f);return this},hide:function(){this.trigger("beforehide",this._view.getPanel());this.trigger("hide",this._view.getPanel());return this},close:function(){JC.log("Panel.close");this.trigger("beforeclose",this._view.getPanel());this.trigger("close",this._view.getPanel());return this},isClickClose:function(){return this._model.panelclickclose()},clickClose:function(f){f&&this.layout()&&this.layout().removeAttr("panelclickclose");!f&&this.layout()&&this.layout().attr("panelclickclose",true);return this},addAutoClose:function(){this.clickClose.apply(this,sliceArgs(arguments));return this},autoClose:function(g,i){var f=this,h;i=f._model.panelautoclosems(i);b._autoCloseTimeout&&clearTimeout(b._autoCloseTimeout);f.on("close",function(){b._autoCloseTimeout&&clearTimeout(b._autoCloseTimeout)});b._autoCloseTimeout=setTimeout(function(){g&&f.on("close",g);f.close()},i);return this},focusButton:function(){this._view.focusButton();return this},dispose:function(){JC.log("Panel.dispose");this._view.close();return this},center:function(){this.trigger("beforecenter",this._view.getPanel());this._view.center();this.trigger("center",this._view.getPanel());return this},selector:function(){return this._view.getPanel()},layout:function(){return this._view.getPanel()},find:function(f){return this.layout().find(f)},trigger:function(h,k){JC.log("Panel.trigger",h);var f=this,j=this._model.getEvent(h),g=true;if(j&&j.length){k&&(k=c(k))&&k.length&&(k=k[0]);c.each(j,function(m,l){if(l.call(k,h,f)===false){return g=false}})}if(g){var i=this._model.getEvent(h+"_default");if(i&&i.length){c.each(i,function(m,l){if(l.call(k,h,f)===false){return false}})}}return this},header:function(g){if(typeof g!="undefined"){this._view.getHeader(g)}var f=this._view.getHeader();if(f&&f.length){g=f.html()}return g||""},body:function(g){if(typeof g!="undefined"){this._view.getBody(g)}var f=this._view.getBody();if(f&&f.length){g=f.html()}return g||""},footer:function(g){if(typeof g!="undefined"){this._view.getFooter(g)}var f=this._view.getFooter();if(f&&f.length){g=f.html()}return g||""},panel:function(g){if(typeof g!="undefined"){this._view.getPanel(g)}var f=this._view.getPanel();if(f&&f.length){g=f.html()}return g||""}};function e(f,h,i,g){this.selector=f;this.headers=h;this.bodys=i;this.footers=g;this.panel;this._events={};this._init()}e.prototype={_init:function(){var f=typeof this.selector!="undefined"?c(this.selector):undefined;if(f&&f.length){this.selector=f;JC.log("user tpl",this.selector.parent().length);if(!this.selector.parent().length){this.selector.appendTo(c(document.body))}}else{if(!f||f.length===0){this.footers=this.bodys;this.bodys=this.headers;this.headers=this.selector;this.selector=undefined}}return this},addEvent:function(g,f){if(!(g&&f)){return}g&&(g=g.toLowerCase());if(!(g in this._events)){this._events[g]=[]}if(/\_default/i.test(g)){this._events[g].unshift(f)}else{this._events[g].push(f)}},getEvent:function(f){return this._events[f]},panelfocusbutton:function(){var f=b.focusButton;if(this.panel.is("[panelfocusbutton]")){f=parseBool(this.panel.attr("panelfocusbutton"))}return f},panelclickclose:function(){var f=b.clickClose;if(this.panel.is("[panelclickclose]")){f=parseBool(this.panel.attr("panelclickclose"))}return f},panelautoclose:function(){var f;if(this.panel.is("[panelautoclose]")){f=parseBool(this.panel.attr("panelautoclose"))}return f},panelautoclosems:function(f){var g=b.autoCloseMs;if(this.panel.is("[panelautoclosems]")){g=parseInt(this.panel.attr("panelautoclosems"),10)}typeof f=="number"&&(g=f);return g}};function d(f){this._model=f;this._tpl=a;this._init()}d.prototype={_init:function(){if(!this._model.panel){if(this._model.selector){this._model.panel=this._model.selector}else{this._model.panel=c(this._tpl);this._model.panel.appendTo(document.body)}}this.getHeader();this.getBody();this.getFooter();return this},positionWith:function(h){if(!(h&&h.length)){return}this.getPanel().css({left:"-9999px",top:"-9999px",display:"block",position:"absolute"});var s=h.offset(),t=h.prop("offsetWidth"),i=h.prop("offsetHeight");var p=this.getPanel().prop("offsetWidth"),m=this.getPanel().prop("offsetHeight");var g=c(window).width(),j=c(window).height();var l=c(document).scrollTop(),k=c(document).scrollLeft();var o=s.left+k,n=s.top+i+1;var q=l+j-m,u=l;if(n>q){n=s.top-m-1}if(n<u){n=l}var r=k+g-p,f=k;if(o>r){o=k+g-p-1}if(o<f){o=k}this.getPanel().css({left:o+"px",top:n+"px"})},show:function(){this.getPanel().css({"z-index":ZINDEX_COUNT++}).show();this.focusButton()},focusButton:function(){if(!this._model.panelfocusbutton()){return}var f=this.getPanel().find("input[eventtype=confirm], input[type=submit], button[eventtype=confirm], button[type=submit]");!f.length&&(f=this.getPanel().find("input[eventtype=cancel], input[type=buton], button[eventtype=cancel], button[type=button]"));f.length&&c(f[0]).focus()},hide:function(){this.getPanel().hide()},close:function(){JC.log("Panel._view.close()");this.getPanel().remove()},getPanel:function(f){if(typeof f!="undefined"){this.getPanel().html(f)}return this._model.panel},getHeader:function(f){var g=this.getPanel().find("div.UPContent > div.hd");if(typeof f!="undefined"){this._model.headers=f}if(typeof this._model.headers!="undefined"){if(!g.length){this.getPanel().find("div.UPContent > div.bd").before(g=c('<div class="hd">弹出框</div>'))}g.html(this._model.headers);this._model.headers=undefined}return g},getBody:function(f){var g=this.getPanel().find("div.UPContent > div.bd");if(typeof f!="undefined"){this._model.bodys=f}if(typeof this._model.bodys!="undefined"){g.html(this._model.bodys);this._model.bodys=undefined}return g},getFooter:function(f){var g=this.getPanel().find("div.UPContent > div.ft");if(typeof f!="undefined"){this._model.footers=f}if(typeof this._model.footers!="undefined"){if(!g.length){this.getPanel().find("div.UPContent > div.bd").after(g=c('<div class="ft" ></div>'))}g.html(this._model.footers);this._model.footers=undefined}return g},center:function(){var n=this.getPanel(),m=n.width(),h=n.height(),k,i,f=c(window).width(),j=c(window).height(),l=c(document).scrollLeft(),g=c(document).scrollTop();n.css({left:"-9999px",top:"-9999px"}).show();k=(f-m)/2+l;i=(j-h)/2+g;if((j-h-100)>300){i-=100}JC.log((j-h/2-100));if((i+h-g)>j){JC.log("y overflow");i=g+j-h}if(i<g||i<0){i=g}n.css({left:k+"px",top:i+"px"});JC.log(m,h,f,j)}};var a=['<div class="UPanel" style="width: 600px;">','    <div class="UPContent">','        <div class="bd"></div>','        <span class="close" eventtype="close"></span>',"    </div><!--end UPContent-->","</div>"].join("");JC.hideAllPanel=function(f){c("div.UPanel").each(function(){var g=c(this),h=b.getInstance(g);if(!h){return}h.hide();f&&h.close()})};JC.hideAllPopup=function(f){if(f){c("body > div.UPanelPopup_identifer").remove()}else{c("body > div.UPanelPopup_identifer").hide()}};c(document).delegate("div.UPanel","click",function(f){var h=c(this),i=c(f.target||f.srcElement),g;if(i&&i.length&&i.is("[eventtype]")){g=i.attr("eventtype");JC.log(g,h.data("PanelInstace"));g&&h.data("PanelInstace")&&h.data("PanelInstace").trigger(g,i,f)}});c(document).delegate("div.UPanel","click",function(g){var f=c(this),h=b.getInstance(f);if(h&&h.isClickClose()){g.stopPropagation()}});c(document).on("click",function(f){c("div.UPanel").each(function(){var g=c(this),h=b.getInstance(g);if(h&&h.isClickClose()&&h.layout()&&h.layout().is(":visible")){h.hide();h.close()}})});c(document).on("keyup",function(f){var g=f.keyCode;switch(g){case 27:JC.hideAllPanel(1);break}})}(jQuery));(function(a){JC.msgbox=function(h,g,f,e,d){if(typeof g=="number"){f=g;g=null}if(typeof e=="number"){d=e;e=null}var c=b.popup(JC.msgbox.tpl||b.tpls.msgbox,h,g,f);e&&c.on("close",e);c.autoClose();return c};JC.msgbox.tpl;JC.alert=function(f,e,d,c){if(typeof e=="number"){d=e;e=null}return b.popup(JC.alert.tpl||b.tpls.alert,f,e,d,c)};JC.alert.tpl;JC.confirm=function(f,e,d,c){if(typeof e=="number"){d=e;e=null}return b.popup(JC.confirm.tpl||b.tpls.confirm,f,e,d,c)};JC.confirm.tpl;var b={minWidth:180,maxWidth:500,xoffset:9,yoffset:3,popupIdentifier:function(c){if(!c){a("body > div.UPanelPopup_identifer").remove();a("body > div.UPanel_TMP").remove()}else{c.selector().addClass("UPanelPopup_identifer");c.selector().data("PopupInstance",c)}},popup:function(d,h,g,f,e){if(!h){return}b.popupIdentifier();g&&(g=a(g));var d=d.replace(/\{msg\}/g,h).replace(/\{status\}/g,b.getStatusClass(f||""));var c=new JC.Panel(d);b.popupIdentifier(c);c.selector().data("popupSrc",g);b.fixWidth(h,c);e&&c.on("confirm",e);if(!g){c.center()}c.on("show_default",function(){JC.log("user show_default");if(g&&g.length){b.showEffect(c,g,function(){c.focusButton()});return false}});c.on("close_default",function(){JC.log("user close_default");if(g&&g.length){b.hideEffect(c,g,function(){c.selector().remove();c=null})}else{c.selector().remove()}return false});c.on("hide_default",function(){JC.log("user hide_default");if(g&&g.length){b.hideEffect(c,g,function(){c.selector().hide()});return false}else{c.selector().hide()}});if(g&&g.length){c.selector().css({left:"-9999px",top:"-9999px"})}c.selector().css("z-index",window.ZINDEX_COUNT++);c.show();return c},hideEffect:function(d,f,e){f&&(f=a(f));if(!(f&&f.length)){return}if(!(d&&d.selector)){return}var l=f.offset(),g=d.selector();var i=g[0];i.interval&&clearInterval(i.interval);i.defaultWidth&&g.width(i.defaultWidth);i.defaultHeight&&g.height(i.defaultHeight);var h=f.width(),c=g.height();i.defaultWidth=g.width();i.defaultHeight=g.height();var k=b.getLeft(l.left,h,g.width());var j=b.getTop(l.top,f.height(),c);j=j-c-b.yoffset;g.height(0);g.css({left:k+"px"});i.interval=easyEffect(function(m,n){g.css({top:j+m+"px",height:c-m+"px"});if(c===m){g.hide()}n&&e&&e(d)},c)},showEffect:function(d,f,e){f&&(f=a(f));if(!(f&&f.length)){return}if(!(d&&d.selector)){return}var l=f.offset(),g=d.selector();var i=g[0];i.interval&&clearInterval(i.interval);i.defaultWidth&&g.width(i.defaultWidth);i.defaultHeight&&g.height(i.defaultHeight);var h=f.width(),c=g.height();i.defaultWidth=g.width();i.defaultHeight=g.height();var k=b.getLeft(l.left,h,g.width());var j=b.getTop(l.top,f.height(),c,b.xoffset);g.height(0);g.css({left:k+"px"});JC.log(j,l.top);if(j>l.top){i.interval=easyEffect(function(m,n){g.css({top:j-c-b.yoffset+"px",height:m+"px"});n&&e&&e(d)},c)}else{i.interval=easyEffect(function(m,n){g.css({top:j-m-b.yoffset+"px",height:m+"px"});n&&e&&e(d)},c)}},onresize:function(c){if(!c.selector().is(":visible")){return}var f=c.selector(),d=f.data("popupSrc");if(!(d&&d.length)){c.center()}else{var g=d.offset();var l=g.top,o=d.height(),j=f.height(),n=0,e=g.left,h=d.width(),k=f.width(),i=0;var p=b.getLeft(e,h,k,i)+b.xoffset;var m=b.getTop(l,o,j,n)-j-b.yoffset;f.css({left:p+"px",top:m+"px"})}},getTop:function(h,f,c,e){var i=h,g=a(document).scrollTop(),d=a(window).height()-c;i-c<g&&(i=h+f+c+e);return i},getLeft:function(g,f,i,e){e==undefined&&(e=5);var h=g+f/2+e-i/2,d=a(document).scrollLeft(),c=a(window).width()+d-i;h>c&&(h=c-2);h<d&&(h=d+1);return h},fixWidth:function(f,e){var d=a('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+f+"</div>").appendTo("body"),c=d.width()+80;d.remove();c>b.maxWidth&&(c=b.maxWidth);c<b.minWidth&&(c=b.minWidth);e.selector().css("width",c)},getStatusClass:function(c){var d="UPanelSuccess";switch(c){case 0:d="UPanelSuccess";break;case 1:d="UPanelError";break;case 2:d="UPanelAlert";break}return d},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join("")}};a(document).on("click",function(f){var d=a(f.target||f.srcElement),g=d.attr("paneltype"),i=d.attr("panelmsg"),h;if(!(g&&i)){return}g=g.toLowerCase();d.prop("nodeName")&&d.prop("nodeName").toLowerCase()=="a"&&f.preventDefault();var e=(parseInt(d.attr("panelstatus"),10)||0),c=d.attr("panelcallback"),j=d.attr("panelcancelcallback");c&&(c=window[c]);j&&(j=window[j]);if(!(g in JC)){return}h=JC[g](i,d,e);d.is("[panelclickclose]")&&h.clickClose(!parseBool(d.attr("panelclickclose")));parseBool(d.attr("panelclickclose"))&&f.stopPropagation();if(g=="msgbox"){c&&h.on("close",c)}else{c&&h.on("confirm",c)}if(j){h.on("cancel",j)}});a(window).on("resize",function(c){a("body > div.UPanelPopup_identifer").each(function(){var d=a(this);d.data("PopupInstance")&&b.onresize(d.data("PopupInstance"))})})}(jQuery));(function(b){var d=!!window.ActiveXObject&&!window.XMLHttpRequest;var a=window.Dialog=JC.Dialog=function(e,h,i,g){if(c.timeout){clearTimeout(c.timeout)}if(JC.Panel.getInstance(e)){JC.Panel.getInstance(e).center().show();return JC.Panel.getInstance(e)}c.dialogIdentifier();var f=new JC.Panel(e,h,i,g);c.dialogIdentifier(f);c.showMask();f.selector().css("z-index",window.ZINDEX_COUNT++);f.on("close_default",function(j,k){c.hideMask()});f.on("hide_default",function(j,k){c.hideMask()});f.on("show_default",function(j,k){c.showMask()});c.timeout=setTimeout(function(){f.show(0)},c.showMs);return f};JC.Dialog.msgbox=function(j,i,h,g){if(!j){return}var f=(JC.Dialog.msgbox.tpl||c.tpls.msgbox).replace(/\{msg\}/g,j).replace(/\{status\}/g,c.getStatusClass(i||""));var e=JC.Dialog(f);c.fixWidth(j,e);h&&e.on("close",h);e.autoClose();return e};JC.Dialog.msgbox.tpl;JC.Dialog.alert=function(i,h,g){if(!i){return}var f=(JC.Dialog.alert.tpl||c.tpls.alert).replace(/\{msg\}/g,i).replace(/\{status\}/g,c.getStatusClass(h||""));var e=JC.Dialog(f);c.fixWidth(i,e);g&&e.on("confirm",g);return e};JC.Dialog.alert.tpl;JC.Dialog.confirm=function(i,h,g){if(!i){return}var f=(JC.Dialog.confirm.tpl||c.tpls.confirm).replace(/\{msg\}/g,i).replace(/\{status\}/g,c.getStatusClass(h||""));var e=JC.Dialog(f);c.fixWidth(i,e);g&&e.on("confirm",g);return e};JC.Dialog.confirm.tpl;JC.Dialog.mask=function(e){!e&&c.showMask();e&&c.hideMask()};var c={timeout:null,showMs:10,minWidth:180,maxWidth:500,dialogIdentifier:function(e){if(!e){c.hideMask();b("body > div.UPanelDialog_identifer").hide();b("body > div.UPanel_TMP").remove()}else{e.selector().addClass("UPanelDialog_identifer");e.selector().data("DialogInstance",e)}},showMask:function(){var f=b("#UPanelMask"),e=b("#UPanelMaskIfrmae");if(!f.length){b(c.tpls.mask).appendTo("body");f=b("#UPanelMask"),e=b("#UPanelMaskIfrmae")}e.show();f.show();c.setMaskSizeForIe6();e.css("z-index",window.ZINDEX_COUNT++);f.css("z-index",window.ZINDEX_COUNT++)},hideMask:function(){var f=b("#UPanelMask"),e=b("#UPanelMaskIfrmae");if(f.length){f.hide()}if(e.length){e.hide()}},setMaskSizeForIe6:function(){var g=b("#UPanelMask"),f=b("#UPanelMaskIfrmae");if(!(g.length&&f.length)){return}var e={position:"absolute",top:"0px",left:b(document).scrollLeft()+"px",height:b(document).height()+"px",width:b(window).width()+"px"};g.css(e);f.css(e)},getStatusClass:function(e){var f="UPanelSuccess";switch(e){case 0:f="UPanelSuccess";break;case 1:f="UPanelError";break;case 2:f="UPanelAlert";break}return f},fixWidth:function(h,g){var f=b('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+h+"</div>").appendTo("body"),e=f.width()+80;e>c.maxWidth&&(e=c.maxWidth);e<c.minWidth&&(e=c.minWidth);g.selector().css("width",e)},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),mask:['<div id="UPanelMask" class="UPanelMask"></div>','<iframe src="about:blank" id="UPanelMaskIfrmae"',' frameborder="0" class="UPanelMaskIframe"></iframe>'].join("")}};b(document).on("click",function(h){var f=b(h.target||h.srcElement),i=f.attr("paneltype"),k=f.attr("panelmsg"),j;if(!(i&&k)){return}i=i.toLowerCase();if(!/dialog\./.test(i)){return}i=i.replace(/.*?\./,"");f.prop("nodeName")&&f.prop("nodeName").toLowerCase()=="a"&&h.preventDefault();var g=(parseInt(f.attr("panelstatus"),10)||0),e=f.attr("panelcallback"),l=f.attr("panelcancelcallback");e&&(e=window[e]);l&&(l=window[l]);if(!(i in JC.Dialog)){return}j=JC.Dialog[i](k,g);f.is("[panelclickclose]")&&j.clickClose(!parseBool(f.attr("panelclickclose")));parseBool(f.attr("panelclickclose"))&&h.stopPropagation();if(i=="msgbox"){e&&j.on("close",e)}else{e&&j.on("confirm",e)}if(l){j.on("cancel",l)}});b(window).on("resize scroll",function(e){b("body > div.UPanelDialog_identifer").each(function(){var f=b(this);if(f.data("DialogInstance")){if(!f.data("DialogInstance").selector().is(":visible")){return}if(e.type.toLowerCase()=="resize"){f.data("DialogInstance").center()}c.setMaskSizeForIe6()}})})}(jQuery));