var fs = require("fs");
var vm = require("vm");

function loadScript(file){
    var s = fs.readFileSync(file,'utf-8');
    var script = new vm.Script(s, { 
        filename: file,
        displayErrors: true,
        lineOffset: 0,
        columnOffset: 0
    });
    script.runInThisContext();
}

global.window = {
    addEventListener: function(){},
    location: {

    },
    Atom: {

    },
    AtomUI:{
        createControl: function(){

        }
    },
    AtomConfig: {
        ajax: {

        }
    },
    WebAtoms:{

    }
};

global.WebAtoms = global.window.WebAtoms;
global.location = window.location;
global.AtomConfig = window.AtomConfig;

loadScript("./node_modules/web-atoms-unit/web-atoms-mock.js")
loadScript("./dist/web-atoms-mvvm.js");
loadScript("./dist/web-atoms-mvvm-mock.js");
loadScript("./node_modules/web-atoms-unit/index.js");

// load your tests..
// ideally all typescript files should be transpiled into
// one js file
loadScript("./tests/build/all-tests.js");

// .. so on.. you can write a script to load many files....

var p = WebAtoms.Unit.TestRunner.instance.run(process.argv[2]);

p.then(function(){
    process.exit();
});

p.catch(function(error){
    console.error(error);
    process.abort();
});
