 ;(function($){
    /**
     * Ajax 文件上传
     * <p>
     *      <a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     *      | <a href='http://jc.openjavascript.org/docs_api/classes/JC.AjaxUpload.html' target='_blank'>API docs</a>
     *      | <a href='../../comps/AjaxUpload/res' target='_blank'>avaliable style</a>
     *      | <a href='../../comps/AjaxUpload/_demo' target='_blank'>demo link</a>
     * </p>
     * <p>
     *      <b>require</b>: <a href='window.jQuery.html'>jQuery</a>
     *      <br /><b>require</b>: plugins.jquery.form
     * </p>
     * <h2>可用的 html attribute</h2>
     * <dl>
     * </dl>
     * @namespace JC
     * @class AjaxUpload
     * @constructor
     * @param   {selector}   _selector   
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-09-26
     */
    JC.AjaxUpload = AjaxUpload;

    function AjaxUpload( _selector ){
        if( AjaxUpload.getInstance( _selector ) ) return AjaxUpload.getInstance( _selector );
        AjaxUpload.getInstance( _selector, this );
        //JC.log( AjaxUpload.Model._instanceName );

        this._model = new AjaxUpload.Model( _selector );
        this._view = new AjaxUpload.View( this._model );

        JC.log( 'AjaxUpload init', new Date().getTime() );

        this._init();
    }
    /**
     * 获取或设置 AjaxUpload 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {AjaxUploadInstance}
     */
    AjaxUpload.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( AjaxUpload.Model._instanceName, _setter );

            return _selector.data( AjaxUpload.Model._instanceName );
        };

    AjaxUpload.init =
        function( _selector ){
            _selector = $( _selector || document );
            _selector.find('input.js_compAjaxUpload, button.js_compAjaxUpload').each( function(){
                new AjaxUpload( $(this) )
            });
        };

    AjaxUpload._FRAME_DIR = "comps/AjaxUpload/frame/";
    AjaxUpload.frameFileName = 'default.html';
    AjaxUpload.randomFrame = false;
    AjaxUpload.INS_COUNT = 1;

    AjaxUpload.prototype = {
        _beforeInit:
            function(){
                var _p = this;
                JC.log( 'AjaxUpload _beforeInit', new Date().getTime() );
                
            }
        , _initHanlderEvent:
            function(){
                var _p = this;
                /**
                 * iframe 加载完毕后触发的事件, 执行初始化操作
                 */
                _p.on( 'FrameLoad', function(_evt){
                    var _w = _p._model.frame().prop( 'contentWindow' );
                    if( !( _w && _w.initPage ) ) return;
                    _w.initPage( _p, _p._model );
                });
                /**
                 * 文件扩展名错误
                 */
                _p.on( 'ERR_FILE_EXT', function( _evt, _flPath ){
                    _p._view.errFileExt( _flPath );
                    _p._view.updateChange();
                });
                /**
                 * 上传前触发的事件
                 */
                _p.on( 'BeforeUpload', function( _d ){
                    _p._view.beforeUpload();
                });
                /**
                 * 上传完毕触发的事件
                 */
                _p.on( 'UploadDone', function( _evt, _d ){
                    JC.log( _d );
                    var _err = false, _od = _d;
                    try{ _d = $.parseJSON( _d ); } catch( ex ){ _d = {}; _err = true; }
                    //_err = true;
                    //_d.errorno = 1;
                    //_d.errmsg = "test error"
                    if( _err ){
                        _p._view.errFatalError( _od );
                        _p._view.updateChange();
                    }else{
                        if( _d.errorno ){
                            _p._view.errUpload( _d );
                            _p._view.updateChange();
                        }else{
                            _p._view.updateChange( _d );
                        }
                        _p._model.cauUploadDoneCallback()
                            && _p._model.cauUploadDoneCallback.call( _p, _d
                                                                    , _p._model.selector()
                                                                    , _p._model.frame() 
                                                                    );
                    }
                });
            }
        , _inited:
            function(){
                var _p = this;
                JC.log( 'AjaxUpload _inited', new Date().getTime() );
                _p._view.loadFrame();
            }
    };

    BaseMVC.buildModel( AjaxUpload );
    AjaxUpload.Model._instanceName = 'AjaxUpload';
    AjaxUpload.Model.prototype = {
        init:
            function(){
                JC.log( 'AjaxUpload.Model.init:', new Date().getTime() );
            }

        , cauUrl: function(){ return this.attrProp( 'cauUrl' ); }

        , cauFileExt: function(){ return this.stringProp( 'cauFileExt' ); }

        , cauFileName: function(){ return this.attrProp('cauFileName') || 'file'; }

        , cauLabelKey: function(){ return this.attrProp( 'cauLabelKey' ) || 'name'; }
        , cauValueKey: function(){ return this.attrProp( 'cauValueKey' ) || 'url'; }

        , cauStatusLabel: function(){ return this.selectorProp( 'cauStatusLabel' ); }
        , cauDisplayLabel: function(){ return this.selectorProp( 'cauDisplayLabel' ); }

        , cauUploadDoneCallback:
            function(){
                return this.callbackProp( 'cauUploadDoneCallback' );
            }

        , cauValue:
            function( _d ){
                var _p = this, _displayLabel = _p.cauDisplayLabel(), _label = ''
                if( typeof _d != 'undefined' ){
                    var _value = _d.data[ _p.cauValueKey() ];
                    _label = _d.data[ _p.cauLabelKey() ];
                    _p.selector().val( _value )

                }
                _displayLabel 
                    && _displayLabel.length
                    && _displayLabel.html( _label ) 
                    ;
                return _p.selector().val();
            }

        , framePath:
            function(){
                var _fl = this.attrProp('cauFrameFileName') || AjaxUpload.frameFileName
                    , _r = printf( '{0}{1}{2}', JC.PATH, AjaxUpload._FRAME_DIR, _fl )
                    ;
                this.randomFrame() 
                    && ( _r = addUrlParams( _r, { 'rnd': new Date().getTime() } ) )
                    ;
                return _r;
            }
        , randomFrame:
            function(){
                var _r = AjaxUpload.randomFrame;
                this.selector().is( '[cauRandomFrame]' )
                    && ( _r = this.boolProp( 'cauRandomFrame') )
                    ;
                return _r;
            }

        , frame:
            function(){
                if( !this._iframe ){
                    var _tpl = AjaxUpload.frameTpl;
                    if( this.selector().is('[cauFrameScriptTpl]') ){
                        _tpl = scriptContent( parentSelector( 
                                                            this.selector()
                                                            , this.selector().attr('cauFrameScriptTpl') 
                                                            ) 
                                );
                    }
                    this._iframe = $( AjaxUpload.frameTpl );
                }
                return this._iframe;
            }
    };

    BaseMVC.buildView( AjaxUpload );
    AjaxUpload.View.prototype = {
        init:
            function(){
                JC.log( 'AjaxUpload.View.init:', new Date().getTime() );
                var _p = this;

                //_p._model.selector().prop('disabled', true);
            }

        , loadFrame:
            function(){
                var _p = this, _path = _p._model.framePath()
                    , _frame = _p._model.frame()
                    ;

                JC.log( _path );

                _frame.attr( 'src', _path );
                _frame.on( 'load', function(){
                    $(_p).trigger( 'TriggerEvent', 'FrameLoad' );
                });

                //_p._model.selector().hide();

                _p._model.selector().before( _frame );
            }

        , beforeUpload:
            function(){
                var _p = this, _statusLabel = _p._model.cauStatusLabel();
                JC.log( 'AjaxUpload view#beforeUpload', new Date().getTime() );

                this.updateChange( null, true );

                if( _statusLabel && _statusLabel.length ){
                    _p._model.selector().hide();
                    _p._model.frame().hide();
                    _statusLabel.show();
                }
            }

        , updateChange:
            function( _d, _noLabelAction ){
                var _p = this
                    , _statusLabel = _p._model.cauStatusLabel()
                    , _displayLabel = _p._model.cauDisplayLabel()
                    ;
                //JC.log( 'AjaxUpload view#updateChange', new Date().getTime() );

                if( _statusLabel && _statusLabel.length && !_noLabelAction ){
                    _p._model.selector().show();
                    _p._model.frame().show();
                    _statusLabel.hide();
                }

                _p._model.selector().val( '' );
                if( _d && ( 'errorno' in _d ) && !_d.errorno ){
                    _p._model.cauValue( _d );

                    if( _displayLabel && _displayLabel.length ){
                        _p._model.selector().hide();
                        _p._model.frame().hide();
                        _displayLabel.show();
                        return;
                    }
                }
            }

        , errUpload:
            function( _d ){
                var _p = this, _cb = _p._model.callbackProp( 'cauUploadErrCallback' );
                if( _cb ){
                    _cb.call( _p._model.selector(), _d, _p._model.frame() );
                }else{
                    var _msg = _d && _d.errmsg ? _d.errmsg : '上传失败, 请重试!';
                    JC.Dialog 
                        ? JC.Dialog.alert( _msg, 1 )
                        : alert( _msg )
                        ;
                }
            }

        , errFileExt: 
            function( _flPath ){
                var _p = this, _cb = _p._model.callbackProp( 'cauFileExtErrCallback' );
                if( _cb ){
                    _cb.call( _p._model.selector(), _p._model.cauFileExt(), _flPath, _p._model.frame() );
                }else{
                    var _msg = printf( '类型错误, 允许上传的文件类型: {0} <p class="auExtErr" style="color:red">{1}</p>'
                                        , _p._model.cauFileExt(), _flPath );
                    JC.Dialog 
                        ? JC.Dialog.alert( _msg, 1 )
                        : alert( _msg )
                        ;
                }
            }

        , errFatalError: 
            function( _d ){
                var _p = this, _cb = _p._model.callbackProp( 'cauFatalErrorCallback' );
                if( _cb ){
                    _cb.call( _p._model.selector(), _d, _p._model.frame() );
                }else{
                    var _msg = printf( '服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>'
                                        , _d );
                    JC.Dialog 
                        ? JC.Dialog.alert( _msg, 1 )
                        : alert( _msg )
                        ;
                }
            }

    };

    BaseMVC.build( AjaxUpload );

    AjaxUpload.frameTpl =
        printf(
                '<iframe src="about:blank" frameborder="0" class="AUIframe" style="{0}"></iframe>'
                , 'width: 84px; height: 24px;cursor: pointer; vertical-align: middle;'
              );
            ;

    $(document).ready( function(){
        AjaxUpload.autoInit && AjaxUpload.init();
    });

}(jQuery));

