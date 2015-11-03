'use strict';

angular.module('libertas')
    .factory('Preview', Preview);


function Preview() {
    return function() {
        this.url = null;  // (string, optional),
        this.id = null;  // (string, optional),
        this.componentId = null;  // (string, optional),
        this.screenFormat = null;  // (string, optional),
        this.aspectRatio = null;  // (string, optional),
        this.mediaFormat = null;  // (string, optional),
        this.targetDevice = null;  // (string, optional)
    };
}
