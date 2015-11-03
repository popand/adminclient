(function() {
    'use strict';

    angular.module('SmartAdmin')
        .value('customFormlyFields', {
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
            tags: function(tags) {
                return {
                    key: "tags",
                    type: "input",
                    templateOptions: {
                        label: "Tags",
                    },
                    className: "tagsinput",
                    ngModelElAttrs: {
                        'smart-tagsinput': '',
                        'value': tags.join(','),
                        'data-role': 'tagsinput',
                        'ng-list': ''
                    }
                };
            }
        });
}());
