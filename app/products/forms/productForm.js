"use strict";


angular.module('app.products').directive('productForm', function(formsCommon, lazyScript){

    return {
        restrict: 'E',
        replace: true,
        require: 'form',
        templateUrl: 'app/products/forms/product-form.tpl.html',
        link: function (scope, element, attributes, form) {
            lazyScript.register('jquery-validation').then(function() {
                element.validate(angular.extend({
                    // Rules for form validation
                    rules: {
                        price: {
                            required: true,
                            number: true
                        },
                        amount: {
                            required: true,
                            number: true
                        },
                        color: {
                            required: true,
                        },
                        size: {
                            required: true
                        }
                    },

                    // Messages for form validation
                    messages: {
                        price: {
                            required: 'The price is required',
                            number: 'The price must be a number'
                        },
                        amount: {
                            required: 'The amount is required',
                            number: 'The amount must be a number'
                        },
                        color: {
                            required: 'The color is required',
                        },
                        size: {
                            required: 'The size is required'
                        }
                    }
                }, formsCommon.validateOptions));

                form.valid = function() {
                    return element.valid();
                };
            });
        }
    };
});
