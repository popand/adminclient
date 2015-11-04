(function() {
    'use strict';

    angular.module('SmartAdmin.Formly')
        .run(run);

    run.$inject = [
        'formlyConfig',
        'formlyValidationMessages'
    ];

    function run(formlyConfig, formlyValidationMessages) {
        formlyConfig.setWrapper({
            name: 'validation',
            types: ['input', 'date'],
            templateUrl: 'app/_common/formly/messages.tpl.html'
        });

        var messages = {
            required: 'This field is required'
        };

        _.each(messages, function (value, key) {
            formlyValidationMessages.addStringMessage(key, value);
        });
    }
}());
