'use strict';


angular.module('libertas')
    .factory('Recommendation', RecommendationFactory);


RecommendationFactory.$inject = ['libertasApi'];

function RecommendationFactory(api) {
    Recommendation.list = list;
    Recommendation.find = find;
    Recommendation.save = save;
    Recommendation.remove = remove;

    // public
    return Recommendation;

    function Recommendation() {
        this.id = null;  // (string, optional),
        this.deleteDate = null;  // (string, optional),
        this.tenantId = null;  // (string, optional),
        this.name = null;  // (string, optional)
    }

    function list(params) {
        var config = {
            method: 'GET',
            url: url('/v1/admin/recommendation/findAll'),
            params: params
        };

        return api.request(config)
            .then(returnResponseObject);
    }

    function save(recommendation) {
        var r;
        if (recommendation.id) {
            r = request('PUT', recommendation.id, {name: recommendation.name});
        } else {
            r = request('POST', recommendation.name);
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
        return api.url('/recommendationservice' + path);
    }

    function request(method, path, data) {
        return api.request({
            method: method,
            url: url('/v1/admin/recommendation/' + path),
            data: data
        });
    }

    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

