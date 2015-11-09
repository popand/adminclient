(function() {
    'use strict';

    angular.module('app.products')
        .controller('ProductDetailsCtrl', ProductDetailsCtrl);


    ProductDetailsCtrl.$inject = [
        '$state',
        'customFormlyFields',
        'customFormlyValidators',
        'product',
        'Product',
        'Image',
        'Video',
        'PurchaseOption',
        'Media'
    ];

    function ProductDetailsCtrl(
        $state, fields, validators, product,
        Product, Image, Video, PurchaseOption, Media
    ) {
        var vm = this;
        var group = fields.group;

        console.log(angular.toJson(product, true));

        // TODO: genre entries are JSON strings for some reason
        // product.genres = _.map(product.genres, JSON.parse);

        // Should be booleans
        _.each(['blackoutIndicator', 'closedCaption', 'comingSoon'], function(key) {
            product[key] = JSON.parse(angular.lowercase(product[key]));
        });

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
                    vm.model = product;
                }); //.then(goBack);
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

                fields.tags(product, 'tags'),
                fields.tags(product, 'genres'),
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

                // section('Genres', 'genres', [
                //     group([
                //         text({key: '_id', label: 'Id'}),
                //         text({key: 'tenantId'}),
                //     ]),
                //     text({key: 'name'})
                // ]),

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

                section('Purchase Options', 'purchaseOptionList', [
                    text({key: 'id'}),
                    text({key: 'offerId'}),
                    text({key: 'tenantId'}),
                    text({key: 'offerType'}),
                    text({key: 'description'}),
                    text({key: 'price'}),
                    group([
                        fields.date('startDateTimestampMillis', 'Start Date'),
                        fields.date('endDateTimestampMillis', 'End Date'),
                    ]),
                    text({key: 'entitlementDurationMillis'}),
                    text({key: 'creationDate'}),
                    section('Media List', 'mediaList', [
                        group([
                            text({key: 'id'}),
                            text({key: 'componentId'}),
                        ]),
                        group([
                            text({key: 'screenFormat'}),
                            text({key: 'aspectRatio'}),
                            text({key: 'mediaFormat'}),
                            text({key: 'targetDevice'}),
                        ])
                    ]),
                ])
            ];
        }

        // Field helpers

        function section(label, key, fields, collapsed) {
            return {
                key: key,
                type: 'listSection',
                templateOptions: {
                    label: label,
                    fields: fields,
                    collapsed: _.isUndefined(collapsed)? true : collapsed
                }
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
    }

}());
