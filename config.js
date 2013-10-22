/**
 * requirejs config.js for JC Project
 */
requirejs.config( {
    baseUrl: '../../../'
    , paths: {
        'domReady': 'plugins/domReady'

        , 'JC.BaseMVC': 'comps/BaseMVC/BaseMVC'

        , 'JC.AjaxUpload': 'comps/AjaxUpload/AjaxUpload'

        , 'JC.Valid': 'comps/Valid/Valid'
        , 'JC.Calendar': 'comps/Calendar/Calendar'
        , 'JC.Panel': 'comps/Panel/Panel'

        , 'JC.Form': 'comps/Form/Form'
        , 'JC.AutoChecked': 'comps/AutoChecked/AutoChecked'
        , 'JC.AutoSelect': 'comps/AutoSelect/AutoSelect'
    }
});
JC.PATH = '../../../';
