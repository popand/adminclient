'use strict';

angular
    .module('app.auth')
    .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = [
    '$scope',
    '$state',
    'libertasAuth'
];

function RegisterCtrl($scope, $state, auth) {
    var vm = this;

    vm.register = register;
    vm.passwordConfirm = '';
    vm.user = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    };

    function register(form) {
        if (!form.valid()) {
            return;
        }

        auth.register(vm.user)
            .then(function(user) {
                $state.go('login');
            });
    }
}
