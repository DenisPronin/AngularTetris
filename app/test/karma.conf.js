// Karma configuration
// Generated on Tue Jul 08 2014 12:25:28 GMT+0700 (NOVT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        '../../bower_components/angular/angular.js',
        '../../bower_components/angular-route/angular-route.js',
        '../../bower_components/angular-local-storage/angular-local-storage.js',
        '../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        '../../bower_components/angular-mocks/angular-mocks.js',
        '../../bower_components/jquery/dist/jquery.min.js',
        '../../bower_components/underscore/underscore.js',
        '../app.js',
        '../js/**/*.js',
        '../test/unit/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "../../partials/**/*.html": ["ng-html2js"]
    },

    ngHtml2JsPreprocessor: {
      // If your build process changes the path to your templates,
      // use stripPrefix and prependPrefix to adjust it.
      stripPrefix: "../../partials/.*/",
      prependPrefix: "../../partials/",

      // the name of the Angular module to create
      moduleName: "AppTetris.directives"
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
