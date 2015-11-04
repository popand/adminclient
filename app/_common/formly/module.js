(function(){
    "use strict";

    angular.module('SmartAdmin.Formly', ['formly', 'formlyBootstrap'], config);

    config.$inject = ['formlyConfigProvider'];

    function config(formlyConfigProvider) {
        apiCheck.globalConfig.disabled = true;
        formlyConfigProvider.disableWarnings = true;
    }
}());
