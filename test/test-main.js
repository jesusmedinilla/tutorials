var tests = [];
for (var file in window.__karma__.files)
{
	if (window.__karma__.files.hasOwnProperty(file))
	{
		if (/Spec\.js$/.test(file))
		{
			tests.push(file);
		}
	}
}

requirejs.config
({
	// Karma serves files from '/base'
	baseUrl: '/base/app',

    paths: {
        'app' : 'scripts/app',
        'angular': '../bower_components/angular/angular',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-animate':'../bower_components/angular-animate/angular-animate',
        'ui-bootstrap':'../bower_components/angular-bootstrap/ui-bootstrap.min',
        'ui-bootstrap-tpls':'../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',

        'jquery': '../bower_components/jquery/dist/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'parse': '../bower_components/parse/parse'
    },

    shim: {
        'app': {
            deps: [ 'angular', 'angular-route', 'angular-cookies',
                'angular-animate', 'ui-bootstrap', 'ui-bootstrap-tpls',
                'bootstrap', 'parse', 'jquery' ]
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['angular']
        },
        'ui-bootstrap-tpls': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    },


	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});