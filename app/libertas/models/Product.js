'use strict';


angular.module('libertas')
    .factory('Product', ProductFactory);


ProductFactory.$inject = ['libertasApi'];

function ProductFactory(api) {
    Product.retrieveAll = retrieveAll;
    Product.retrieveByTags = retrieveAllByTags;
    Product.retrieveByIds = retrieveAllByIds;

    Product.find = find;
    Product.save = save;
    Product.remove = remove;

    return Product;

    // public
    function Product() {
        _.extend(this, {
            id: null, //  (string, optional),
            tags: [], //  (strings, optional),
            tenantIds: [], //  (strings, optional),
            bindId: null, //  (string, optional),
            purchaseOptionList: [], //  (array[PurchaseOption], optional),
            imageList: [], //  (array[Image], optional),
            previewList: [], //  (array[Preview], optional),
            videos: [], //  (array[Video], optional),
            genres: [], //  (array[Genre], optional),
            studio: null, //  (string, optional),
            subtitleList: [], //  (strings, optional),
            comingSoon: null, //  (string, optional),
            seoUrl: null, //  (string, optional),
            network: null, //  (string, optional),
            blackoutIndicator: null, //  (string, optional),
            languages: [], //  (strings, optional),
            requiredAddonIds: null, //  (string, optional),
            criticId: null, //  (string, optional),
            averageUserRating: null, //  (string, optional),
            actors: [], //  (strings, optional),
            blackoutWindowEnd: null, //  (string, optional),
            producers: [], //  (strings, optional),
            blackoutWindowStart: null, //  (string, optional),
            deliveryTypes: [], //  (strings, optional),
            boxOfficeGross: null, //  (string, optional),
            altCode: null, //  (string, optional),
            closedCaption: null, //  (string, optional),
            requiredPackageId: null, //  (string, optional),
            ratingReason: null, //  (string, optional),
            writers: [], //  (strings, optional),
            canWatchNow: null, //  (boolean, optional),
            versionId: null, //  (integer, optional),
            deleted: null, //  (boolean, optional),
            longDescription: null, //  (string, optional),
            country: null, //  (string, optional),
            directors: [], //  (strings, optional),
            rating: null, //  (string, optional),
            shortTitle: null, //  (string, optional),
            title: null, //  (string, optional),
            contentProvider: null, //  (string, optional),
            releaseYear: null, //  (string, optional),
            productType: null, //  (string, optional),
            runningTime: null, //  (string, optional),
            mediaList: null, //  (Media, optional),
            shortDescription: null, //  (string, optional),
            name: null, //  (string, optional)
        });
    }


    function retrieveAllByIds(params) {
        return list(url('/v1/products/retrieveAllProductDetailsByIds'), params);
    }

    function retrieveAllByTags(params) {
        return list(url('/v1/products/retrieveAllProductDetailsByTags'), params);
    }

    function retrieveAll(params) {
        return list(url('/v1/products/retrieveAllProductDetail'), params);
    }

    function save(product) {
        if (product.id) {
            return api.request({
                method: 'PUT',
                url: url('/v1/admin/products/' + product.id),
                data: product
            });
        } else {
            return api.request({
                method: 'POST',
                url: url('/v1/admin/products'),
                data: product
            });
        }
    }

    function find(id) {
        return api.request({
                method: 'GET',
                url: url('/v1/products/' + id + '/productDetails'),
            })
            .then(returnResponseObject);
    }

    function remove(id) {
        return api.request({
            method: 'DELETE',
            url: url('/v1/admin/products/' + id),
        });
    }

    // private

    function list(url, params) {
        var config = {
            method: 'GET',
            url: url,
            params: params
        };

        return api.request(config)
            .then(returnResponseObject);
    }

    function url(path) {
        return api.url('/productservice' + path);
    }

    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

