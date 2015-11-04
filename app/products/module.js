(function() {
    'use strict';

    angular.module('app.products', [
        'ui.router',
        'libertas'
    ]);


    angular.module('app.products').config(function ($stateProvider) {

        $stateProvider
            .state('app.products', {
                url: '/products/',
                data: {
                    title: 'Products'
                },
                redirectTo: 'app.products.vod'
            })

            .state('app.products.vod', {
                url: 'vod',
                data: {
                    title: 'VOD'
                },
                views: {
                    "content@app": {
                        templateUrl: "app/products/vod/vod.html",
                        controller: 'VodCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    scripts: function(lazyScript){
                        return lazyScript.register([
                            'datatables',
                            'datatables-bootstrap',
                            'datatables-colvis',
                            'datatables-tools',
                            'datatables-responsive'
                        ]);
                    }
                }
            })

             .state('app.products.details', {
                url: '{id}',
                data: {
                    title: 'Product',
                    htmlTitle: '{{ state.params.id }}'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/_common/views/simple-details.tpl.html',
                        controller: 'ProductDetailsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    product: function($stateParams, Product) {
                        var id = $stateParams.id;
                        return id === 'create'? new Product() : Product.find(id);
                    }
                }
            });

    });
}());
