(function() {
    'use strict';

    angular.module('app.recommendations')
        .controller('RecommendationDetailsCtrl', RecommendationDetailsCtrl);

    RecommendationDetailsCtrl.$inject = [
        '$q',
        'Product',
        'Recommendation',
        'model',
        'customFormlyFields'
    ];

    function RecommendationDetailsCtrl($q, Product, Recommendation, model, fields) {
        var vm = this;

        vm.model = model;
        vm.onSave = submit;
        vm.onDelete = remove;

        vm.fields = [
            fields.tenantId,
            model.productId? fields.readonly('productId') : select('productId'),
            select('recommendationProductIds', 'Recommendations', 'Search products', true)
        ];

        function submit() {
            return Recommendation.save(vm.model);
        }

        function remove() {
            return Recommendation.remove(vm.model.productId);
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

        function select(key, label, placeholder, multiple) {
            var options = vm.model[key];
            if (!_.isArray(options)) {
                options = [options];
            }

            return {
                key: key,
                type: 'ui-select',
                ngModelElAttrs: multiple? {'multiple': ''} : {},
                templateOptions: {
                    required: true,
                    options: _.map(options, asProductObject),
                    label: label || fields.labelFromKey(key),
                    placeholder: placeholder,
                    optionsAttr: 'bs-options',
                    ngOptions: 'option.productId as option in to.options',
                    selectTemplate: productSelectTemplate,
                    choiceTemplate: productChoiceTemplate,
                    refresh: getProductOptions,
                    refreshDelay: 250
                }
            };
        }

        function getProductOptions(search, field) {
            var promise;

            if (!search) {
                promise = $q.when([]);

            } else {
                var params = {
                    tags: [search],
                    pageSize: 100,
                    pageNumber: -1,
                    cache: true
                };

                promise = Product.retrieveByTags(params);
            }

            return promise.then(function(content) {
                var value = field.value();
                var skip = _.invert(_.isArray(value)? value : [value]);

                field.templateOptions.options = _.filter(content, dups);

                function dups(x) {
                    return !skip[x.productId];
                }
            });
        }

        var templates = _.mapValues({
            inline: '${text} <small class="text-muted">${help}</small>',
            twoline: '<div>${text}</div><small class="text-muted">${help}</small>'
        }, _.template);

        function productChoiceTemplate(product, search) {
            return templates.twoline({
                text: product.title || product.shortTitle || '[No title]',
                help: product.productId
            });
        }

        function productSelectTemplate(product, item) {
            var value = item || product;

            if (!value) {
                return '';
            }

            var help = item? '' : (value.title || value.shortTitle);
            var text = value.productId;

            return help? templates.inline({text: text, help: help}) : text;
        }

        function asProductObject(productId) {
            return {productId: productId};
        }
    }
}());
