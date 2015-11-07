'use strict';

angular.module('libertas')
    .factory('PurchaseOption', PurchaseOption);


function PurchaseOption() {
    return function() {
        this.id = null;  // (string, optional),
        this.tenantId = null;  // (string, optional),
        this.description = null;  // (string, optional),
        this.endDateTimestampMillis = null;  // (string, optional),
        this.offerType = null;  // (string, optional),
        this.mediaList = [];  // (array[Media], optional),
        this.price = null;  // (string, optional),
        this.startDateTimestampMillis = null;  // (string, optional),
        this.offerId = null;  // (string, optional),
        this.entitlementDurationMillis = null;  // (string, optional),
        this.creationDate = null;  // (string, optional)
    };
}
