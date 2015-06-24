define(['app'], function(app)
{
    app.controller('LoginController', LoginController );


    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService)
    {
        var vm = this;
        vm.dataLoading = false;
        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;

            AuthenticationService.Login(vm.username, vm.password)
                .then(function ( response ) {
                    if (response.success) {
                        AuthenticationService.SetCredentials(vm.username, vm.password);
                        vm.dataLoading = false;
                        $location.path('/weddings');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                        //alert(response.message)
                    }
                });
        };
    }

});


