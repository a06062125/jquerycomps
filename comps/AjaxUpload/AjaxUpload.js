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

    AjaxUpload.prototype = {
        _beforeInit:
            function(){
                JC.log( 'AjaxUpload _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
            }
        , _inited:
            function(){
                JC.log( 'AjaxUpload _inited', new Date().getTime() );
            }
    };

    BaseMVC.buildModel( AjaxUpload );
    AjaxUpload.Model._instanceName = 'AjaxUpload';
    AjaxUpload.Model.prototype = {
        init:
            function(){
                JC.log( 'AjaxUpload.Model.init:', new Date().getTime() );
            }
    };

    BaseMVC.buildView( AjaxUpload );
    AjaxUpload.View.prototype = {
        init:
            function(){
                JC.log( 'AjaxUpload.View.init:', new Date().getTime() );
            }
    };

    BaseMVC.build( AjaxUpload );

    $(document).ready( function(){
        $('input.js_compAjaxUpload').each( function(){
            AjaxUpload.autoInit
                && new AjaxUpload( $(this) )
                ;
        });
    });

}(jQuery));

