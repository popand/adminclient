'use strict';


angular.module('libertas')
    .factory('Tenant', TenantFactory);


TenantFactory.$inject = ['libertasApi'];

function TenantFactory(api) {
    Tenant.list = list;
    Tenant.find = find;
    Tenant.save = save;
    Tenant.remove = remove;

    // public
    return Tenant;

    function Tenant() {
        this.id = null;  // (string, optional),
        this.deleteDate = null;  // (string, optional),
        this.tenantId = null;  // (string, optional),
        this.name = null;  // (string, optional)
    }

    function list(params) {
        var config = {
            method: 'GET',
            url: url('/v1/admin/tenant/findAll'),
            params: params
        };

        return api.request(config)
            .then(returnResponseObject);
    }

    function save(tenant) {
        var r;
        if (tenant.id) {
            r = request('PUT', tenant.id, {name: tenant.name});
        } else {
            r = request('POST', tenant.name);
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
        return api.url('/tenantservice' + path);
    }

    function request(method, path, data) {
        return api.request({
            method: method,
            url: url('/v1/admin/tenant/' + path),
            data: data
        });
    }

    function returnResponseObject(response) {
        return response.data.responseObject;
    }
}

