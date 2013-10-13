var fs = require('fs');

var dir = __dirname + '/';

var path1 = dir + 'JC.Form.js';
//var path2 = dir + 'JC.Form.initCheckAll.js';
var path4 = dir + 'JC.Form.initAutoFill.js';
var path5 = dir + 'JC.Form.initNumericStepper.js';

var outPath = dir + 'Form.js';

if( !( fs.existsSync( path1 ) 
        //&& fs.existsSync( path2 ) 
        && fs.existsSync( path5 ) 
        && fs.existsSync( path4 )  ) ) return;

var tmp = [];
    tmp.push( fs.readFileSync( path1, 'utf8') );
    //tmp.push( fs.readFileSync( path2, 'utf8') );
    tmp.push( fs.readFileSync( path4, 'utf8') );
    tmp.push( fs.readFileSync( path5, 'utf8') );

fs.writeFileSync( outPath, tmp.join(';\n\n') );

fs.unlinkSync( path1 );
//fs.unlinkSync( path2 );
fs.unlinkSync( path4 );
fs.unlinkSync( path5 );
