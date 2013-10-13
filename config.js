/**
 * JC Project config.js for requirejs
 */
requirejs.config( {
    baseUrl: '../../../'
    , paths: {
                'jquery': 'jquery'
                , 'common': 'common'

                , 'JC.BaseMVC': 'comps/BaseMVC/BaseMVC'

                , 'JC.Valid': 'comps/Valid/Valid'
                , 'JC.Calendar': 'comps/Calendar/Calendar'

                , 'JC.Form': 'comps/Form/Form'
                , 'JC.AutoChecked': 'comps/AutoChecked/AutoChecked'
                , 'JC.AutoSelect': 'comps/AutoSelect/AutoSelect'
            }
});

requirejs( ['jquery', 'common' ], function( _evt ){
    window.jqloaded && window.jqloaded();
    JC.debug = true; 
});
