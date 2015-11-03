angular.module('SmartAdmin.Forms')
    .run(function(lazyScript) {
        lazyScript.register(['jquery-validation']).then(function() {

            $.validator.addMethod('moment', function(value, element, format) {
                return this.optional(element) || moment(value, format, true).isValid();
            }, 'Please enter a valid date');

        });
    });
