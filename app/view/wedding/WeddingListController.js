define(['app'], function(app)
{
    app.controller('WeddingListController', WeddingListController );

    WeddingListController.$inject = ['CrudService','FlashService'];
    function WeddingListController( CrudService, FlashService )
    {

        var vm = this;
        vm.selectedView = 'default';
        vm.weddings = [];

        CrudService.getList().then(function (response) {
            if (response.success) {
                //FlashService.Success('Registration successful', true);
                vm.weddings = response.result;
            }
            else {
                FlashService.Error(response.message);
            }
        });


        this.addWedding = function()
    	{
    		window.location = "#/weddings/add";
    	}
    }
});
