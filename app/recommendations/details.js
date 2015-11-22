(function() {
    'use strict';

    angular.module('app.recommendations')
        .controller('RecommendationDetailsCtrl', RecommendationDetailsCtrl);

    RecommendationDetailsCtrl.$inject = [
        'Recommendation',
        'model',
        'customFormlyFields'
    ];

    function RecommendationDetailsCtrl(Recommendation, model, fields) {
        var vm = this;

        vm.model = model;
        vm.onSave = submit;
        vm.onDelete = remove;

        vm.fields = [
            text('id'),
            text('productId', true),
            fields.tenantId,
            {
                type: 'list',
                key: 'recommendationProductIds',
                templateOptions: {
                    required: true,
                    label: 'Recommendations'
                }
            },
        ];

        function submit() {
            return Recommendation.save(vm.model);
        }

        function remove() {
            return Recommendation.remove(vm.model.productId);
        }

        function getFields() {
            return [
                fields.group([
                    text('id'),
                    fields.tenantId,
                ]),
                'recommendationProductIds',
            ];
        }

        function text(key, required) {
            return {
                key: key,
                type: 'input',
                templateOptions: {
                    required: required || false,
                    label: _.startCase(key),
                    placeholder: _.startCase(key)
                }
            };
        }
    }
}());
