'use strict';

angular
    .module('app.auth')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = [
    '$scope',
    '$state',
    'localStorageService',
    'libertasAuth',
    'User'
];

function LoginCtrl($scope, $state, store, auth, User) {
    var vm = this;

    vm.login = login;
    vm.email = store.get('auth.email');
    vm.password = '';
    vm.staySignedIn = true;

    User.logout();

    function login(form) {
        if (!form.valid()) {
            return;
        }

        auth.login({email: vm.email, password: vm.password})
            .then(function(user) {
                store.set('auth.email', vm.email);

                User.username = user.userName;
                User.customerId = user.customerId;

                if (vm.staySignedIn) {
                    User.save();
                }

                $state.go('app.dashboard');
            });
    }
}
