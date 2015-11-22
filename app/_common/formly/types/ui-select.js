(function() {
    'use strict';

    angular.module('SmartAdmin.Formly')
        .run(addUiSelectType);

    addUiSelectType.$inject = [
        'formlyConfig'
    ];

    function addUiSelectType(formlyConfig) {
        formlyConfig.extras.removeChromeAutoComplete = true;

        formlyConfig.setType({
            name: 'ui-select',
            extends: 'select',
            templateUrl: 'app/_common/formly/types/ui-select.tpl.html'
        });
    }
}());
