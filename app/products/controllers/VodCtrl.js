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
        // config.tags = ['carousel', 'latest', 'recommendation'];
        config.productIds = ["11caed9e-52d5-4311-b17b-e6d3719d3156"];

        return Product.retrieveByIds(config)
            .then(function(data) {
                return {
                    data: data.content,
                    total: data.totalElements
                };
            });
    }

    function edit(product) {
        $state.go('app.products.detail', {id: product.id});
    }
}
