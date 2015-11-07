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
                '<fieldset">',
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
    }
}());
