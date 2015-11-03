"use strict";

angular.module('app.auth', [
    'ui.router',
    'libertas'
//        ,
//        'ezfb',
//        'googleplus'
]).config(function ($stateProvider
//        , ezfbProvider
//        , GooglePlusProvider
    ) {
//        GooglePlusProvider.init({
//            clientId: authKeys.googleClientId
//        });
//
//        ezfbProvider.setInitParams({
//            appId: authKeys.facebookAppId
//        });
    $stateProvider

    .state('login', {
        url: '/login',
        views: {
            root: {
                templateUrl: 'app/auth/views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            }
        },
        data: {
            title: 'Login',
            htmlId: 'extr-page'
        },
        resolve: {
            scripts: function(lazyScript){
                return lazyScript.register([
                    'jquery-validation'
                ]);
            }
        }
    })

    .state('register', {
        url: '/register',
        views: {
            root: {
                templateUrl: 'app/auth/views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm'
            }
        },
        data: {
            title: 'Register',
            htmlId: 'extr-page'
        },
        resolve: {
            scripts: function(lazyScript){
                return lazyScript.register([
                    'jquery-validation'
                ]);
            }
        }
    })

    .state('forgotPassword', {
        url: '/forgot-password',
        views: {
            root: {
                templateUrl: 'app/auth/views/forgot-password.html'
            }
        },
        data: {
            title: 'Forgot Password',
            htmlId: 'extr-page'
        }
    })

    .state('lock', {
        url: '/lock',
        views: {
            root: {
                templateUrl: 'app/auth/views/lock.html'
            }
        },
        data: {
            title: 'Locked Screen',
            htmlId: 'lock-page'
        }
    })


}).constant('authKeys', {
    googleClientId: '',
    facebookAppId: ''
});
