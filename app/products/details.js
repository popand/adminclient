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

        // TODO: genre entries are JSON strings for some reason
        product.genres = _.map(product.genres, JSON.parse);

        vm.onSave = save;
        vm.onDelete = remove;
        vm.onBack = goBack;
        vm.model = product;

        vm.fields = getFields();

        vm.purchaseOptions = {
            fields: [
                section('', 'purchaseOptionList', [
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
                            text({key: 'componentId'})
                        ]),
                        group([
                            text({key: 'screenFormat'}),
                            text({key: 'aspectRatio'}),
                            text({key: 'mediaFormat'}),
                            text({key: 'targetDevice'}),
                        ])
                    ]),
                ], /* collapsed = */ false)
            ],
        };

        // Actions

        function save() {
            if (vm.form.$valid) {
                console.log(angular.toJson(vm.model, true));
                // return Product.save(vm.model).then(goBack);
            }
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
                text({key: 'id', required: true}),
                text({key: 'bindId', required: true}),

                group([
                    text({key: 'title', required: true}),
                    text({key: 'shortTitle', required: true}),
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
                        validators: {
                            year: validators.moment('YYYY', '"Please enter a valid year"'),
                        }
                    }),
                ]),

                group([
                    text({key: 'rating'}),

                    text({
                        key: 'runningTime',
                        placeholder: moment().format('01:30:00'),
                        validators: {
                            time: validators.moment(
                                'hh:mm:ss',
                                '"Running time must be in format HH:MM:SS"'
                            ),
                        }
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

                section('Genres', 'genres', [
                    group([
                        text({key: '_id', label: 'Id'}),
                        text({key: 'tenantId'}),
                    ]),
                    text({key: 'name'})
                ]),

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

                section('Videos', 'videos', [
                    group([
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
                ])
            ];
        }

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

        function defaults(args) {
            args.type = args.type || 'input';
            args.label = args.label || fields.labelFromKey(args.key);
            args.placeholder = args.placeholder || args.label;

            return args;
        }
    }

}());
