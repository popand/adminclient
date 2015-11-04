(function() {
    'use strict';

    angular.module('app.entitlements')
        .controller('EntitlementsCtrl', EntitlementsCtrl);

    EntitlementsCtrl.$inject = [
        '$state',
        'Entitlement'
    ];

    function EntitlementsCtrl($state, Entitlement) {
        var vm = this;

        vm.fetch = fetchData;
        vm.edit = edit;

        function fetchData(config) {
            return Entitlement.list(config)
                .then(function(data) {
                    return {
                        data: data.content,
                        total: data.totalElements
                    };
                });
        }

        function edit(entitlement) {
            $state.go('app.entitlements.details', {id: entitlement.id});
        }
    }
}());
