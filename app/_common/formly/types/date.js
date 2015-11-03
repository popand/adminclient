(function() {
    'use strict';

    angular.module('SmartAdmin')
        .run(addDateType);

    addDateType.$inject = [
        'formlyConfig',
        'customFormlyValidators'
    ];

    function addDateType(formlyConfig, validators) {
        formlyConfig.setType({
            name: 'date',
            extends: 'input',
            defaultOptions: {
                templateOptions: {
                    addonRight: {
                        'class': 'fa fa-calendar'
                    }
                },
                ngModelElAttrs: {
                    'smart-datepicker': '',
                    'date-format': 'mm/dd/yy'
                },
                validators: {
                    date: validators.moment('MM/DD/YYYY')
                }
            }
        });
    }

}());
