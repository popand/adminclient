(function() {
    'use strict';

    var validators = {
        moment: function(format) {
            return {
                expression: function($viewValue, $modelValue) {
                    return moment($viewValue, format, true).isValid();
                },
                message: '"The date must be in ' + format + ' format"'
            };
        }
    };

    angular.module('SmartAdmin')
        .value('customFormlyValidators', validators);
}());
