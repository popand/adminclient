'use strict'

angular.module('SmartAdmin.Forms').directive('smartSelect2', function (lazyScript) {
    return {
        restrict: 'A',
        scope: {
            sendSetter: '&smartSelect2Setter'
        },
        link: function (scope, element) {
            element.hide().removeAttr('smart-select2 data-smart-select2');
            lazyScript.register('select2').then(function(){
                element.show().select2();

                scope.sendSetter({setter: function(val) {
                    element.val(val).trigger('change');
                }});
            })
        }
    }
});
