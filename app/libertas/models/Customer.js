'use strict';


angular.module('libertas')
    .factory('Customer', CustomerFactory);


CustomerFactory.$inject = ['libertasApi'];

function CustomerFactory(api) {
    Customer.list = list;
    Customer.find = find;
    Customer.save = save;
    Customer.remove = remove;

    // public
    return Customer;

    function Customer() {
        this.id = null;  // (string, optional),
        this.deleteDate = null;  // (string, optional),
        this.tenantId = null;  // (string, optional),
        this.name = null;  // (string, optional)
    }

    function list(params) {
        var config = {
            method: 'GET',
            url: url('/v1/admin/customer/findAll'),
            params: params
        };

        return api.request(config)
            .then(returnResponseObject);
    }

    function save(customer) {
        var r;
        if (customer.id) {
            r = request('PUT', customer.id, {name: customer.name});
        } else {
            r = request('POST', customer.name);
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
        return api.url('/customerservice' + path);
    }

    function request(method, path, data) {
        return api.request({
            method: method,
            url: url('/v1/admin/customer/' + path),
            data: data
        });
    }

    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

