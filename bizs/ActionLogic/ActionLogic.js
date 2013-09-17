/**
 * <h2>node 点击操作逻辑</h2>
 * <br/>应用场景
 * <br/>点击后弹框( 脚本模板 )
 * <br/>点击后弹框( AJAX )
 * <br/>点击后弹框( Dom 模板 )
 * <br/>点击后执行 AJAX 操作
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc.openjavascript.org/docs_api/classes/window.Bizs.ActionLogic.html' target='_blank'>API docs</a>
 * | <a href='../../bizs/ActionLogic/_demo' target='_blank'>demo link</a></p>
 *
 * a|button 需要 添加 class="js_bizsActionLogic"
 *
 * <h2>可用的 HTML 属性</h2>
 * <dl>
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
                $( _selector ).find( 'a.js_bizsActionLogic, button.js_bizsActionLogic' ).on( 'click', function( _evt ){
                    var _p = $(this);
                    ActionLogic.process( _p ) && ( _p.prop('nodeName').toLowerCase() == 'a' && _evt.preventDefault() );
                });
        };
    /**
     * 初始化 ActionLogic, 并执行
     * @method  process
     * @param   {selector}  _selector
     * @return  {instance|null}
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

    ActionLogic.prototype = {
        _beforeInit:
            function(){
                //JC.log( 'ActionLogic._beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on('StaticPanel', function( _evt, _item ){
                    var _pins = JC.Dialog( scriptContent( _item ) );
                        _pins.on('confirm', function(){
                            if( _p._model.balPanelInitCb() 
                                && _p._model.balPanelInitCb().call( _p._model.selector(), _pins, _p ) 
                            ) return true;
                            return false;
                        });
                });
            }
        , process:
            function(){
                var _p = this;

                switch( _p._model.baltype() ){
                    case 'panel':
                        {
                            var _panelTpl = _p._model.balPanelTpl();
                            if( _panelTpl ){
                                _p.trigger('StaticPanel', [ _panelTpl ] );
                            }
                            break;
                        }
                }
            }
    };

    JC.BaseMVC.buildModel( ActionLogic );
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
        , balPanelInitCb: 
            function(){ 
                var _r, _p = this;;
                _r = _p.callbackProp( 'balPanelInitCb' ) || _r;
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
        $( document ).delegate( 'a.js_bizsActionLogic, button.js_bizsActionLogic', 'click', function( _evt ){
            var _p = $(this);
            ActionLogic.process( _p ) && ( _p.prop('nodeName').toLowerCase() == 'a' && _evt.preventDefault() );
        });
    });

}(jQuery));
