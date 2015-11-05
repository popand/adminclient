"use strict";


angular.module('app.promotions')
    .controller('PromotionDetailsCtrl', PromotionDetailsCtrl);


PromotionDetailsCtrl.$inject = [
    'customFormlyFields',
    'promotion',
    'Promotion'
];

function PromotionDetailsCtrl(fields, promotion, Promotion) {
    var vm = this;

    vm.model = promotion;
    vm.onSave = save;
    vm.onDelete = remove;

    vm.fields = [
        fields.name,
        fields.tenantId,
        fields.tags(promotion.tags)
    ];


    function save() {
        return Promotion.save(vm.model);
    }

    function remove() {
        return Promotion.remove(vm.model.id);
    }
}
