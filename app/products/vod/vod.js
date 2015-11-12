'use strict';

angular
    .module('app.products')
    .controller('VodCtrl', VodCtrl);

VodCtrl.$inject = [
    '$state',
    'Product'
];

function VodCtrl($state, Product) {
    var vm = this;

    vm.fetch = fetchData;
    vm.edit = edit;

    function fetchData(config) {
        // config.productType = ['Movie'];

        return Product.retrieveAll(config)
            .then(function(data) {
                return {
                    data: data.content,
                    total: data.totalElements
                };
            });
    }

    function edit(product) {
        $state.go('app.products.details', {id: product.productId});
    }
}
