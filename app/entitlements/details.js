(function() {
    'use strict';

    angular.module('app.entitlements')
        .controller('EntitlementDetailsCtrl', EntitlementDetailsCtrl);


    EntitlementDetailsCtrl.$inject = [
        'entitlement',
        'Entitlement'
    ];

    function EntitlementDetailsCtrl(entitlement, Entitlement) {
        var vm = this;

        vm.model = entitlement;
        vm.onSave = save;
        vm.onDelete = remove;

        vm.fields = [
            field({key: 'productId', label: 'Product Id'}),
            field({key: 'offerId', label: 'Offer Id'}),
            field({key: 'purchaseId', label: 'Purchase Id'})
        ];

        function save() {
            return Entitlement.save(vm.model);
        }

        function remove() {
            return Entitlement.remove(vm.model.id);
        }

        function field(args) {
            return {
                key: args.key,
                type: "input",
                templateOptions: {
                    required: true,
                    label: args.label,
                    placeholder: args.placeholder || args.label
                }
            };
        }
    }

}());
