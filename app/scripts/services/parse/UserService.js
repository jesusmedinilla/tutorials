define(['app'], function(app)
{
    app.factory('UserService', UserService );

    UserService.$inject = ['$rootScope','$q'];
    function UserService( $rootScope, $q ) 
    {
        var service = {};

        service.create = create;
        service.login = login;

        return service;

        
        function login( username, password, callback ) 
        {
        	var response;

			console.log('sss1');
        	Parse.User.logIn(username, password, 
        	{
        		  success: function(user) 
        		  {
					  console.log('sss');
        			  $rootScope.$apply( function () 
        			  {
        				  response = { success: true };
						  console.log('sss');
						  callback(response);
          			  });
        		  },
        		  error: function(user, error) 
        		  {
					  console.log('sss');
          			  $rootScope.$apply( function () 
          			  {
						  console.log('sss');
          				  response = { success: false, message: 'Username or password is incorrect' };
          				  callback(response);
          			  });
        		  }
        	});
        }
        
        function create( newUser )
        {
        	var deferred = $q.defer();
        	
        	var user = new Parse.User();
        	user.set("username", newUser.username);
        	user.set("password", newUser.password);
        	//user.set("email", newUser.email);
        	
        	user.signUp(null, {
        		  success: function(user) 
        		  {
        			  $rootScope.$apply( function () 
        			  {
        				  deferred.resolve({ success: true });
        			  });
        		  },
        		  error: function(user, error) 
        		  {
        			  $rootScope.$apply( function () 
        			  {
        				  deferred.resolve({ success: false, message: error.message }); //'En nombre de usuario ya esta siendo usado' });
        			  });
        		  }
        	});
        	
        	return deferred.promise;
        }
    }
})