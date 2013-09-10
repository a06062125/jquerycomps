;(function($){
    /**
     * 多选月份和多选日期 复合使用
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/window.Bizs.MonthDay.html' target='_blank'>API docs</a>
     * | <a href='../../bizs/MonthDay/_demo' target='_blank'>demo link</a></p>
     * require: <a href='../classes/window.jQuery.html'>jQuery</a>
     * <br/>require: <a href='../classes/JC.Calendar.html'>JC.Calendar</a>
     * <br/>require: <a href='../classes/Bizs.DisableLogic.html'>Bizs.DisableLogic</a>
     *
     * <h2>可用的 HTML 属性</h2>
     * <dl></dl>
     * @namespace       window.Bizs
     * @class           MonthDay
     * @extends         JC.BaseMVC
     * @constructor 
     * @version dev 0.1 2013-09-10
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     */
    Bizs.MonthDay = MonthDay;
    function MonthDay( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( MonthDay.getInstance( _selector ) ) return MonthDay.getInstance( _selector );
        MonthDay.getInstance( _selector, this );

        this._model = new MonthDay.Model( _selector );
        this._view = new MonthDay.View( this._model );

        this._init( );
    }
    
    !JC.Calendar && JC.use( 'Calendar' );

    /**
     * 处理 form 或者 _selector 的所有form.js_autoMonthDay
     * @method  init
     * @param   {selector}  _selector
     * @return  {Array}     Array of MonthDayInstance
     * @static
     */
    MonthDay.init =
        function( _selector ){
            var _r = [];
            _selector && ( _selector = $( _selector ) );
            if( !( _selector && _selector.length ) ) return;
            if( _selector.prop('nodeName').toLowerCase() == 'form' ){
                _r.push( new MonthDay( _selector ) );
            }else{
                _selector.find('form.js_autoMonthDay').each( function(){
                    _r.push( new MonthDay( this  ) );
                });
            }
            return _r;
        };

    MonthDay.prototype = {
        _beforeInit:
            function(){
                JC.log( 'MonthDay._beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
            }
    };

    JC.BaseMVC.buildModel( MonthDay );

    MonthDay.Model._instanceName = 'MonthDayIns';

    MonthDay.Model.prototype = {
        init:
            function(){
            }
    };

    JC.BaseMVC.buildView( MonthDay );
    MonthDay.View.prototype = {
    };

    JC.BaseMVC.build( MonthDay, 'Bizs' );

    $(document).ready( function(){
        setTimeout( function(){
            MonthDay.autoInit && MonthDay.init( $(document) );
        }, 1 );
    });

}(jQuery));
