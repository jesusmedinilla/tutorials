'use strict';

module('app', function(app)
{
	console.log(app)
});

define([    'view/login/LoginController',
            'scripts/factories/AuthenticationService',
            'scripts/factories/FlashService',
            'scripts/services/mock/UserService'], function(app)
{
	describe("The 'LoginController'", function()
	{
		var $rootScope;
		var $controller;
		var $scope;
        var $q;
        var ctrl;
        var $location;
        var authService;
        var flashService;

        var spyPromise;
        var spied;
        var deferred;
        var spiedLocation;

        beforeEach(function()
		{
			module('app');

            inject
			([
				'$injector',
				'$rootScope',
				'$controller',
                '$location',
                'AuthenticationService',
                'FlashService',
                '$q',

				function($injector, _$rootScope, _$controller, $location, AuthenticationService, FlashService, $q )
				{
					$rootScope = _$rootScope;
					$scope = $rootScope.$new();
					$controller = _$controller;
                    $location = $location;
                    authService = AuthenticationService;
                    flashService = FlashService;
                    $q = $q;

                    deferred = $q.defer();
                    spyPromise = deferred.promise;
                    // Guardamos el resultado de la operación login en el spyPromise
                    spied = spyOn(authService, 'Login').and.returnValue(spyPromise);//.and.callThrough();
                    //spied = spyOn(authService, 'Login').and.callThrough();

                    spiedLocation = spyOn( $location, 'path');
                }
			]);

            ctrl = $controller('LoginController', {$scope: $scope});

		});

		it("should not be loading anything", function()
		{
			expect( ctrl.dataLoading ).toBe( false );
		});

        it("should login goes wrong", function()
        {
            var resolvedValue;

            //Sirve para mandar el resultado que me de la gana
            deferred.resolve( { success: false, message: 'Username or password is incorrect' }  );
            $rootScope.$digest();

            var spiedError = spyOn(flashService, 'Error')
            ctrl.login();

            expect( spied ).toHaveBeenCalled();
            expect( ctrl.dataLoading ).toBe( true );

            expect( spyPromise  ).toBeDefined();
            spyPromise.then(function( value )
            {
                resolvedValue = value;
                expect( ctrl.dataLoading ).toBe( false );
                expect( spiedError ).toHaveBeenCalled();

                expect( spiedLocation ).toHaveBeenCalledWith('/login');
                expect( spiedLocation ).not.toHaveBeenCalledWith('/weddings');
            });

            // Aplico el promise
            $rootScope.$apply();

            // Puedo testear cosas que hago en el then, ya que he hecho el apply
            expect( ctrl.dataLoading ).toBe( false );
            expect( resolvedValue  ).toBeDefined();

        });

        it("should login goes well", function()
        {
            var resolvedValue;

            //Sirve para mandar el resultado que me de la gana
            deferred.resolve( { success: true }  );
            $rootScope.$digest();

            var spiedError = spyOn(flashService, 'Error');


            ctrl.login();

            expect( spied ).toHaveBeenCalled();
            expect( ctrl.dataLoading ).toBe( true );

            expect( spyPromise  ).toBeDefined();
            spyPromise.then(function( value )
            {
                resolvedValue = value;
                expect( ctrl.dataLoading ).toBe( false );
                expect( spiedError ).not.toHaveBeenCalled();

                expect( spiedLocation ).toHaveBeenCalledWith('/weddings');
            });

            // Aplico el promise
            $rootScope.$apply();

            // Puedo testear cosas que hago en el then, ya que he hecho el apply
            expect( ctrl.dataLoading ).toBe( false );
            expect( resolvedValue  ).toBeDefined();

        });
	});
});