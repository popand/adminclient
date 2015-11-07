(function() {
    'use strict';

    angular.module('SmartAdmin.Formly')
        .config(addListSectionType);

    addListSectionType.$inject = [
        'formlyConfigProvider'
    ];

    function addListSectionType(formlyConfigProvider) {
        var unique = 1;

        formlyConfigProvider.setType({
            name: 'listSection',
            templateUrl: 'app/_common/formly/types/list-section.tpl.html',
            defaultOptions: {
                templateOptions: {
                    collapsed: true
                }
            },
            controller: function($scope) {
                var vm = this;
                var model = $scope.model[$scope.options.key] || [];

                $scope.vm = vm;
                $scope.model[$scope.options.key] = model;
                $scope.formOptions = {formState: $scope.formState};

                vm.$active = model.length > -1? 0 : -1;
                vm.$collapsed = $scope.to.collapsed;

                vm.addNew = add;
                vm.removeActive = remove;
                vm.setItem = setItem;
                vm.copyFields = copyFields;


                function copyFields(fields) {
                    fields = angular.copy(fields);
                    addUniqueIds(fields);
                    return fields;
                }

                function add() {
                    model.push({});
                    vm.$active = model.length - 1;
                    vm.$collapsed = false;
                }

                function remove() {
                    model.splice(vm.$active, 1);
                    vm.$active = model.length - 1;
                }

                function setItem(index) {
                    vm.$active = index;
                    vm.$collapsed = false;
                }

                function addUniqueIds(fields) {
                    angular.forEach(fields, function(field, index) {
                        if (field.fieldGroup) {
                            addUniqueIds(field.fieldGroup);
                            return; // fieldGroups don't need an ID
                        }

                        if (field.templateOptions && field.templateOptions.fields) {
                            addUniqueIds(field.templateOptions.fields);
                        }

                        field.id = field.id || (field.key + '_' + index + '_' + unique++);
                    });
                }
            }
        });
    }
}());
