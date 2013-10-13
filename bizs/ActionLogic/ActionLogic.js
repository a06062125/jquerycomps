/**
 * <h2>node 点击操作逻辑</h2>
 * 应用场景
 * <br/>点击后弹框( 脚本模板 )
 * <br/>点击后弹框( AJAX )
 * <br/>点击后弹框( Dom 模板 )
 * <br/>点击后执行 AJAX 操作
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc.openjavascript.org/docs_api/classes/window.Bizs.ActionLogic.html' target='_blank'>API docs</a>
 * | <a href='../../bizs/ActionLogic/_demo' target='_blank'>demo link</a></p>
 *
 * require: <a href='../classes/window.jQuery.html'>jQuery</a>
 * <br/>require: <a href='../classes/JC.Panel.html'>JC.Panel</a>
 *
 * a|button 需要 添加 class="js_bizsActionLogic"
 *
 * <h2>可用的 HTML 属性</h2>
 * <dl>
 *      <dt>balType = string, 操作类型 </dt>
 *      <dd>
 *          <dl>
 *              <dt>类型:</dt>
 *              <dd>panel: 弹框</dd>
 *              <dd>link: 链接跳转</dd>
 *              <dd>ajaxaction: ajax操作, 删除, 启用, 禁用</dd>
 *          </dl>
 *      </dd>
 * </dl>
 * <h2>balType = panel 可用的 HTML 属性</h2>
 * <dl>
 *      <dt>balPanelTpl = script selector</dt>
 *      <dd>脚本模板选择器</dd>
 *
 *      <dt>balAjaxHtml = url</dt>
 *      <dd>返回 HTML 的 AJAX 模板</dd>
 *
 *      <dt>balAjaxData = url</dt>
 *      <dd>返回 json 的 AJAX 模板, { errorno: int, data: html } </dd>
 *
 *      <dt>balCallback = function</dt>
 *      <dd>
 *          显示模板后的回调
<xmp>function balPanelInitCb( _panelIns ){
    var _trigger = $(this);
    //return true; //如果返回真的话, 表单提交后会关闭弹框
}</xmp>
 *      </dd>
 * </dl>
 * <h2>balType = link 可用的 HTML 属性</h2>
 * <dl>
 *      <dt>balUrl = url</dt>
 *      <dd>要跳转的目标 URL</dd>
 *
 *      <dt>balConfirmMsg = string</dt>
 *      <dd>跳转前的二次确认提示信息</dd>
 *
 *      <dt>balConfirmPopupType = string, default = confirm</dt>
 *      <dd>二次确认的弹框类型: confirm, dialog.confirm</dd>
 * </dl>
 * <h2>balType = ajaxaction 可用的 HTML 属性</h2>
 * <dl>
 *      <dt>balUrl = url</dt>
 *      <dd>AJAX 操作的接口</dd>
 *
 *      <dt>balDoneUrl = url</dt>
 *      <dd>AJAX 操作完成后跳转的URL</dd>
 *
 *      <dt>balConfirmMsg = string</dt>
 *      <dd>操作前的二次确认提示信息</dd>
 *
 *      <dt>balErrorPopupType = string, default = dialog.alert</dt>
 *      <dd>错误提示的弹框类型: alert, msgbox, dialog.alert, dialog.msgbox</dd>
 *
 *      <dt>balSuccessPopupType = string, default = msgbox</dt>
 *      <dd>错误提示的弹框类型: alert, msgbox, dialog.alert, dialog.msgbox</dd>
 *
 *      <dt>balCallback = function</dt>
 *      <dd>
 *          操作完成后的回调
<xmp>function ajaxDelCallback( _d, _ins ){
    var _trigger = $(this);
    if( _d && !_d.errorno ){
        JC.msgbox( _d.errmsg || '操作成功', _trigger, 0, function(){
            reloadPage( '?usercallback=ajaxaction' );
        });
    }else{
        JC.Dialog.alert( _d && _d.errmsg ? _d.errmsg : '操作失败, 请重试!' , 1 );
    }
}
</xmp>
 *      </dd>
 * </dl>
 *
 * @namespace   window.Bizs
 * @class       ActionLogic
 * @extends         JC.BaseMVC
 * @constructor
 * @version dev 0.1 2013-09-17
 * @author  qiushaowei   <suches@btbtd.org> | 75 Team
 */
;(function($){
    window.Bizs.ActionLogic = ActionLogic;

    function ActionLogic( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( ActionLogic.getInstance( _selector ) ) return ActionLogic.getInstance( _selector );
        ActionLogic.getInstance( _selector, this );

        this._model = new ActionLogic.Model( _selector );
        this._view = new ActionLogic.View( this._model );

        this._init();
    }

    !JC.Panel && JC.use( 'Panel' );

    /**
     * 获取或设置 ActionLogic 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {ActionLogic instance}
     */
    ActionLogic.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'ActionLogicIns', _setter );

            return _selector.data('ActionLogicIns');
        };
    /**
     * 判断 selector 是否可以初始化 ActionLogic
     * @method  isActionLogic
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    ActionLogic.isActionLogic =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[baltype]' ) );
            return _r;
        };
    /**
     * 批量初始化 ActionLogic
     * <br />页面加载完毕时, 已使用 事件代理 初始化
     * <br />如果是弹框中的 ActionLogic, 由于事件冒泡被阻止了, 需要显示调用  init 方法
     * @method  init
     * @param   {selector}  _selector
     */
    ActionLogic.init =
        function( _selector ){
            _selector &&
                $( _selector ).find( [  
                                        'a.js_bizsActionLogic'
                                        , 'input.js_bizsActionLogic'
                                        , 'button.js_bizsActionLogic'
                                    ].join() ).on( 'click', function( _evt ){
                    var _p = $(this);
                    ActionLogic.process( _p ) && ( _p.prop('nodeName').toLowerCase() == 'a' && _evt.preventDefault() );
                });
        };
    /**
     * 初始化 ActionLogic, 并执行
     * @method  process
     * @param   {selector}  _selector
     * @return  {instance|null}
     * @static
     */
    ActionLogic.process =
        function( _selector ){
            _selector = $( _selector );
            if( !( _selector && _selector.length ) ) return null;
            if( !ActionLogic.isActionLogic( _selector ) ) return;
            var _ins = ActionLogic.getInstance( _selector );
                !_ins && ( _ins = new ActionLogic( _selector ) );
                _ins && _ins.process();
           return _ins;
        };

    ActionLogic.random = true;

    ActionLogic.prototype = {
        _beforeInit:
            function(){
                //JC.log( 'ActionLogic._beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this;
                /**
                 * 脚本模板 Panel
                 */
                _p.on('StaticPanel', function( _evt, _item ){
                    _p.trigger( 'ShowPanel', [ scriptContent( _item ) ] );
                });
                /**
                 * 显示 Panel
                 */
                _p.on(ActionLogic.Model.SHOW_PANEL, function( _evt, _html){
                    var _pins = JC.Dialog( _html );
                    _pins.on('confirm', function(){
                        if( _p._model.balCallback() 
                            && _p._model.balCallback().call( _p._model.selector(), _pins, _p ) 
                        ) return true;
                        return false;
                    });
                });
                /**
                 * ajax Panel
                 */
                _p.on('AjaxPanel', function( _evt, _type, _url ){
                    if( !( _type && _url ) ) return;
                    _p._model.balRandom() 
                        && ( _url = addUrlParams( _url, { 'rnd': new Date().getTime() } ) );

                    $.get( _url ).done( function( _d ){
                        switch( _type ){
                            case ActionLogic.Model.SHOW_PANEL:
                                {
                                    _p.trigger( 'ShowPanel', [ _d ] );
                                    break;
                                }
                            case ActionLogic.Model.DATA_PANEL:
                                {
                                    try{ _d = $.parseJSON( _d ); }catch(ex){}
                                    if( _d ){
                                        if( _d.errorno ){
                                            _p.trigger( 'ShowError', [ _d.errmsg || '操作失败, 请重试!', 1 ] );
                                        }else{
                                            _p.trigger( 'ShowPanel', [ _d.data ] );
                                        }
                                    }
                                    break;
                                }
                        }
                    });
                });
                /**
                 * 跳转到 URL
                 */
                _p.on( 'Go', function( _evt, _url ){
                    if( !_url ) return;
                    _p._model.balRandom() 
                        && ( _url = addUrlParams( _url, { 'rnd': new Date().getTime() } ) );
                    reloadPage( _url );
                });
                /**
                 * ajax 执行操作
                 */
                _p.on( 'AjaxAction', function( _evt, _url ){
                    if( !_url ) return;
                    _p._model.balRandom() 
                        && ( _url = addUrlParams( _url, { 'rnd': new Date().getTime() } ) );
                    $.get( _url ).done( function( _d ){
                        try{ _d = $.parseJSON( _d ); }catch(ex){}

                        if( _p._model.balCallback() ){
                            _p._model.balCallback().call( _p.selector(), _d, _p );
                        }else{
                            if( _d && 'errorno' in _d ){
                                if( _d.errorno ){
                                    _p.trigger( 'ShowError', [ _d.errmsg || '操作失败, 请重试!', 1 ] );
                                }else{
                                    _p.trigger( 'ShowSuccess', 
                                                [ 
                                                    _d.errmsg || '操作完成'
                                                    , function(){
                                                            _p._model.balDoneUrl() 
                                                            && reloadPage( _p._model.balDoneUrl() || location.href )
                                                            ;
                                                        }
                                                ]
                                    );
                                }
                            }else{
                                JC.Dialog.alert( _d, 1 );
                            }
                        }
                    });
                });
                /**
                 * 处理错误提示
                 */
                _p.on('ShowError', function( _evt, _msg, _status, _cb ){
                    var _panel;
                    switch( _p._model.balErrorPopupType() ){
                        case 'alert':
                            {
                                _panel = JC.alert( _msg, _p._model.selector(), _status || 1 );
                                _cb && _panel.on('confirm', function(){ _cb() } );
                                break;
                            }
                        case 'msgbox':
                            {
                                _panel = JC.msgbox( _msg, _p._model.selector(), _status || 1 );
                                _cb && _panel.on('close', function(){ _cb() } );
                                break;
                            }
                        case 'dialog.msgbox':
                            {
                                _panel = JC.Dialog.msgbox( _msg, _status || 1 );
                                _cb && _panel.on('close', function(){ _cb() } );
                                break;
                            }
                        default:
                            {
                                _panel = JC.Dialog.alert( _msg, _status || 1 );
                                _cb && _panel.on('confirm', function(){ _cb() } );
                                break;
                            }
                    }
                });
                /**
                 * 处理二次确认
                 */
                _p.on('ShowConfirm', function( _evt, _msg, _status, _cb ){
                    var _panel;
                    switch( _p._model.balConfirmPopupType() ){
                        case 'dialog.confirm':
                            {
                                _panel = JC.Dialog.confirm( _msg, _status || 1 );
                                _cb && _panel.on('confirm', function(){ _cb() } );
                                break;
                            }
                        default:
                            {
                                _panel = JC.confirm( _msg, _p._model.selector(), _status || 1 );
                                _cb && _panel.on('confirm', function(){ _cb() } );
                                break;
                            }
                    }
                });
                /**
                 * 处理成功提示
                 */
                _p.on('ShowSuccess', function( _evt, _msg, _cb ){
                    var _panel;
                    switch( _p._model.balSuccessPopupType() ){
                        case 'alert':
                            {
                                _panel = JC.alert( _msg, _p._model.selector() );
                                _cb && _panel.on('confirm', function(){ _cb() } );
                                break;
                            }
                        case 'dialog.alert':
                            {
                                _panel = JC.Dialog.alert( _msg );
                                _cb && _panel.on('confirm', function(){ _cb() } );
                                break;
                            }
                        case 'dialog.msgbox':
                            {
                                _panel = JC.Dialog.msgbox( _msg );
                                _cb && _panel.on('close', function(){ _cb() } );
                                break;
                            }
                        default:
                            {
                                _panel = JC.msgbox( _msg, _p.selector() );
                                _cb && _panel.on('close', function(){ _cb() } );
                                break;
                            }
                    }
                });
            }
        /**
         * 执行操作
         * @method  process
         * @return  {ActionLogicInstance}
         */
        , process:
            function(){
                var _p = this;
                JC.hideAllPopup( 1 );

                switch( _p._model.baltype() ){
                    case 'panel'://显示弹框
                        {
                            if( _p._model.is('[balPanelTpl]') ){
                                _p.trigger('StaticPanel', [  _p._model.balPanelTpl() ] );
                            }else if( _p._model.is('[balAjaxHtml]') ){
                                _p.trigger('AjaxPanel', [ ActionLogic.Model.SHOW_PANEL, _p._model.balAjaxHtml() ] );
                            }else if( _p._model.is('[balAjaxData]') ){
                                _p.trigger('AjaxPanel', [ ActionLogic.Model.DATA_PANEL, _p._model.balAjaxData() ] );
                            }
                            break;
                        }
                    case 'link'://点击跳转
                        {
                            if( _p._model.is( '[balConfirmMsg]' ) ){
                                _p.trigger( 'ShowConfirm', 
                                            [ 
                                                _p._model.balConfirmMsg()
                                                , 2
                                                , function(){
                                                    _p.trigger( 'Go', _p._model.balUrl() );
                                                  }
                                            ] 
                                    );
                            }else{
                                _p.trigger( 'Go', _p._model.balUrl() );
                            }
                            break;
                        }
                    case 'ajaxaction'://AJAX 执行操作
                        {
                            if( _p._model.is( '[balConfirmMsg]' ) ){
                                var _panel = JC.confirm( _p._model.balConfirmMsg(), _p.selector(), 2 );
                                    _panel.on('confirm', function(){
                                        _p.trigger( 'AjaxAction', _p._model.balUrl() );
                                    });
                            }else{
                                _p.trigger( 'AjaxAction', _p._model.balUrl() );
                            }
                            break;
                        }
                }
                return this;
            }
    };

    JC.BaseMVC.buildModel( ActionLogic );
    ActionLogic.Model.SHOW_PANEL = 'ShowPanel';
    ActionLogic.Model.DATA_PANEL = 'DataPanel';
    ActionLogic.Model.prototype = {
        init:
            function(){
            }
        
        , baltype: function(){ return this.stringProp( 'baltype' ); }
        , balPanelTpl: 
            function(){ 
                var _r, _p = this;;
                _r = _p.selectorProp( 'balPanelTpl' ) || _r;
                return _r;
            }
        , balCallback: 
            function(){ 
                var _r, _p = this;;
                _r = _p.callbackProp( 'balCallback' ) || _r;
                return _r;
            }
        , balAjaxHtml: function(){ return this.selector().attr('balAjaxHtml'); }
        , balAjaxData: function(){ return this.selector().attr('balAjaxData'); }
        , balRandom: 
            function(){
                var _r = ActionLogic.random, _p = this;
                _p.is('[balRandom]') && ( _r = parseBool( _p.stringProp( 'balRandom' ) ) );
                return _r;
            }
        , balUrl:
            function(){
                var _r = '?', _p = this;
                _p.selector().prop('nodeName').toLowerCase() == 'a'
                    && ( _r = _p.selector().attr('href') );
                _p.is( '[balUrl]' ) && ( _r = _p.selector().attr('balUrl') );
                return urlDetect( _r );
            }
        , balDoneUrl:
            function(){
                var _r = this.attrProp( 'balDoneUrl' );
                return urlDetect( _r );
            }
        , balConfirmMsg:
            function(){
                var _r = '确定要执行吗?';
                _r = this.selector().attr('balConfirmMsg') || _r;
                return _r;
            }
        , balErrorPopupType: 
            function(){
                var _r = this.stringProp('balErrorPopupType') || 'dialog';
                return _r;
            }
        , balSuccessPopupType: 
            function(){
                var _r = this.stringProp('balSuccessPopupType') || 'msgbox';
                return _r;
            }
        , balConfirmPopupType: 
            function(){
                var _r = this.stringProp('balConfirmPopupType') || 'confirm';
                return _r;
            }
    }

    JC.BaseMVC.buildView( ActionLogic );
    ActionLogic.View.prototype = {
        init:
            function(){
            }
    };
    JC.BaseMVC.build( ActionLogic );

    $(document).ready( function(){
        $( document ).delegate( [
                                    'a.js_bizsActionLogic'
                                    , 'input.js_bizsActionLogic'
                                    , 'button.js_bizsActionLogic'
                                ].join(), 'click', function( _evt ){
            var _p = $(this);
            ActionLogic.process( _p ) && ( _p.prop('nodeName').toLowerCase() == 'a' && _evt.preventDefault() );
        });
    });

}(jQuery));
