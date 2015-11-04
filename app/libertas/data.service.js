'use strict';


angular
    .module('libertas')
    .service('libertasApi', apiService);


apiService.$inject = ['$http', '$q', '$log', 'localStorageService'];

function apiService($http, $q, $log, storage) {
    var api = {};

    api.request = request;
    api.url = url;

    return api;

    function url(path) {
        return 'http://54.165.55.11:8765' + path;
    }

    /**
     * @param  {ng.IRequestConfig} config [description]
     * @return {ng.IPromise<any>} [description]
     */
    function request(config) {
        console.log('request', config);
        return ensureAccessToken()
            .then(doRequest)
            .catch(invalidAccessToken);

        function doRequest(token) {
            if (!token) {
                return $q.reject('no token');
            }

            return $http(withAuthHeaders(config));
        }

        function invalidAccessToken(response) {
            var data = response.data;
            if (response.status === 401 && data.error === 'invalid_token') {
                return ensureAccessToken(true).then(doRequest);
            }

            return $q.reject(response);
        }
    }

    function withAuthHeaders(config) {
        var headers = config.headers || {};

        var accessToken = storage.get('libertas.access_token');
        if (accessToken) {
            headers.Authorization = 'Bearer ' + accessToken;
        } else {
            headers.Authorization = undefined;
        }

        var userToken = storage.get('libertas.user_token');
        if (userToken) {
            headers.UserAuthorization = userToken;
        } else {
            headers.UserAuthorization = undefined;
        }

        config.headers = headers;
        return config;
    }


    function fetchAccessToken() {
        var config = {
            method: 'POST',
            url: url('/securityservice/oauth/token'),
            params: { 'grant_type': 'client_credentials' },
            headers: { 'Authorization': 'Basic dmlwYWFzLXVzZXI6c2VjcmV0' }
        };

        return $http(config).then(putTokenInStorage);

        function putTokenInStorage(response) {
            var token = response.data['access_token'];
            storage.set('libertas.access_token', token);
            return token;
        }
    }


    /**
     * Ensure that we have an access token.
     * @param {boolean} force   force fetching of access token
     */
    function ensureAccessToken(force) {
        var token = storage.get('libertas.access_token');

        if (!!force || !token) {
            token = fetchAccessToken();
            storage.set('libertas.access_token', token);
        } else {
            token = $q.when(token);
        }

        return token;
    }
}
