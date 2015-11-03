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
                    templateUrl: "app/offers/views/offers.html",
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
        .state('app.offers.detail', {
            url: '{id}',
            data: {
                title: 'Offer',
                htmlTitle: '{{ state.params.id }}'
            },
            views: {
                "content@app": {
                    templateUrl: "app/offers/views/offer.detail.html",
                    controller: function OfferDetailCtrl(offer) {
                        this.offer = offer;
                    },
                    controllerAs: 'vm'
                }
            },
            resolve: {
                scripts: function(lazyScript) {
                    return lazyScript.register(['jquery-validation']);
                },

                offer: function($stateParams, Offer) {
                    var id = $stateParams.id;
                    return id === 'create'? new Offer() : Offer.find(id);
                }
            }
        });
});
