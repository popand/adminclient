'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

angular.module('app', [
    //'ngSanitize',
    'ngAnimate',
    'ngMessages',
    'restangular',
    'ui.router',
    'ui.bootstrap',

    // Smartadmin Angular Common Module
    'SmartAdmin',

    // App
    'app.auth',
    'app.dashboard',
    'app.layout',
    'app.calendar',
    'app.graphs',
    'app.chat',
    'app.misc',

    // Libertas Common
    'libertas',

    // Libertas App
    'app.products',
    'app.promotions',
    'app.offers',
    'app.entitlements',
    'app.genres'
])
.config(function ($provide, $httpProvider) {


    // Intercept http calls.
    $provide.factory('ErrorHttpInterceptor', function ($q) {
        var errorCounter = 0;
        function notifyError(rejection){
            console.log(rejection);
            var data = rejection.data;

            // Ignore invalid access token errors
            if (rejection.status === 401 && data.error === 'invalid_token') {
                return;
            }

            $.bigBox({
                title: rejection.status + ' ' + rejection.statusText,
                content: rejection.data? (rejection.data.message || rejection.data) : 'Unknown error happened',
                color: "#C46A69",
                icon: "fa fa-warning shake animated",
                number: ++errorCounter,
                timeout: 6000
            });
        }

        return {
            // On request failure
            requestError: function (rejection) {
                // show notification
                notifyError(rejection);

                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response failure
            responseError: function (rejection) {
                // show notification
                notifyError(rejection);
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    });

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('ErrorHttpInterceptor');

})
.constant('APP_CONFIG', window.appConfig)

.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // editableOptions.theme = 'bs3';

    $rootScope.$on('$stateChangeError', onError);

    function onError(event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();

        switch(error.status) {
        case 500:
            $state.go('app.misc.error500');
            break;
        case 404:
            $state.go('app.misc.error404');
            break;
        default:
            if ($state.is('app.dashboard')) {
                $state.go('app.misc.error500');
            } else {
                $state.go('app.dashboard');
            }
        }
    }
});


