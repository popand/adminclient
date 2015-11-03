"use strict";

angular.module('app.entitlements', [
    'ui.router',
    'libertas'
]);


angular.module('app.entitlements').config(function ($stateProvider) {
    $stateProvider
        .state('app.entitlements', {
            url: '/entitlements/',
            data: {
                title: 'Entitlements',
                htmlTitle: '<a data-ui-sref="app.entitlements">Entitlements</a>',
            },
            views: {
                "content@app": {
                    templateUrl: "app/entitlements/views/entitlements.html",
                    controller: 'EntitlementsCtrl',
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
        .state('app.entitlements.detail', {
            url: '{id}',
            data: {
                title: 'Entitlement',
                htmlTitle: '{{ state.params.id }}'
            },
            views: {
                "content@app": {
                    templateUrl: "app/entitlements/views/entitlement.detail.html",
                    controller: function EntitlementDetailCtrl(entitlement) {
                        this.entitlement = entitlement;
                    },
                    controllerAs: 'vm'
                }
            },
            resolve: {
                scripts: function(lazyScript) {
                    return lazyScript.register(['jquery-validation']);
                },

                entitlement: function($stateParams, Entitlement) {
                    var id = $stateParams.id;
                    return id === 'create'? new Entitlement() : Entitlement.find(id);
                }
            }
        });
});
