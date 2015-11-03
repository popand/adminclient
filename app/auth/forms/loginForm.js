"use strict";


angular.module('app.auth').directive('loginForm', function(formsCommon, lazyScript) {
    return {
        require: 'form',
        restrict: 'A',
        link: function (scope, element, attributes, form) {
            lazyScript.register('jquery-validation').then(function() {
                element.validate(angular.extend({

                    // Rules for form validation
                    rules: {
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 3,
                            maxlength: 20
                        }
                    },

                    // Messages for form validation
                    messages: {
                        email: {
                            required: 'Please enter your email address',
                            email: 'Please enter a VALID email address'
                        },
                        password: {
                            required: 'Please enter your password'
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
