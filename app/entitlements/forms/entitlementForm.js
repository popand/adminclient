"use strict";


angular.module('app.entitlements')
    .directive('entitlementForm', entitlementForm);


function entitlementForm() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controllerAs: 'vm',
        controller: EntitlementFormController,
        bindToController: {
            entitlement: '='
        },
        templateUrl: 'app/entitlements/forms/entitlement-form.tpl.html',
    };
}

EntitlementFormController.$inject = ['$scope', '$element', '$state', 'Entitlement', 'formsCommon'];

function EntitlementFormController($scope, $form, $state, Entitlement, formsCommon) {
    var vm = this;

    vm.remove = remove;
    vm.submit = submit;

    function submit() {
        if (!$form.valid()) {
            return;
        }

        Entitlement.save(vm.entitlement)
            .then(goToEntitlements);
    }

    function remove() {
        $.SmartMessageBox({
            title: "Confirmation",
            content: "Are you sure you want to delete this row?",
            buttons: '[No][Delete]'
        }, function (pressed) {
            if (pressed === "Delete") {
                Entitlement.remove(vm.entitlement.id)
                    .then(goToEntitlements);
            }
        });
    }

    function goToEntitlements() {
        $state.go('app.entitlements');
    }

    $form.validate(angular.extend({
        debug: true,

        // Rules for form validation
        rules: {
            productId: {
                required: true
            },

            offerId: {
                required: true
            },

            purchaseId: {
                required: true
            }
        },

        // Messages for form validation
        messages: {
            productId: {
                required: 'The Product Id is required'
            },
            offerId: {
                required: 'The Offer Id is required'
            },
            purchaseId: {
                required: 'The Purchase Id is required'
            }
        }
    }, formsCommon.validateBootstrapOptions));
}
