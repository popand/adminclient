"use strict";

angular.module('app.recommendations', [
    'ui.router',
    'ui.select',
    'libertas'
]);


angular.module('app.recommendations').config(function ($stateProvider) {
    $stateProvider
        .state('app.recommendations', {
            url: '/recommendations/',
            data: {
                title: 'Recommendations',
                htmlTitle: '<a data-ui-sref="app.recommendations">Recommendations</a>',
            },
            views: {
                "content@app": {
                    templateUrl: "app/recommendations/recommendations.html",
                    controller: 'RecommendationsCtrl',
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
        .state('app.recommendations.details', {
            url: '{productId}',
            data: {
                title: 'Recommendation',
                htmlTitle: '{{ state.params.productId }}'
            },
            views: {
                "content@app": {
                    templateUrl: "app/_common/views/simple-details.tpl.html",
                    controllerAs: 'vm',
                    controller: 'RecommendationDetailsCtrl'
                }
            },
            resolve: {
                model: function($stateParams, Recommendation) {
                    var id = $stateParams.productId;

                    if (id === 'create') {
                        return new Recommendation();
                    }

                    return Recommendation.findForProductId(id);
                }
            }
        });
});
