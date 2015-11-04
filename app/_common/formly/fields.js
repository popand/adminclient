(function() {
    'use strict';

    var fields = {
        name: {
            key: "name",
            type: "input",
            templateOptions: {
                required: true,
                label: "Name",
                placeholder: "Name"
            }
        },
        tenantId: {
            key: "tenantId",
            type: "input",
            templateOptions: {
                label: "Tenant Id",
                placeholder: "Tenant Id"
            }
        },
        tags: {
            key: "tags",
            type: "input",
            templateOptions: {
                label: "Tags",
            },
            className: "tagsinput",
            ngModelElAttrs: {
                'smart-tagsinput': '',
                'data-role': 'tagsinput',
                'ng-list': ''
            },
            ngModelAttrs: {
                value: {
                    attribute: 'value'
                }
            },
            expressionProperties: {
                'templateOptions.value': 'model.tags.join(",")'
            }
        },
    };

    var field = function(name, field) {
        return _.defaultsDeep(field || {}, _.result(fields, name));
    };

    angular.module('SmartAdmin.Formly')
        .value('customFormlyField', field)
        .value('customFormlyFields', fields);
}());