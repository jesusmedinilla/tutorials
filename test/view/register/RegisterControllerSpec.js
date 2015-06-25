'use strict';

module('app', function(app)
{
	console.log(app)
});

define([    'view/register/RegisterController',
            'scripts/factories/FlashService',
            'scripts/services/mock/UserService'], function(app)
{
	describe("The 'RegisterController'", function()
	{
		var $rootScope;
		var $controller;
		var $scope;
        var $q;
        var ctrl;
        var $location;
        var userService;
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
                'UserService',
                'FlashService',
                '$q',

				function($injector, _$rootScope, _$controller, $location, UserService, FlashService, $q )
				{
					$rootScope = _$rootScope;
					$scope = $rootScope.$new();
					$controller = _$controller;
                    $location = $location;
                    flashService = FlashService;
                    userService = UserService;
                    $q = $q;

                    deferred = $q.defer();
                    spyPromise = deferred.promise;
                    spied = spyOn(userService, 'create').and.returnValue(spyPromise);//.and.callThrough();

                    spiedLocation = spyOn( $location, 'path');
                }
			]);

            ctrl = $controller('RegisterController', {$scope: $scope});

		});

		it("should not be loading anything", function()
		{
			expect( ctrl ).toBeDefined();
		});

        it("should create user goes wrong", function()
        {
            var resolvedValue;

            //Sirve para mandar el resultado que me de la gana
            deferred.resolve( { success: false, message: 'Username or password is incorrect' }  );
            $rootScope.$digest();

            var spiedError = spyOn(flashService, 'Error')
            ctrl.register();

            expect( ctrl.dataLoading ).toBe( true );

            expect( spied ).toHaveBeenCalled();
            expect( spyPromise  ).toBeDefined();
            spyPromise.then(function( value )
            {
                resolvedValue = value;
                expect( spiedError ).toHaveBeenCalled();

                expect( ctrl.dataLoading ).toBe( false );
                //expect( spiedLocation ).toHaveBeenCalledWith('/login');
            });

            // Aplico el promise
            $rootScope.$apply();

            // Puedo testear cosas que hago en el then, ya que he hecho el apply
            expect( resolvedValue  ).toBeDefined();

        });

        it("should create user goes well", function()
        {
            var resolvedValue;

            //Sirve para mandar el resultado que me de la gana
            deferred.resolve( { success: true }  );
            $rootScope.$digest();

            var spiedError = spyOn(flashService, 'Error');
            var spiedSuccess = spyOn(flashService, 'Success');

            ctrl.register();

            expect( spied ).toHaveBeenCalled();
            expect( ctrl.dataLoading ).toBe( true );

            expect( spyPromise  ).toBeDefined();
            spyPromise.then(function( value )
            {
                resolvedValue = value;
                expect( ctrl.dataLoading ).toBe( false );

                expect( spiedError ).not.toHaveBeenCalled();
                expect( spiedSuccess).toHaveBeenCalled();
            });

            // Aplico el promise
            $rootScope.$apply();

            // Puedo testear cosas que hago en el then, ya que he hecho el apply
            expect( ctrl.dataLoading ).toBe( false );
            expect( resolvedValue  ).toBeDefined();

        });
	});
});