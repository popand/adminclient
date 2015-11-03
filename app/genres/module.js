"use strict";

angular.module('app.genres', [
    'ui.router',
    'libertas'
]);


angular.module('app.genres').config(function ($stateProvider) {
    $stateProvider
        .state('app.genres', {
            url: '/genres/',
            data: {
                title: 'Genres',
                htmlTitle: '<a data-ui-sref="app.genres">Genres</a>',
            },
            views: {
                "content@app": {
                    templateUrl: "app/genres/genres.html",
                    controller: 'GenresCtrl',
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
        .state('app.genres.details', {
            url: '{id}',
            data: {
                title: 'Genre',
                htmlTitle: '{{ state.params.id }}'
            },
            views: {
                "content@app": {
                    templateUrl: "app/_common/views/simple-details.tpl.html",
                    controllerAs: 'vm',
                    controller: 'GenreDetailsCtrl'
                }
            },
            resolve: {
                genre: function($stateParams, Genre) {
                    var id = $stateParams.id;
                    return id === 'create'? new Genre() : Genre.find(id);
                }
            }
        });
});
