(function() {
    'use strict';

    angular.module('app.recommendations')
        .controller('RecommendationsCtrl', RecommendationsCtrl);

    RecommendationsCtrl.$inject = [
        '$state',
        'Product',
        'Recommendation'
    ];

    function RecommendationsCtrl($state, Product, Recommendation) {
        var vm = this;

        vm.fetch = fetchData;
        vm.edit = edit;

        function fetchData(config) {
            return Recommendation.list(config)
                .then(function(data) {
                    var productIds = _.pluck(data.content, 'productId');

                    var getProducts = Product.retrieveByIds({
                        productIds: productIds,
                        pageSize: productIds.length,
                        pageNumber: 0
                    });

                    return getProducts.then(resolveProductTitles);

                    function resolveProductTitles(products) {
                        var productMap = {};
                        _.each(products.content, function(x) {
                            productMap[x.productId] = x.title || x.shortTitle;
                        });

                        _.each(data.content, function(recommendation) {
                            var productId = recommendation.productId;
                            recommendation.productTitle = productMap[productId] || productId;
                        });

                        return data;
                    }
                })
                .then(function(data) {

                    return {
                        data: data.content,
                        total: data.totalElements
                    };
                });
        }

        function edit(recommendation) {
            $state.go('app.recommendations.details', {productId: recommendation.productId});
        }
    }

}());
