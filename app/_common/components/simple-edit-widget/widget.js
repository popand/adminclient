(function() {
    "use strict";

    angular.module('SmartAdmin')
        .directive('simpleEditWidget', simpleEditWidget);


    function simpleEditWidget() {
        return {
            restrict: 'E',
            scope: {},
            controller: SimpleEditWidgetController,
            controllerAs: 'vm',
            bindToController: {
                model: '=',
                fields: '=',
                options: '=',
                remove: '&onDelete',
                save: '&onSave'
            },
            templateUrl: 'app/_common/components/simple-edit-widget/widget.tpl.html',
        };
    }

    SimpleEditWidgetController.$inject = ['$state'];

    function SimpleEditWidgetController($state) {
        var vm = this;

        vm.onSave = save;
        vm.onDelete = remove;
        vm.onBack = goBack;

        function save() {
            return vm.save().then(goBack);
        }

        function remove() {
            $.SmartMessageBox({
                title: "Confirmation",
                content: "Are you sure you want to delete this entry?",
                buttons: '[No][Delete]'
            }, function (pressed) {
                if (pressed === "Delete") {
                    vm.remove().then(goBack);
                }
            });
        }

        function goBack() {
            $state.go('^');
        }
    }

}());
