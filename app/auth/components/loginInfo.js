'use strict';

angular.module('app.auth').directive('loginInfo', function() {

    return {
        restrict: 'A',
        templateUrl: 'app/auth/components/loginInfo.html',
        controller: function($state, User) {
            if (!User.isLoggedIn()) {
                $state.go('login');
            }

            this.user = User;
        },
        controllerAs: 'vm'
    };
});
