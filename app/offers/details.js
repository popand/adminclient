"use strict";


angular.module('app.offers')
    .controller('OfferDetailsCtrl', OfferDetailsCtrl);


OfferDetailsCtrl.$inject = [
    'customFormlyFields',
    'offer',
    'Offer'
];

function OfferDetailsCtrl(fields, offer, Offer) {
    var vm = this;

    vm.model = offer;
    vm.onSave = save;
    vm.onDelete = remove;

    function save() {
        return Offer.save(vm.model);
    }

    function remove() {
        return Offer.remove(vm.model.id);
    }

    vm.fields = [
        fields.name,
        fields.tenantId,
        {
            key: "regex",
            type: "input",
            templateOptions: {
                required: true,
                label: "Regex",
                placeholder: "Regex"
            }
        },
        {
            key: "offerType",
            type: "input",
            templateOptions: {
                required: true,
                label: "Offer Type",
                placeholder: "Offer Type"
            }
        },
        fields.group([
            fields.date('startDateTimestampMillis', 'Start Date'),
            fields.date('endDateTimestampMillis', 'End Date'),
        ]),
        {
            key: "entitlementDurationMillis",
            type: "input",
            templateOptions: {
                required: true,
                label: "Entitlement Duration",
                placeholder: "Entitlement Duration"
            }
        },
        {
            key: "price",
            type: "input",
            templateOptions: {
                required: true,
                label: "Price",
                placeholder: "Price"
            }
        }
    ];
}
