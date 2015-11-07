(function() {
    'use strict';

    angular.module('SmartAdmin.Formly')
        .run(addDateType);

    addDateType.$inject = [
        'formlyConfig',
        'customFormlyValidators'
    ];

    function addDateType(formlyConfig, validators) {
        var dateFormat = 'MM/DD/YYYY';

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
                },
                parsers: [dateToTimestamp],
                formatters: [timestampToDate]
            }
        });

        function timestampToDate(value) {
            return value? moment(+value).format(dateFormat) : value;
        }

        function dateToTimestamp(value) {
            return +moment(value, dateFormat);
        }
    }

}());
