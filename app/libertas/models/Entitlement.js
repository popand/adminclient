(function() {
    'use strict';

    angular.module('libertas')
        .factory('Entitlement', EntitlementFactory);

    EntitlementFactory.$inject = [
        '$q',
        'libertasApi'
    ];

    function EntitlementFactory($q, api) {
        Entitlement.list = list;
        Entitlement.find = find;
        Entitlement.save = save;
        Entitlement.remove = remove;

        // public
        return Entitlement;

        function Entitlement() {
            this.id = null;  // (string, optional),
            this.productId = null;  // (string, optional),
            this.offerId = null;  // (string, optional),
            this.purchaseId = null;  // (string, optional)
        }

        function list(customerId, params) {
            if (!customerId) {
                return $q.reject('invalid_customer_id');
            }

            var config = {
                method: 'GET',
                url: url('/v1/admin/entitlement/findAll/customer/' + customerId),
                params: params
            };

            return api.request(config)
                .then(returnResponseObject);
        }

        function save(entitlement) {
            return request('POST',
                'product/' + entitlement.productId +
                '/offer/' + entitlement.offerId +
                '/purchase/' + entitlement.purchaseId
            );
        }

        function find(id) {
            return request('GET', id).then(returnResponseObject);
        }

        function remove(id, disableDateMillis) {
            return request('DELETE', id, {disableDateMillis: disableDateMillis});
        }

        // private

        function url(path) {
            return api.url('/entitlementservice' + path);
        }

        function request(method, path, data) {
            return api.request({
                method: method,
                url: url('/v1/admin/entitlement/' + path),
                data: data
            });
        }

        function returnResponseObject(response) {
            return response.data.responseObject;
        }
    }

}());
