"use strict";

angular.module('app.promotions', [
    'ui.router',
    'libertas'
]);


angular.module('app.promotions').config(function ($stateProvider) {
    $stateProvider
        .state('app.promotions', {
            url: '/promotions/',
            data: {
                title: 'Promotions',
                htmlTitle: '<a data-ui-sref="app.promotions">Promotions</a>',
            },
            views: {
                "content@app": {
                    templateUrl: "app/promotions/promotions.html",
                    controller: 'PromotionsCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                scripts: function(lazyScript) {
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
        .state('app.promotions.details', {
            url: '{id}',
            data: {
                title: 'Promotion',
                htmlTitle: '{{ state.params.id }}'
            },
            views: {
                "content@app": {
                    templateUrl: "app/_common/views/simple-details.tpl.html",
                    controller: 'PromotionDetailsCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                scripts: function(lazyScript) {
                    return lazyScript.register(['bootstrap-tagsinput']);
                },

                promotion: function($state, $stateParams, Promotion) {
                    var id = $stateParams.id;

                    if (id === 'create') {
                        return new Promotion();
                    }

                    return Promotion.find(id)
                        .then(function(data) {
                            return data.promotion;
                        });
                }
            }
        });
});
