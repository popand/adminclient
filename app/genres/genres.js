'use strict';

angular.module('app.genres')
    .controller('GenresCtrl', GenresCtrl);

GenresCtrl.$inject = [
    '$state',
    'Genre'
];

function GenresCtrl($state, Genre) {
    var vm = this;

    vm.fetch = fetchData;
    vm.edit = edit;

    function fetchData(config) {
        return Genre.list(config)
            .then(function(data) {
                return {
                    data: data.content,
                    total: data.totalElements
                };
            });
    }

    function edit(genre) {
        $state.go('app.genres.details', {id: genre.id});
    }
}
