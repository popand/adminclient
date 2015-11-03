'use strict';


angular.module('libertas')
    .factory('Genre', GenreFactory);


GenreFactory.$inject = ['libertasApi'];

function GenreFactory(api) {
    Genre.list = list;
    Genre.find = find;
    Genre.save = save;
    Genre.remove = remove;

    // public
    return Genre;

    function Genre() {
        this.id = null;  // (string, optional),
        this.deleteDate = null;  // (string, optional),
        this.tenantId = null;  // (string, optional),
        this.name = null;  // (string, optional)
    }

    function list(params) {
        var config = {
            method: 'GET',
            url: url('/v1/admin/genre/findAll'),
            params: params
        };

        return api.request(config)
            .then(returnResponseObject);
    }

    function save(genre) {
        var r;
        if (genre.id) {
            r = request('PUT', genre.id, {name: genre.name});
        } else {
            r = request('POST', genre.name);
        }
        return r;
    }

    function find(id) {
        return request('GET', id).then(returnResponseObject);
    }

    function remove(id) {
        return request('DELETE', id);
    }

    // private

    function url(path) {
        return api.url('/genreservice' + path);
    }

    function request(method, path, data) {
        return api.request({
            method: method,
            url: url('/v1/admin/genre/' + path),
            data: data
        });
    }

    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

