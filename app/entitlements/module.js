(function() {
    'use strict';

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
                        templateUrl: "app/entitlements/entitlements.html",
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
            .state('app.entitlements.details', {
                url: '{id}',
                data: {
                    title: 'Entitlement',
                    htmlTitle: '{{ state.params.id }}'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/_common/views/simple-details.tpl.html',
                        controller: 'EntitlementDetailsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entitlement: function($stateParams, Entitlement) {
                        var id = $stateParams.id;
                        return id === 'create'? new Entitlement() : Entitlement.find(id);
                    }
                }
            });
    });

}());
