'use strict';

angular.module('SmartAdmin.Forms').directive('smartTagsinput', function () {
    return {
        restrict: 'A',
        scope: {
            smartTagsinput: '=',
        },
        link: function(scope, element, attrs) {
            element.tagsinput();
            _.each(scope.smartTagsinput, function(tag) {
                element.tagsinput('add', tag);
            });
        }
    };
});
