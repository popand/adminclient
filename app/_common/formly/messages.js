(function() {
    'use strict';

    angular.module('SmartAdmin.Formly')
        .run(run);

    run.$inject = [
        'formlyConfig',
        'formlyValidationMessages'
    ];

    function run(formlyConfig, formlyValidationMessages) {
        // Show validation errors on form submit, without manually blurring them.
        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

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
