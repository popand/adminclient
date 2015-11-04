"use strict";

angular.module('app.offers', [
    'ui.router',
    'libertas'
]);


angular.module('app.offers').config(function ($stateProvider) {
    $stateProvider
        .state('app.offers', {
            url: '/offers/',
            data: {
                title: 'Offers',
                htmlTitle: '<a data-ui-sref="app.offers">Offers</a>',
            },
            views: {
                "content@app": {
                    templateUrl: "app/offers/offers.html",
                    controller: 'OffersCtrl',
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
        .state('app.offers.details', {
            url: '{id}',
            data: {
                title: 'Offer',
                htmlTitle: '{{ state.params.id }}'
            },
            views: {
                "content@app": {
                    templateUrl: "app/_common/views/simple-details.tpl.html",
                    controller: 'OfferDetailsCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                offer: function($stateParams, Offer) {
                    var id = $stateParams.id;
                    return id === 'create'? new Offer() : Offer.find(id);
                }
            }
        });
});
