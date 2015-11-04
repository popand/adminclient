(function() {
    'use strict';

    var validators = {
        moment: function(format) {
            return {
                expression: function($viewValue, $modelValue) {
                    return moment($viewValue, format, true).isValid();
                },
                message: '"Enter a valid date"'
            };
        }
    };

    angular.module('SmartAdmin.Formly')
        .value('customFormlyValidators', validators);
}());
