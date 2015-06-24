define(['scripts/routes','scripts/factories/DependencyResolverFor'], function(config, dependencyResolverFor)
{
    var app = angular.module('app', [ 'ngRoute', 'ngCookies', 'ngAnimate', 'ui.bootstrap' ]);

    app.config(
    [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
        {
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;

            //$locationProvider.html5Mode(true);
            /*$locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            });*/

            if(config.routes !== undefined)
            {
                angular.forEach(config.routes, function(route, path)
                {
                    $routeProvider.when(path,
                        {
                            templateUrl:route.templateUrl,
                            controller: route.controller,
                            controllerAs: route.controllerAs,
                            resolve:dependencyResolverFor(route.dependencies)
                        });
                });
            }

            if(config.defaultRoutePath !== undefined)
            {
                $routeProvider.otherwise({redirectTo:config.defaultRoutePath});
            }
        }
    ]);

    app.run(run);
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http)
    {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

    app.run(startParse);
    function startParse()
    {
        Parse.initialize("atGimMnC7AN88LEtBepThZqhTGTSS7zLCkutq54z", "eMXl6flzsyT48vya1L6smLLRvVf0aGIUeXn4tHTv");

        var TestObject = Parse.Object.extend("TestObject");
        var testObject = new TestObject();
        testObject.save({foo: "bar"}, {
            success: function(object) {
                $(".success").show();
            },
            error: function(model, error) {
                $(".error").show();
            }
        })
    }



    // Refactorizar este controller a otro sitio (WebComponent???)

    app.controller('HeaderController', HeaderController );

    HeaderController.$inject = ['$rootScope','$scope', '$location'];
    function HeaderController($rootScope, $scope, $location)
    {
        $scope.isLogged = false;

        $rootScope.$watch(
            function(rootScope)
            {
                return $rootScope.globals.currentUser;
            },
            function(newValue, oldValue)
            {
                $scope.isLogged = newValue !== undefined;
                if( $scope.isLogged )
                    $scope.welcomeMessage = "Bienvenido, " + $rootScope.globals.currentUser.username;
            }
        );

    }

   return app;
});