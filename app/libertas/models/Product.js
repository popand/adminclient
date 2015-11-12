'use strict';


angular.module('libertas')
    .factory('Product', ProductFactory);


ProductFactory.$inject = ['$q', 'libertasApi', 'Offer'];

function ProductFactory($q, api, Offer) {
    Product.retrieveAll = retrieveAll;
    Product.retrieveByTags = retrieveAllByTags;
    Product.retrieveByIds = retrieveAllByIds;

    Product.find = find;
    Product.save = save;
    Product.remove = remove;
    Product.purchaseOption = {
        add: addPurchaseOption,
        remove: removePurchaseOption
    };

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
        product = _.cloneDeep(product);
        console.log(angular.toJson(product, true));

        var components = getAddedComponents(product);
        var genres = _.remove(product.genres);

        // Save all modified offers, later add them to the product.
        if (product.id) {
            product = update(product);
        } else {
            product = create(product);
        }

        return product
            .then(returnResponseObject)
            .then(addComponents(components))
            .then(updateGenres(genres));
    }

    function update(product) {
        return api.request({
                method: 'PUT',
                url: url('/v1/admin/products/' + product.productId),
                data: product
            });
    }

    function create(product) {
        return api.request({
                method: 'POST',
                url: url('/v1/admin/products'),
                data: product
            });
    }

    function find(id) {
        return api.request({
                method: 'GET',
                url: url('/v1/admin/products/' + id + '/fullProductDetails'),
            })
            .then(returnResponseObject);
    }

    function remove(id) {
        return api.request({
            method: 'DELETE',
            url: url('/v1/admin/products/' + id),
        });
    }

    function addPurchaseOption(product, offerWithMediaList) {
        return api.request({
                method: 'POST',
                url: url('/v1/admin/products/' + product.productId + '/offer'),
                data: offerWithMediaList
            })
            .then(returnResponseObject);
    }

    function removePurchaseOption(product, option) {
        if (!product.productId || !option.purchaseOptionId) {
            return;
        }

        var config = {
            method: 'DELETE',
            url: url('/v1/admin/products/' + product.productId + '/offer/' + option.purchaseOptionId)
        };

        return api.request(config).then(returnResponseObject);
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
        console.log('returnResponseObject', response);
        return response.data.responseObject;
    }

    function getAddedComponents(product){
        var ret = {
            image: 'imageList',
            video: 'videos',
            preview: 'previewList',
        };

        var keys = {
            image: 'imageId',
            video: 'mediaId',
            preview: 'mediaId',
        };

        _.each(ret, function(value, key) {
            ret[key] = _.remove(product[value], function(item) {
                return !item[keys[key]];
            });
        });

        return ret;
    }

    function addComponents(components) {
        return function(product) {
            product = $q.when(product);

            _.each(components, function(list, key) {
                _.each(list, function(value) {
                    product = product
                        .then(addComponent(key, value))
                        .then(returnResponseObject);
                });
            });

            return product;
        };
    }

    function addComponent(key, data) {
        return function(product) {
            return api.request({
                    method: 'POST',
                    url: url('/v1/admin/products/' + product.productId + '/' + key),
                    data: data
                });
        };
    }

    function updateGenres(genres) {
        return function(data) {
            var product = $q.when(data);

            if (_.isEmpty(genres)) {
                return product;
            }

            return product
                .then(addComponent('genre', genres))
                .then(setGenres);

            function setGenres() {
                data.genres = genres;
                return data;
            }
        };
    }
}

