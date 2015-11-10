(function() {
    'use strict';

    angular.module('app.products')
        .controller('ProductDetailsCtrl', ProductDetailsCtrl);


    ProductDetailsCtrl.$inject = [
        '$state',
        '$timeout',
        'customFormlyFields',
        'customFormlyValidators',
        'product',
        'Product',
        'Genre',
        'Image',
        'Video',
        'PurchaseOption',
        'Offer',
    ];

    function ProductDetailsCtrl(
        $state, $timeout,
        fields, validators,
        product, Product,
        Genre, Image, Video, PurchaseOption,
        Offer
    ) {
        var vm = this;
        var group = fields.group;

        // Should be booleans
        _.each(['blackoutIndicator', 'closedCaption', 'comingSoon'], function(key) {
            product[key] = JSON.parse(angular.lowercase(product[key]));
        });

        product.offers = [];

        _.each(product.purchaseOptionList, function(option, index) {
            var ret = {};
            ret.mediaList = _.pluck(option.mediaList, 'componentId');

            if (!option.offerId) {
                console.log(option);
                if (product.id && option.id) {
                    Product.removePurchaseOption(product, option.id);
                }
                delete product.purchaseOptionList[index];
                return;
            }

            Offer.find(option.offerId).then(function(offer) {
                ret.offer = offer;
            });

            product.offers.push(ret);
        });

        console.log(angular.toJson(product, true));

        vm.onSave = save;
        vm.onDelete = remove;
        vm.onBack = goBack;
        vm.model = product;
        vm.fields = getFields();

        // Actions

        function save() {
            if (!vm.form.$valid) {
                return;
            }

            return Product.save(vm.model)
                .then(function(product) {
                    // TODO: on create form is cleared
                    vm.model = product;

                    console.log('saved', product);
                });
        }

        function remove() {
            $.SmartMessageBox({
                title: "Confirmation",
                content: "Are you sure you want to delete this entry?",
                buttons: '[No][Delete]'
            }, function (pressed) {
                if (pressed === "Delete") {
                    Product.remove(vm.model.id).then(goBack);
                }
            });
        }

        function goBack() {
            if (_.get($state, '$current.parent.abstract')) {
                $state.go('app.dashboard');
            } else {
                $state.go('^');
            }
        }

        // Fields
        function getFields() {
            return [
                text({key: 'id', required: false}),
                text({key: 'bindId', required: true}),

                group([
                    text({key: 'title', required: true}),
                    text({key: 'shortTitle', required: false}),
                ]),

                textarea({key: 'shortDescription'}),
                textarea({key: 'longDescription'}),

                group([
                    checkbox('canWatchNow'),
                    checkbox('blackoutIndicator'),
                    checkbox('closedCaption'),
                    checkbox('comingSoon'),
                ], 'row padding-10'),

                text({key: 'productType', required: true}),

                {
                    type: 'select2',
                    key: 'genres',
                    templateOptions: {
                        label: 'Genres',
                        options: product.genres,
                        ngOptions: 'x for x in to.options track by x'
                    },
                    ngModelElAttrs: {
                        'multiple': '',
                    },
                    controller: ['$scope', function($scope) {
                        Genre.list({pageSize: 100, pageNumber: 0}, true)
                            .then(function(genres) {
                                $scope.to.options = _.pluck(genres, 'name');
                            });
                    }]
                },

                fields.tags(product, 'tags'),
                fields.tags(product, 'languages'),

                group([
                    text({
                        className: 'col-xs-12 col-sm-8',
                        key: 'seoUrl',
                        validators: _.pick(validators, 'url')
                    }),
                    integer({
                        className: 'col-xs-12 col-sm-4',
                        key: 'averageUserRating'
                    }),
                ]),

                group([
                    text({
                        key: 'blackoutWindowStart',
                        className: 'col-xs-12 col-sm-6'
                    }),
                    text({
                        key: 'blackoutWindowEnd',
                        className: 'col-xs-12 col-sm-6'
                    }),
                ]),

                group([
                    text({key: 'contentProvider'}),
                    text({key: 'network'}),
                ]),

                group([
                    text({key: 'country'}),

                    text({
                        key: 'releaseYear',
                        placeholder: moment().format('YYYY'),
                        validators: { year: validators.year }
                    }),
                ]),

                group([
                    text({key: 'rating'}),

                    text({
                        key: 'runningTime',
                        placeholder: '01:30:00',
                        validators: { time: validators.time }
                    }),
                ]),

                group([
                    text({key: 'criticId'}),
                    text({key: 'requiredAddonIds'}),
                ]),

                group([
                    text({key: 'studio'}),
                    text({key: 'altCode'}),
                ]),

                list({key: 'actors'}),
                list({key: 'directors'}),
                list({key: 'writers'}),
                list({key: 'subtitleList'}),
                list({key: 'producers'}),

                // TODO: imageType must be unique
                section('Images', 'imageList', [
                    text({key: 'id'}),
                    text({
                        key: 'imageURL',
                        label: 'Image URL',
                        validators: _.pick(validators, 'url')
                    }),
                    group([
                        text({key: 'imageType'}),
                        integer({key: 'imageHeight'}),
                        integer({key: 'imageWidth'}),
                    ])
                ]),

                section('Previews', 'previewList', video()),
                section('Videos', 'videos', video()),

                section('Offers', 'offers', [
                    {
                        type: 'select2',
                        key: 'mediaList',
                        templateOptions: {
                            required: true,
                            label: 'Media List',
                            options: product.videos,
                            ngOptions: 'x.id for x in to.options track by x.id'
                        },
                        ngModelElAttrs: {
                            'multiple': '',
                        },
                        controller: ['$scope', function($scope) {
                            $scope.$watch(function() {
                                return vm.model.videos;
                            }, function(videos) {
                                $scope.to.options = _.filter(videos, 'id');
                            });
                        }]
                    },

                    {
                        type: 'select2',
                        key: 'offer',
                        templateOptions: {
                            label: 'Offer',
                            options: [],
                            ngOptions: 'x as x.name for x in to.options track by x.id'
                        },
                        controller: ['$scope', function($scope) {
                            var empty = { id: null, name: 'New' };

                            Offer.list({pageSize: 100, pageNumber: -1, cache: true})
                                .then(function(offers) {
                                    $scope.to.options = [empty].concat(offers);

                                    _.each(offers, function(offer) {
                                        var original = angular.toJson(offer);

                                        offer.isDirty = function() {
                                            return original !== angular.toJson(this);
                                        };
                                    });

                                    // Workaround for select2, to set currently selected item.
                                    $timeout(function() {
                                        $scope.to.select($scope.originalModel.offerId);
                                    });
                                });
                        }]
                    },

                    { template: '<hr/>'},
                    text({key: 'offer.id', label: 'Id'}),
                    text({key: 'offer.tenantId', label: 'Tenant Id'}),
                    text({key: 'offer.regex', label: 'Regular Expression'}),
                    text({key: 'offer.offerType', label: 'Offer Type'}),
                    text({key: 'offer.name', label: 'Name'}),
                    text({key: 'offer.price', label: 'Price'}),
                    group([
                        fields.date('offer.startDateTimestampMillis', 'Start Date'),
                        fields.date('offer.endDateTimestampMillis', 'End Date'),
                    ]),
                    text({key: 'offer.entitlementDurationMillis', label: 'Entitlement Duration'}),
                ])
            ];
        }

        // Field helpers

        function section(label, key, fields, controller) {
            return {
                key: key,
                type: 'listSection',
                templateOptions: {
                    label: label,
                    fields: fields,
                },
                controller: controller
            };
        }

        function integer(args) {
            return text(_.defaults(args, {validators: validators.integer}));
        }

        function text(args) {
            defaults(args);

            return {
                key: args.key,
                type: args.type,
                className: args.className,
                templateOptions: {
                    required: args.required,
                    label: args.label,
                    placeholder: args.placeholder
                },
                validators: args.validators
            };
        }

        function checkbox(key) {
            return text({
                key: key,
                type: 'checkbox',
                className: 'col-xs-6 col-sm-3'
            });
        }

        function textarea(args) {
            defaults(args);

            return {
                key: args.key,
                type: "textarea",
                templateOptions: {
                    required: args.required,
                    label: args.label,
                    placeholder: args.placeholder,
                    rows: args.rows,
                    cols: args.cols
                },
            };
        }

        function list(args) {
            defaults(args);

            return {
                key: args.key,
                type: "list",
                templateOptions: {
                    required: args.required,
                    label: args.label,
                    placeholder: args.placeholder,
                    rows: args.rows || _.max([2, vm.model[args.key].length + 1])
                }
            };
        }

        function video() {
            return [
                group([ // should be read-only
                    text({key: 'id'}),
                    text({key: 'componentId'}),
                ]),
                text({
                    key: 'url',
                    label: 'URL',
                    validators: _.pick(validators, 'url')
                }),
                group([
                    text({key: 'screenFormat'}),
                    text({key: 'aspectRatio'}),
                    text({key: 'mediaFormat'}),
                    text({key: 'targetDevice'}),
                ])
            ];
        }

        function defaults(args) {
            args.type = args.type || 'input';
            args.label = args.label || fields.labelFromKey(args.key);
            args.placeholder = args.placeholder || args.label;

            return args;
        }

        function zipWith(key) {
            return function(value) {
                var ret = {};
                ret[key] = value;
                return ret;
            };
        }
    }

}());
