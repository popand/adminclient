'use strict';


angular.module('libertas')
    .factory('Recommendation', RecommendationFactory);


RecommendationFactory.$inject = ['libertasApi'];

function RecommendationFactory(api) {
    Recommendation.list = list;
    Recommendation.findForProductId = findForProductId;
    Recommendation.save = save;
    Recommendation.remove = remove;

    // public
    return Recommendation;

    function Recommendation() {
        this.id = null;  // (string, optional),
        this.tenantId = null; // (string, optional),
        this.deleteDate = null; // (string, optional),
        this.productId = null;  // (string, optional),
        this.recommendationProductIds = [];  // (string, optional)
    }

    function list(params) {
        var config = {
            method: 'GET',
            url: url('/recommendation/findAll'),
            params: params
        };

        return api.request(config)
            .then(returnResponseObject);
    }

    function save(obj) {
        var r;
        var productIds = obj.recommendationProductIds;

        if (obj.id) {
            // Update
            r = api.request({
                method: 'PUT',
                url: url('/admin/recommendation/' + obj.id),
                data: {
                    recommendationList: productIds
                }
            });
        } else {
            // Create
            r = api.request({
                method: 'POST',
                url: url('/admin/recommendation/product/' + obj.productId),
                data: {
                    recommendationProductList: {
                        productIds: productIds
                    }
                }
            });
        }
        return r;
    }

    function findForProductId(productId) {
        /*
            TODO: requires pageNumber, but it doesn't look a paged content.
            Response is:
                response.data.responseObject.recommendation = {
                    productId: string
                    recommendationProductIds: []
                }

            It suggests that there is only one recommendation per product.
        */
        var request = api.request({
            method: 'GET',
            url: url('/recommendation/product/' + productId),
            params: {
                pageNumber: 0,
                pageSize: 100
            }
        });

        return request.then(function(response) {
            console.log('findProduct', response);
            return response.data.responseObject.recommendation;
        });
    }

    function remove(productId) {
        // TODO: doesn't sound right, it deletes all recommendations of a product?
        return api.request({
            method: 'DELETE',
            url: url('/admin/recommendation/product/' + productId)
        });
    }

    // private

    function url(path) {
        return api.url('/recommendationservice/v1' + path);
    }


    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

