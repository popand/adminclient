"use strict";

angular.module('app.products', [
    'ui.router',
    'libertas'
]);


angular.module('app.products').config(function ($stateProvider) {

    $stateProvider
        .state('app.products', {
            abstract: true,
            data: {
                title: 'Products'
            }
        })

        .state('app.products.vod', {
            url: '/products/vod',
            data: {
                title: 'VOD'
            },
            views: {
                "content@app": {
                    templateUrl: "app/products/views/vod.html",
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
        });
});
