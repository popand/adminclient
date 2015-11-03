'use strict';

angular.module('app.promotions')
    .controller('PromotionsCtrl', PromotionsCtrl);

PromotionsCtrl.$inject = [
    '$state',
    'Promotion'
];

function PromotionsCtrl($state, Promotion) {
    var vm = this;

    vm.fetch = fetchData;
    vm.edit = edit;

    function fetchData(config) {
        return Promotion.list(config)
            .then(function(data) {
                return {
                    data: data.content,
                    total: data.totalElements
                };
            });
    }

    function edit(promotion) {
        $state.go('app.promotions.detail', {id: promotion.id});
    }
}
