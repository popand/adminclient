'use strict';

angular.module('SmartAdmin.Layout').directive('stateBreadcrumbs', function ($rootScope, $state, $compile) {


    return {
        restrict: 'EA',
        replace: true,
        template: '<ol class="breadcrumb"><li>Home</li></ol>',
        link: function (scope, element) {

            function setBreadcrumbs(breadcrumbs) {
                var html = '<li>Home</li>';
                angular.forEach(breadcrumbs, function (crumb) {
                    html += '<li>' + crumb + '</li>';
                });
                element.html(html);
            }

            function fetchBreadcrumbs(stateName, breadcrumbs) {

                var state = $state.get(stateName);

                if (state && state.data) {
                    var title = state.data.htmlTitle || state.data.title;

                    if (title && breadcrumbs.indexOf(title) === -1) {
                        breadcrumbs.unshift(title);
                    }
                }

                var parentName = stateName.replace(/.?\w+$/, '');
                if (parentName) {
                    return fetchBreadcrumbs(parentName, breadcrumbs);
                } else {
                    return breadcrumbs;
                }
            }

            function processState(state) {
                var breadcrumbs;
                if (state.data && state.data.breadcrumbs) {
                    breadcrumbs = state.data.breadcrumbs;
                } else {
                    breadcrumbs = fetchBreadcrumbs(state.name, []);
                }
                setBreadcrumbs(breadcrumbs);
            }

            processState($state.current);

            scope.state = $state;
            $compile(element)(scope);

            $rootScope.$on('$stateChangeStart', function (event, state) {
                processState(state);
                $compile(element)(scope);
            });
        }
    };
});
