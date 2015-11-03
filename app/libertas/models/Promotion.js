'use strict';


angular.module('libertas')
    .factory('Promotion', PromotionFactory);


PromotionFactory.$inject = [
    'libertasApi'
];

function PromotionFactory(api) {
    Promotion.list = list;
    Promotion.find = find;
    Promotion.save = save;
    Promotion.remove = remove;

    return Promotion;

    // public
    function Promotion() {
        this.id = null; // (string, optional),
        this.tags = []; // (array[string], optional),
        this.tenantId = null; // (string, optional),
        this.deleteDate = null; // (string, optional),
        this.name = null; // (string, optional)
    }

    function list(params) {
        var config = {
            method: 'GET',
            url: url('/v1/promotion/findAll'),
            params: params
        };

        return api.request(config)
            .then(returnResponseObject);
    }

    function save(promotion) {
        if (promotion.id) {
            return api.request({
                method: 'PUT',
                url: url('/v1/admin/promotion/' + promotion.id),
                data: promotion
            });
        } else {
            return api.request({
                method: 'POST',
                url: url('/v1/admin/promotion'),
                data: promotion
            });
        }
    }

    function find(id) {
        return api
            .request({
                method: 'GET',
                url: url('/v1/promotion/' + id)
            })
            .then(returnResponseObject);
    }

    function remove(id) {
        return api.request({
            method: 'DELETE',
            url: url('/v1/admin/promotion/' + id),
        });
    }

    function url(path) {
        return api.url('/promotionservice' + path);
    }

    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

