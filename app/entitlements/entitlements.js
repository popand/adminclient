(function() {
    'use strict';

    angular.module('app.entitlements')
        .controller('EntitlementsCtrl', EntitlementsCtrl);

    EntitlementsCtrl.$inject = [
        '$state',
        'User',
        'Entitlement'
    ];

    function EntitlementsCtrl($state, User, Entitlement) {
        var vm = this;

        vm.fetch = fetchData;
        vm.edit = edit;

        function fetchData(config) {
            return Entitlement.list(User.customerId, config)
                .then(function(data) {
                    return {
                        data: data.content,
                        total: data.totalElements
                    };
                }, function(rejection) {
                    if (rejection !== 'invalid_customer_id') {
                        return rejection;
                    }

                    $state.go('login');
                });
        }

        function edit(entitlement) {
            $state.go('app.entitlements.details', {id: entitlement.id});
        }
    }
}());
