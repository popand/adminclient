'use strict';

angular.module('app.auth').factory('User', User);

User.$inject = [
    'localStorageService',
    'libertasAuth'
];

function User(store, auth) {
    var anonymous = {
        customerId: null,
        username: null,
        picture: 'styles/img/avatars/sunny.png',
    };

    var user = _.defaults(store.get('auth.user') || {}, anonymous);

    user.isLoggedIn = isLoggedIn;
    user.logout = logout;
    user.save = save;

    return user;

    function isLoggedIn() {
        return user.username && auth.isLoggedIn();
    }

    function logout() {
        auth.logout();

        _.extend(user, anonymous);
        store.remove('auth.user');
    }

    function save() {
        store.set('auth.user', {
            username: user.username,
            customerId: user.customerId
        });
    }
}
