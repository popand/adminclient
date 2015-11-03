"use strict";


angular.module('app.auth').directive('registrationForm', function(formsCommon, lazyScript) {
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
                        },
                        passwordConfirm: {
                            required: true,
                            minlength: 3,
                            maxlength: 20,
                            equalTo: '#password'
                        },
                        firstname: {
                            required: true
                        },
                        lastname: {
                            required: true
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
                        },
                        passwordConfirm: {
                            required: 'Please enter your password one more time',
                            equalTo: 'Please enter the same password as above'
                        },
                        firstname: {
                            required: 'Please select your first name'
                        },
                        lastname: {
                            required: 'Please select your last name'
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
