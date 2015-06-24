define(['app'], function(app)
{
    app.controller('WeddingDetailController', WeddingDetailController );

    WeddingDetailController.$inject = [ 'CrudService', '$routeParams', 'FlashService' ];
    function WeddingDetailController( CrudService, $routeParams, FlashService )
    {
		var vm = this;
		vm.wedding = {};
		vm.dataLoading = false;
		vm.loadedId = $routeParams.id;

		if( vm.loadedId !== undefined ) {
			vm.dataLoading = true;
            CrudService.getItemById($routeParams.id).then(function (response) {
				if (response.success) {
					//FlashService.Success('Registration successful', true);
					vm.wedding = response.result;
					vm.dataLoading = false;
				}
				else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}

    	this.saveWedding = function() 
    	{
			vm.dataLoading = true;

			if (this.wedding.id !== undefined ) {
                CrudService.updateItem(this.wedding).then(function (response) {
					if (response.success) {
						vm.dataLoading = false;
						FlashService.Success('Boda actualizada correctamente', true);
						window.location = "#/";
					}
					else {
						vm.dataLoading = false;
						FlashService.Error(response.message);
					}
				});
			}
			else {
                CrudService.createItem(this.wedding).then(function (response) {
						if (response.success) {
							vm.dataLoading = false;
							FlashService.Success('Boda creada correctamente', true);
							window.location = "#/";
						}
						else {
							vm.dataLoading = false;
							FlashService.Error(response.message);
						}
					});
			}
    	}
    	
    	this.deleteWedding = function() 
    	{
			vm.dataLoading = true;
			vm.loadedId = undefined;

            CrudService.deleteItem( this.wedding ).then(function (response) {
				if (response.success) {
					FlashService.Success('Boda eliminada correctamente', true);
					window.location = "#/";
					vm.dataLoading = false;
				}
				else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
    	}
    }
})
