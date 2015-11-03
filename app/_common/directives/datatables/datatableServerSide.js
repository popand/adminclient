'use strict';


angular.module('SmartAdmin')
    .directive('datatableServerSide', datatableServerSide);

datatableServerSide.$inject = ['$compile'];

function datatableServerSide($compile) {
    return {
        restrict: 'A',
        scope: {
            tableOptions: '=',
            notifyTableCreated: '&onTableCreated',
            requestData: '&onDataRequest',
            remove: '&onRemove',
            create: '&onCreate',
            onItemClick: "&"
        },
        link: function (scope, element, attributes) {
            var options = {
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 buttons'>r<'col-sm-6 col-xs-12 hidden-xs'lC>>" +
                    "t" +
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
                oLanguage:{
                    "sSearch": "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
                    "sLengthMenu": "_MENU_"
                },
                "autoWidth": false,
                "smartResponsiveHelper": null,
                "preDrawCallback": function () {
                    // Initialize the responsive datatables helper once.
                    if (!this.smartResponsiveHelper) {
                        /* globals ResponsiveDatatablesHelper */
                        this.smartResponsiveHelper = new ResponsiveDatatablesHelper(element, {
                            tablet: 1024,
                            phone: 480
                        });
                    }
                },
                "rowCallback": function(row, data) {
                    this.smartResponsiveHelper.createExpandIcon(row);

                    $(row).css({cursor: 'pointer'})
                        .attr('ng-click', 'onItemClick({item: data})');

                    $compile(row)(_.extend(scope.$new(), {data: data}));
                },
                "drawCallback": function (oSettings) {
                    this.smartResponsiveHelper.respond();
                },

                "stateSave": true,
                "select": true,
                "fnServerData": serverData,
                "sAjaxDataProp": "data",
                "processing": true,
                "serverSide": true,
                "paging": true
            };

            var cols = _.map(element.find('th'), defineColumn);
            if (cols.length > 0) {
                options['aoColumns'] = cols;
            }

            if (attributes.tableOptions) {
                options = angular.extend(options, scope.tableOptions);
            }

            scope.notifyTableCreated({table: element.DataTable(options)});

            $('.buttons').append($(
                '<a class="btn btn-sm btn-default" id="create-button">' +
                '<i class="fa fa-plus"></i></a>'
            ).click(function() {
                scope.create();
            }));

            function serverData(sSource, aoData, fnCallback, oSettings) {
                var api = this.api(true); // jshint ignore:line

                var draw = aoData[0].value;
                var columns = aoData[1].value;
                var order = aoData[2].value[0];
                var size = aoData[4].value;
                var search = aoData[5].value;

                var sortField = columns[order.column].data || undefined;
                var sortOrder = sortField? order.dir : undefined;

                var params = {
                    pageNumber: api.page(),
                    pageSize: size,
                    sortField: sortField,
                    sortOrder: sortOrder
                };

                scope.requestData({params: params}).then(update);

                function update(records) {
                    fnCallback({
                        draw: draw,
                        data: records.data,
                        recordsTotal: records.total,
                        recordsFiltered: records.total
                    });
                }
            }

            function defineColumn(val, index) {
                var th = $(val);

                var item = th.data('item');

                if (_.isUndefined(item)) {
                    return {
                        name: th.text(),
                        data: th.data('key') || index,
                        searchable: th.data('searchable')
                    };
                }

                var content = th.html();

                // set column header
                th.text(th.data('column') || '');

                return {
                    data: null,
                    searchable: th.data('searchable'),
                    defaultContent: content,
                    createdCell: function(cell, text, data) {
                        var cellScope = scope.$new();
                        cellScope.$index = index;

                        if (item) {
                            cellScope[item] = data;
                        } else{
                            angular.extend(cellScope, data);
                        }

                        $compile(cell)(cellScope);
                    }
                };
            }
        }
    };
}
