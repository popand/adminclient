'use strict';


angular
    .module('libertas')
    .service('libertasAuth', authentication);


authentication.$inject = ['$http', '$q', '$log', 'localStorageService', 'libertasApi'];

function authentication($http, $q, $log, storage, libertas) {
    var api = {};

    api.login = login;
    api.logout = logout;
    api.register = register;
    api.isLoggedIn = isLoggedIn;

    return api;

    function url(path) {
        return libertas.url('/customerservice/v1/customer' + path);
    }

    function login(credentials) {
        var config = {
            method: 'POST',
            url: url('/login'),
            data: credentials
        };

        return libertas.request(config).then(success);

        function success(response) {
            var data = response.data.responseObject;
            storage.set('libertas.user_token', data.userToken);
            return data;
        }
    }

    function logout() {
        if (api.isLoggedIn()) {
            libertas.request({ method: 'POST', url: url('/logout') });
        }

        storage.remove('libertas.user_token');
    }


    function isLoggedIn() {
        return !!storage.get('libertas.user_token');
    }

    function register(data) {
        return libertas
            .request({
                method: 'POST',
                url: url('/register'),
                data: data
            })
            .then(function(response) {
                return response.data.responseObject;
            });
    }
}
