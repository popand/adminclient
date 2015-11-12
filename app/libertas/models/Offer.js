'use strict';


angular.module('libertas')
    .factory('Offer', OfferFactory);


OfferFactory.$inject = ['libertasApi'];

function OfferFactory(api) {
    Offer.list = list;
    Offer.find = find;
    Offer.save = save;
    Offer.remove = remove;

    // public
    return Offer;

    function Offer() {
        this.id = null; // (string, optional),
        this.tenantId = null; // (string, optional),
        this.deleteDate = null; // (string, optional),
        this.name = null; // (string, optional)

        this.regex = null; // (string, optional),
        this.offerType = null; // (string, optional),
        this.startDateTimestampMillis = null; // (string, optional),
        this.endDateTimestampMillis = null; // (string, optional),
        this.entitlementDurationMillis = null; // (string, optional),
        this.price = null; // (string, optional),
    }

    function list(args) {
        var all = args.pageNumber < 0;

        var config = {
            method: 'GET',
            url: url('/v1/offer/findAll'),
            params: {
                pageSize: args.pageSize,
                pageNumber: all? 0 : args.pageNumber,
            },
            cache: args.cache
        };

        var r = api.request(config);

        return all? api.all(r) : r.then(returnResponseObject);
    }

    function save(offer) {
        var r;
        if (offer.id) {
            r = request('PUT', offer.id, offer);
        } else {
            r = request('POST', offer.name, offer);
        }
        return r.then(returnResponseObject);
    }

    function find(id) {
        return request('GET', id).then(returnResponseObject);
    }

    function remove(id) {
        return request('DELETE', id);
    }

    // private

    function url(path) {
        return api.url('/offerservice' + path);
    }

    function request(method, path, data) {
        return api.request({
            method: method,
            url: url('/v1/admin/offer/' + path),
            data: data
        });
    }

    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

