(function() {
    'use strict';

    angular.module('SmartAdmin.Formly')
        .config(addMiscTypes);

    addMiscTypes.$inject = [
        'formlyConfigProvider'
    ];

    function addMiscTypes(formlyConfigProvider) {
        formlyConfigProvider.setWrapper({
            name: 'fieldset',
            template: [
                '<fieldset>',
                    '<formly-transclude></formly-transclude>',
                '</fieldset>'
            ].join(' ')
        });

        formlyConfigProvider.setType({
            name: 'list',
            extends: 'textarea',
            template: [
              '<textarea ng-list="&#10;" ng-trim="false" class="form-control" ng-model="model[options.key]">',
              '</textarea>'
            ].join(' ')
        });

        formlyConfigProvider.setType({
            name: 'select2',
            extends: 'select',
            defaultOptions: {
                ngModelElAttrs: {
                    'smart-select2-setter': 'to.select = setter'
                }
            },
            template: [
              '<select data-smart-select2 style="width:100%" ng-model="model[options.key]">',
              '</select>'
            ].join(' ')
        });
    }
}());
