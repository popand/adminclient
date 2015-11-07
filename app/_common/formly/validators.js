(function() {
    'use strict';

    /* jshint maxlen:false */
    var re = {
        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i
    };

    var validators = {
        moment: function(format, message) {
            return {
                expression: function($viewValue, $modelValue) {
                    return $viewValue? moment($viewValue, format, true).isValid() : true;
                },
                message: message || '"Please enter a valid date"'
            };
        },

        integer: {
            expression: function($viewValue, $modelValue) {
                return $viewValue? /^\d+$/.test($viewValue) : true;
            },
            message: '"Please enter a valid a number"'
        },

        url: {
            expression: function($viewValue, $modelValue) {
                return $viewValue? re.url.test($viewValue) : true;
            },
            message: '"Please enter a valid a url"'
        },
    };

    angular.module('SmartAdmin.Formly')
        .value('customFormlyValidators', validators);
}());
