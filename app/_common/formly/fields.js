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

        tags: function(model, key) {
            key = key || 'tags';

            return {
                key: key,
                type: 'input',
                templateOptions: {
                    label: _.startCase(key),
                },
                className: 'tagsinput',
                ngModelElAttrs: {
                    'smart-tagsinput': '',
                    'data-role': 'tagsinput',
                    'ng-list': '',
                    'value': (model[key] || []).join(',')
                }
            };
        },

        date: function(key, label, required, className) {
            return {
                type: 'date',
                key: key,
                className: className,
                templateOptions: {
                    label: label,
                    required: required || false
                }
            };
        },

        group: function(fields, className)  {
            var columns = 12 % fields.length || _.any(fields, 'className');
            if (!columns) {
                var columnSize = _.max([3, 12 / fields.length]);
                _.each(fields, function(field) {
                    field.className = 'col-xs-12 col-sm-' + columnSize;
                });
            }

            return {
                wrapper: 'fieldset',
                className: _.isUndefined(className)? 'row' : className,
                fieldGroup: fields
            };
        },

        labelFromKey: _.startCase
    };

    var field = function(name, field) {
        return _.defaultsDeep(field || {}, _.result(fields, name));
    };

    angular.module('SmartAdmin.Formly')
        .value('customFormlyField', field)
        .value('customFormlyFields', fields);
}());
