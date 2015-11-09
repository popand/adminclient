(function() {
    'use strict';

    angular.module('SmartAdmin.Formly')
        .directive('tabActive', tabActiveDirective)
        .config(addListSectionType);

    addListSectionType.$inject = [
        'formlyConfigProvider'
    ];

    function addListSectionType(formlyConfigProvider) {
        var sectionId = 1;

        formlyConfigProvider.setType({
            name: 'listSection',
            templateUrl: 'app/_common/formly/types/list-section.tpl.html',
            defaultOptions: {
                templateOptions: {
                    collapsed: true
                }
            },
            controller: function($scope, $timeout) {
                var vm = this;
                var model = $scope.model[$scope.options.key] || [];

                $scope.vm = vm;
                $scope.model[$scope.options.key] = model;
                $scope.formOptions = {formState: $scope.formState};

                vm.$active = 0;
                vm.$collapsed = $scope.to.collapsed;

                vm.addNew = add;
                vm.removeActive = remove;
                vm.setItem = setItem;
                vm.copyFields = copyFields;

                // Adding new items takes too much time (> 1000ms).
                // For now show a loading indicator.
                vm.$processing = false;

                // Used to generate unique field ids
                sectionId += 1;

                function add() {
                    if (vm.$processing) {
                        return;
                    }

                    vm.$processing = true;

                    $timeout(function() {
                        model.push({});

                        vm.$collapsed = false;
                        vm.$active = model.length - 1;
                        vm.$processing = false;
                    });
                }

                function remove() {
                    if (vm.$processing) {
                        return;
                    }

                    $.SmartMessageBox({
                        title: "Confirmation",
                        content: "Are you sure you want to delete this entry?",
                        buttons: '[No][Delete]'
                    }, function (pressed) {
                        if (pressed === "Delete") {
                            model.splice(vm.$active, 1);
                            vm.$active = model.length - 1;
                        }
                    });
                }

                function setItem(index, event) {
                    if (vm.$processing) {
                        return;
                    }

                    vm.$active = index;
                    vm.$collapsed = false;
                }

                function copyFields(fields) {
                    fields = angular.copy(fields);
                    addUniqueIds(fields);
                    return fields;
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

                        field.id = field.id || [field.key, sectionId, index].join('_');
                    });
                }
            }
        });
    }

    function tabActiveDirective() {
        return {
            restrict: 'A',
            scope: {
                tabActive: '=',
            },
            link: function (scope, element) {
                var $element = $(element);

                scope.$watch('tabActive', function(active) {
                    $element.toggleClass('active', active);
                });
            }
        };
    }

}());
