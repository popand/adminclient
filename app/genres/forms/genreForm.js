"use strict";


angular.module('app.genres')
    .directive('genreForm', genreForm);


function genreForm() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controllerAs: 'vm',
        controller: GenreFormController,
        bindToController: {
            genre: '='
        },
        templateUrl: 'app/genres/forms/genre-form.tpl.html',
    };
}

GenreFormController.$inject = ['$scope', '$element', '$state', 'Genre', 'formsCommon'];

function GenreFormController($scope, $form, $state, Genre, formsCommon) {
    var vm = this;

    vm.remove = remove;
    vm.submit = submit;

    function submit() {
        if (!$form.valid()) {
            return;
        }

        Genre.save(vm.genre)
            .then(goToGenres);
    }

    function remove() {
        $.SmartMessageBox({
            title: "Confirmation",
            content: "Are you sure you want to delete this row?",
            buttons: '[No][Delete]'
        }, function (pressed) {
            if (pressed === "Delete") {
                Genre.remove(vm.genre.id)
                    .then(goToGenres);
            }
        });
    }

    function goToGenres() {
        $state.go('app.genres');
    }

    $form.validate(angular.extend({
        // Rules for form validation
        rules: {
            name: {
                required: true,
                minlength: 3
            }
        },

        // Messages for form validation
        messages: {
            name: {
                required: 'The name is required'
            }
        }
    }, formsCommon.validateBootstrapOptions));
}
