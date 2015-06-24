define([], function()
{
    return {
        defaultRoutePath: '/weddings',
        routes: {
            '/login': {
                templateUrl: '/view/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                dependencies: [
                    'view/login/LoginController',
                    'scripts/factories/AuthenticationService',
                    'scripts/factories/FlashService',
                    'scripts/services/mock/UserService'
                    //'scripts/services/parse/UserService'
                ]
            },
            '/weddings':{
                templateUrl: '/view/wedding/weddingList.view.html',
                controller: 'WeddingListController',
                controllerAs: 'vm',
                dependencies:[
                    'view/wedding/WeddingListController',
                    'scripts/factories/FlashService',
                    'scripts/services/parse/CrudService'
                ]

            },
            '/weddings/add':{
                templateUrl: '/view/wedding/weddingDetails.view.html',
                controller: 'WeddingDetailController',
                controllerAs: 'vm',
                dependencies:[
                    'view/wedding/WeddingDetailController',
                    'scripts/factories/FlashService',
                    'scripts/services/parse/CrudService'
                ]

            },
            '/weddings/:id':{
                templateUrl: '/view/wedding/weddingDetails.view.html',
                controller: 'WeddingDetailController',
                controllerAs: 'vm',
                dependencies:[
                    'view/wedding/WeddingDetailController',
                    'scripts/factories/FlashService',
                    'scripts/services/parse/CrudService'
                ]

            },
            '/register':{
                templateUrl: '/view/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                dependencies:[
                    'view/register/RegisterController',
                    'scripts/factories/FlashService',
                    'scripts/services/mock/UserService'
                ]

            }
        }
    };
});

