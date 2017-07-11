//file config.ts
requirejs.config({
    baseUrl: 'js',

    paths: {
        'jquery': './lib/jquery-3.1.1'

    },

    shim: {
        jquery: {
            exports: '$'
        }
    }

});

// load AMD module main.ts (compiled to main.js)
// and include shims $, _, Backbone

requirejs(['main'], (main, $) => {

    var app = new main.Main();
    app.run();




});