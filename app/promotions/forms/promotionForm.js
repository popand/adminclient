"use strict";


angular.module('app.promotions')
    .directive('promotionForm', promotionForm);


function promotionForm() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        controllerAs: 'vm',
        controller: PromotionFormController,
        bindToController: {
            promotion: '='
        },
        templateUrl: 'app/promotions/forms/promotion-form.tpl.html',
    };
}

PromotionFormController.$inject = ['$scope', '$element', '$state', 'Promotion', 'formsCommon'];

function PromotionFormController($scope, $form, $state, Promotion, formsCommon) {
    var vm = this;

    vm.remove = remove;
    vm.submit = submit;
    vm.tags = [];

    function submit() {
        if (!$form.valid()) {
            return;
        }

        return Promotion
            .save(vm.promotion)
            .then(goToPromotions);
    }

    function remove() {
        $.SmartMessageBox({
            title: "Confirmation",
            content: "Are you sure you want to delete this row?",
            buttons: '[No][Delete]'
        }, function (pressed) {
            if (pressed === "Delete") {
                Promotion.remove(vm.promotion.id)
                    .then(goToPromotions);
            }
        });
    }

    function goToPromotions() {
        $state.go('app.promotions');
    }

    $form.validate(angular.extend({
        // Rules for form validation
        rules: {
            name: {
                required: true,
                minlength: 3
            }
        },

        // Messages for form validation
        messages: {
            name: {
                required: 'The name is required'
            }
        }
    }, formsCommon.validateBootstrapOptions));
}
