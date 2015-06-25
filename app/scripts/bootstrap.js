require.config({
    baseUrl: '/',
    paths: {
        'app' : 'scripts/app',
		'angular': '/bower_components/angular/angular',
		'angular-route': '/bower_components/angular-route/angular-route',
        'angular-cookies': '/bower_components/angular-cookies/angular-cookies',
        'angular-animate':'/bower_components/angular-animate/angular-animate',
        'ui-bootstrap':'/bower_components/angular-bootstrap/ui-bootstrap.min',
        'ui-bootstrap-tpls':'/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',

		'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min',
		'jquery': '/bower_components/jquery/dist/jquery',
        'parse': '/bower_components/parse/parse',

        'webcomponents-lite':'/bower_components/webcomponentsjs/webcomponents-lite.min'
    },

    shim: {
		'app': {
			deps: [ 'angular', 'angular-route', 'angular-cookies',
                    'angular-animate', 'ui-bootstrap', 'ui-bootstrap-tpls',
                    'bootstrap', 'parse', 'webcomponents-lite' ]
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
	}
});

require
(
    [
        'app'
    ],
    function(app)
    {
        angular.bootstrap(document, ['app']);
    }
);