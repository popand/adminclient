"use strict";


angular.module('app.offers')
    .directive('offerForm', offerForm);


function offerForm() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controllerAs: 'vm',
        controller: offerFormController,
        bindToController: {
            offer: '='
        },
        templateUrl: 'app/offers/forms/offer-form.tpl.html',
    };
}

offerFormController.$inject = ['$scope', '$element', '$state', 'Offer', 'formsCommon'];

function offerFormController($scope, $form, $state, Offer, formsCommon) {
    var vm = this;
    var dateFormat = 'MM/DD/YYYY';

    vm.remove = remove;
    vm.submit = submit;


    vm.startDate = timestampToDate(vm.offer.startDateTimestampMillis);
    vm.endDate = timestampToDate(vm.offer.endDateTimestampMillis);

    function submit() {
        if (!$form.valid()) {
            return;
        }

        vm.offer.startDateTimestampMillis = +moment(vm.startDate, dateFormat);
        vm.offer.endDateTimestampMillis = +moment(vm.endDate, dateFormat);

        Offer.save(vm.offer)
            .then(goToOffers);
    }

    function remove() {
        $.SmartMessageBox({
            title: "Confirmation",
            content: "Are you sure you want to delete this row?",
            buttons: '[No][Delete]'
        }, function (pressed) {
            if (pressed === "Delete") {
                Offer.remove(vm.offer.id)
                    .then(goToOffers);
            }
        });
    }

    function goToOffers() {
        $state.go('app.offers');
    }

    function timestampToDate(value) {
        if (value) {
            value = moment(+value).format(dateFormat);
        }
        return value;
    }

    $form.validate(angular.extend({
        // Rules for form validation
        rules: {
            name: {
                required: true,
                minlength: 3
            },

            startDate: {
                required: true,
                moment: dateFormat
            },
            endDate: {
                required: true,
                moment: dateFormat
            },
            entitlementDurationMillis: {
                required: true,
                digits: true
            },

            regex: {
                required: true
            },
            price: {
                required: true
            },
            offerType: {
                required: true
            },
        },

        // Messages for form validation
        messages: {
            name: {
                required: 'The name is required'
            }
        }
    }, formsCommon.validateBootstrapOptions));
}
