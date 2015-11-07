'use strict';

angular.module('libertas')
    .factory('Image', Image);


function Image() {
    return function(args) {
        _.extend(this, _.pick(args, [
            'id', // (string, optional),
            'imageURL', // (string, optional),
            'imageType', // (string, optional),
            'imageHeight', // (string, optional),
            'imageWidth', // (string, optional)'
        ]));
    };
}
