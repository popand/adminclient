"use strict";


angular.module('app.offers')
    .controller('OfferDetailsCtrl', OfferDetailsCtrl);


OfferDetailsCtrl.$inject = [
    'customFormlyField',
    'offer',
    'Offer'
];

function OfferDetailsCtrl(field, offer, Offer) {
    var vm = this;
    var dateFormat = 'MM/DD/YYYY';

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
        field('name'),
        field('tenantId'),
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
        {
            className: 'row',
            fieldGroup: [
                dateField('startDateTimestampMillis', 'Start Date'),
                dateField('endDateTimestampMillis', 'End Date'),
            ]
        },
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

    function dateField(key, label, className) {
        return {
            type: 'date',
            key: key,
            className: className || 'col-lg-6',
            templateOptions: {
                label: label,
                required: true
            },
            parsers: [dateToTimestamp],
            formatters: [timestampToDate]
        };
    }

    function timestampToDate(value) {
        return value? moment(+value).format(dateFormat) : value;
    }

    function dateToTimestamp(value) {
        return +moment(value, dateFormat);
    }
}
