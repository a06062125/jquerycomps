/**
 * requirejs config.js for JC Project
 */
requirejs.config( {
    baseUrl: '../../../'
    , paths: {
        'common': 'common'
        , 'domReady': 'plugins/domReady'

        , 'JC.BaseMVC': 'comps/BaseMVC/BaseMVC'

        , 'JC.Valid': 'comps/Valid/Valid'
        , 'JC.Calendar': 'comps/Calendar/Calendar'

        , 'JC.Form': 'comps/Form/Form'
        , 'JC.AutoChecked': 'comps/AutoChecked/AutoChecked'
        , 'JC.AutoSelect': 'comps/AutoSelect/AutoSelect'
    }
});
