/**
 * Placeholder 占位符提示功能
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Placeholder.html' target='_blank'>API docs</a>
 * | <a href='../../comps/Placeholder/_demo' target='_blank'>demo link</a></p>
 * <p><b>require</b>: <a href='window.jQuery.html'>jQuery</a></p>
 * <h2>可用的 HTML attribute</h2>
 * <dl>
  * </dl>
 * @namespace JC
 * @class Placeholder
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1
 * @author  qiushaowei   <suches@btbtd.org> | 75 Team
 * @date    2013-10-19
 */
;(function($){

    JC.Placeholder = Placeholder;

    function Placeholder( _selector ){
        if( Placeholder.Model.isSupport ) return;
        _selector && ( _selector = $( _selector ) );
        if( Placeholder.getInstance( _selector ) ) return Placeholder.getInstance( _selector );
        Placeholder.getInstance( _selector, this );
        //JC.log( Placeholder.Model._instanceName );

        this._model = new Placeholder.Model( _selector );
        this._view = new Placeholder.View( this._model );

        this._init();

        JC.log( 'Placeholder:', new Date().getTime() );
    }
    /**
     * 获取或设置 Placeholder 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {PlaceholderInstance}
     */
    Placeholder.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( Placeholder.Model._instanceName, _setter );

            return _selector.data( Placeholder.Model._instanceName );
        };
    /**
     * 初始化可识别的 Placeholder 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of PlaceholderInstance}
     */
    Placeholder.init =
        function( _selector ){
            var _r = [], _nodeName;
            if( Placeholder.Model.isSupport ) return;
            _selector = $( _selector || document );

            if( _selector 
                    && _selector.length 
                    && ( _nodeName = _selector.prop('nodeName').toLowerCase() ) 
            ){
                if( _nodeName == 'text' || _nodeName == 'textarea' ){
                    _selector.is('[placeholder]') 
                        && _r.push( new Placeholder( _selector ) )
                        ;
                }else{
                    _selector.find( [ 
                                        'input[type=text][placeholder]'
                                        , 'textarea[placeholder]'
                                        , 'input[type=text][xplaceholder]'
                                        , 'textarea[xplaceholder]'
                    ].join(',') ).each( function(){
                        _r.push( new Placeholder( this ) );
                    });
                }
            }
            return _r;
        };

    Placeholder.className = 'xplaceholder';

    Placeholder.prototype = {
        _beforeInit:
            function(){
                //JC.log( 'Placeholder _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this;

                _p._model.selector().on( 'focus', function( _evt ){
                    _p._view.clear();
                });

                _p._model.selector().on( 'keypress', function( _evt ){
                    JC.log( 'keypress', new Date().getTime() );
                });

                _p._model.selector().on( 'keydown', function( _evt ){
                    JC.log( 'keydown', new Date().getTime() );
                });

                _p._model.selector().on( 'keyup', function( _evt ){
                    JC.log( 'keyup', new Date().getTime() );
                });

                _p.on( 'CPUpdate', function( _evt ){
                    _p._view.update();
                });
            }
        , _inited:
            function(){
                //JC.log( 'Placeholder _inited', new Date().getTime() );
                var _p = $(this);
                _p.trigger( 'CPUpdate' );
            }
    };

    BaseMVC.buildModel( Placeholder );
    Placeholder.Model._instanceName = 'Placeholder';

    //Placeholder.Model.isSupport = 'placeholder' in $('<input type="text" />')[0];
    Placeholder.Model.isSupport = false;

    Placeholder.Model.prototype = {
        init:
            function(){
                //JC.log( 'Placeholder.Model.init:', new Date().getTime() );
            }

        , className:
            function(){
                var _r = this.attrProp( 'cphClassName' ) || Placeholder.className;
                return _r;
            }

        , text:
            function(){
                var _r = this.attrProp( 'xplaceholder' ) || this.attrProp( 'placeholder' ) || '';
                return _r;
            }

        , placeholder:
            function(){
                if( !this._placeholder ){
                    this._placeholder = $( printf( '<div class="{0}"></div>'
                                , this.className() 
                            ) )
                            .appendTo( this.placeholderBox() );
                }
                this._placeholder.html( this.text() );
                return this._placeholder;
            }

        , placeholderBox:
            function(){
                var _r = $( '#XPlaceHolderBox' );
                if( !( _r && _r.length ) ){
                    _r = $( '<div id="XPlaceHolderBox"></div>' ).appendTo( document.body );
                }
                return _r;
            }
    };

    BaseMVC.buildView( Placeholder );
    Placeholder.View.prototype = {
        init:
            function(){
                //JC.log( 'Placeholder.View.init:', new Date().getTime() );
            }

        , update:
            function(){
                var _p = this
                    , _v = _p._model.selector().val()
                    , _holder = _p._model.placeholder()
                    ;
                if( _v ){
                    _holder.hide();
                    return;
                }

                var _offset = _p._model.selector().offset()
                    , _h = _p._model.selector().prop('offsetHeight')
                    , _hh = _holder.prop( 'offsetHeight' )
                    , _ptop = 1
                    ;

                _hh > _h && ( _ptop = Math.ceil( ( _hh - _h ) / 2 ) + 1 );
                //alert( _h + ', ' + _hh + ', ' + _ptop );

                _holder.css( { 'left': _offset.left + 'px', 'top': _offset.top + _ptop + 'px' } );

                _holder.show();
            }
    };

    BaseMVC.build( Placeholder );

    $(document).ready( function(){
        var _insAr = 0;
        Placeholder.autoInit
            && ( _insAr = Placeholder.init() )
            ;
    });

}(jQuery));
