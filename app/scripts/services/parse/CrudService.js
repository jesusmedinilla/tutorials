define(['app'], function(app)
{
    app.factory('CrudService', CrudService );

    CrudService.$inject = ['$rootScope','$q'];
    function CrudService( $rootScope, $q )
    {
		var service = {};

		service.getList = getList;
		service.updateItem = updateItem;
		service.createItem = createItem;
		service.getItemById = getItemById;
		service.deleteItem = deleteItem;

		return service;

		function getList()
		{
			var deferred = $q.defer();

			var Wedding = Parse.Object.extend("Wedding");
			var query = new Parse.Query(Wedding);

			query.find({
				success: function(results)
				{
					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						object.name = object.get('name');
						//object.id = object.get('objectId');
					}

					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: true, result : results });
					});
				},
				error: function(error)
				{
					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: false, message: error.message });
					});
				}
			});

			return deferred.promise;
		}

		function updateItem( item )
		{
			var deferred = $q.defer();

			var Wedding = Parse.Object.extend("Wedding");
			var wedding = new Wedding();
			wedding.set("objectId", item.id);
			wedding.set("name", item.name);

			wedding.save( null,
			 {
				success: function(result)
				{
					var object = result;
					object.name = object.get('name');

					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: true, result : result });
					});
				},
				error: function(error)
				{
					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: false, message: error.message });
					});
				}
			});

			return deferred.promise;
		}

		function createItem( item )
		{
			var deferred = $q.defer();

			var Wedding = Parse.Object.extend("Wedding");

			var wedding = new Wedding();

			wedding.save({
				name: item.name
			}, {
				success: function(result)
				{
					var object = result;
					object.name = object.get('name');

					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: true, result : result });
					});
				},
				error: function(error)
				{
					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: false, message: error.message });
					});
				}
			});

			return deferred.promise;
		}

		function getItemById( id )
		{
			var deferred = $q.defer();

			var Wedding = Parse.Object.extend("Wedding");
			var query = new Parse.Query(Wedding);
			query.get(id, {
				success: function(result)
				{
					var object = result;
					object.name = object.get('name');

					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: true, result : result });
					});
				},
				error: function(error)
				{
					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: false, message: error.message });
					});
				}
			});

			return deferred.promise;
		}

		function deleteItem( item )
		{
			var deferred = $q.defer();

			item.destroy({
				success: function(result)
				{
					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: true, result : result });
					});
				},
				error: function(error)
				{
					$rootScope.$apply( function ()
					{
						deferred.resolve({ success: false, message: error.message });
					});
				}
			});

			return deferred.promise;
		}
    }
})