'use strict';

angular.module('app.offers')
    .controller('OffersCtrl', OffersCtrl);

OffersCtrl.$inject = [
    '$state',
    'Offer'
];

function OffersCtrl($state, Offer) {
    var vm = this;

    vm.fetch = fetchData;
    vm.edit = edit;

    function fetchData(config) {
        return Offer.list(config)
            .then(function(data) {
                return {
                    data: data.content,
                    total: data.totalElements
                };
            });
    }

    function edit(offer) {
        $state.go('app.offers.details', {id: offer.id});
    }
}
