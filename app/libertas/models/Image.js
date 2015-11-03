'use strict';

angular.module('libertas')
    .factory('Image', Image);


function Image() {
    return function() {
        this.id = null;  // (string, optional),
        this.imageURL = null;  // (string, optional),
        this.imageType = null;  // (string, optional),
        this.imageHeight = null;  // (string, optional),
        this.imageWidth = null;  // (string, optional)
    };
}
