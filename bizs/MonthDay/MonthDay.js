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
    /**
     *  初始初始化
     */
    $(document).delegate( 'input.js_bizsMonthDay, button.js_bizsMonthDay', 'click', function( _evt ){
        var _p = $(this), _ins = MonthDay.getInstance( _p );
        !_ins && new MonthDay( _p );
    });
}(jQuery));
