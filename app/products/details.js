(function() {
    'use strict';

    angular.module('app.products')
        .controller('ProductDetailsCtrl', ProductDetailsCtrl);


    ProductDetailsCtrl.$inject = [
        'product',
        'Product'
    ];

    function ProductDetailsCtrl(product, Product) {
        var vm = this;

        vm.model = product;
        vm.onSave = save;
        vm.onDelete = remove;

        vm.fields = [
            field({key: 'id', label: 'Id'}),
            field({key: 'shortTitle', label: 'Short Title'}),
            field({key: 'title', label: 'Title'})
        ];

        function save() {
            return Product.save(vm.model);
        }

        function remove() {
            return Product.remove(vm.model.id);
        }

        function field(args) {
            return {
                key: args.key,
                type: "input",
                templateOptions: {
                    required: _.isUndefined(args.required)? true : args.required,
                    label: args.label,
                    placeholder: args.placeholder || args.label
                }
            };
        }
    }

}());
