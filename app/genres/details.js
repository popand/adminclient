(function() {
    'use strict';

    angular.module('app.genres')
        .controller('GenreDetailsCtrl', GenreDetailsCtrl);

    GenreDetailsCtrl.$inject = [
        'Genre',
        'genre',
        'customFormlyFields'
    ];

    function GenreDetailsCtrl(Genre, genre, fields) {
        var vm = this;

        genre.date = '123';
        vm.model = genre;
        vm.onSave = submit;
        vm.onDelete = remove;

        vm.fields = [
            fields.name,
            fields.tenantId
        ];

        function submit() {
            return Genre.save(vm.model);
        }

        function remove() {
            return Genre.remove(vm.model.id);
        }
    }
}());
