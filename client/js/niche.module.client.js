/**
 * Created by joehua on 7/1/15.
 */

angular.module('nicheModule', [])

    // Niche List Controller
    .controller('NicheListCtrl', ['$scope', '$modal', 'nicheService',

        function ($scope, $modal, nicheService) {
            $scope.page = 1;
            $scope.itemsPerPage = 10;
            $scope.sortColumn = "name";
            $scope.sortDimension = "asc";
            $scope.searchText = "";

            $scope.load = function () {
                $scope.page = 1;
                $scope.isEmpty = false;
                $scope.scrollDown = 'Scroll down to see more items';
                var queryParams = {
                    page: $scope.page,
                    itemsPerPage: $scope.itemsPerPage,
                    sortColumn: $scope.sortColumn,
                    sortDimension: $scope.sortDimension,
                    searchText: $scope.searchText
                };

                nicheService.query(queryParams)
                    .$promise.then(function (data) {
                        if (data.length == 0) {
                            $scope.isEmpty = true;
                            return;
                        }
                        if ($scope.niches == null) $scope.niches = [];
                        for (var i = 0; i < data.length; i++)
                            $scope.niches.push(data[i]);
                    });
            };

            $scope.loadMore = function () {
                $scope.page = $scope.page + 1;
                var queryParams = {
                    page: $scope.page,
                    itemsPerPage: $scope.itemsPerPage,
                    sortColumn: $scope.sortColumn,
                    sortDimension: $scope.sortDimension,
                    searchText: $scope.searchText
                };

                nicheService.query(queryParams, function (data) {
                    if (data.length == 0) {
                        $scope.scrollDown = 'There\'s no more items';
                        return;
                    }
                    for (var i = 0; i < data.length; i++)
                        $scope.niches.push(data[i]);

                });
            };

            $scope.addNew = function () {
                $scope.isEdit = false;
                openDetailModel(null);
            };

            $scope.update = function (niche) {
                $scope.isEdit = true;
                openDetailModel(niche);
            };

            var openDetailModel = function (niche) {
                var modalInstance = $modal.open({
                    templateUrl: 'partials/niche-modal.html',
                    controller: 'NicheDetailCtrl',
                    resolve: {
                        item: function () {
                            return niche;
                        }
                    }
                });

                // Receive response from Modal when closed
                modalInstance.result
                    .then(function (response) {
                        if (response.isNew)
                            $scope.niches.unshift(response.item);
                    })
                    .catch(function (err) {
                        // TODO Notify the error
                        console.log(err);
                    });
            };

            $scope.load();
        }])

    // Niche Detail Controller
    .controller('NicheDetailCtrl', ['$scope', 'item', '$modalInstance', 'nicheService',
        function ($scope, item, $modalInstance, nicheService) {

            $scope.isNew = item == null ? true : false;

            if ($scope.isNew) {
                $scope.title = "Add new Niche";
                $scope.nicheObj = {code: "", name: "", description: ""};
            }

            else {
                $scope.title = "Edit Niche";
                $scope.nicheObj = item;
            }
            $scope.submit = function () {
                if ($scope.editForm.$invalid)
                    return;
                // Is New
                if ($scope.isNew)
                    nicheService.add($scope.nicheObj, successCallback, errorCallback);
                // Is Edit
                else {
                    // TODO Implement Update Niche to Server by calling the Api
                }
            };

            var successCallback = function (processedItem) {
                $modalInstance.close({
                    isNew: $scope.isNew,
                    item: processedItem
                });
            };

            var errorCallback = function (response) {
                // Try to resolve the problem here to provide helpful message
                if (response.status == 401) {
                    $modalInstance.dismiss('401 error');
                    return;
                }
                $modalInstance.dismiss(response);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }])

    .factory("nicheService", function ($resource) {

        var api_url = "http://localhost:3000/niches";
        //return $resource(api_url);
        return $resource(api_url, {}, {

            add: {
                method: 'POST'
            }
        });
    });