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
                    templateUrl: "app/genres/views/genres.html",
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
        .state('app.genres.detail', {
            url: '{id}',
            data: {
                title: 'Genre',
                htmlTitle: '{{ state.params.id }}'
            },
            views: {
                "content@app": {
                    templateUrl: "app/genres/views/genre.detail.html",
                    controller: function GenreDetailCtrl(genre) {
                        this.genre = genre;
                    },
                    controllerAs: 'vm'
                }
            },
            resolve: {
                scripts: function(lazyScript) {
                    return lazyScript.register(['jquery-validation']);
                },

                genre: function($stateParams, Genre) {
                    var id = $stateParams.id;
                    return id === 'create'? new Genre() : Genre.find(id);
                }
            }
        });
});
