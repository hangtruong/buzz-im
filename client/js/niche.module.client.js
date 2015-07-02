/**
 * Created by joehua on 7/1/15.
 */

var nicheModule = angular.module('nicheModule', []);

nicheModule.controller('NicheListCtrl', ['$scope', 'nichesService',

    function ($scope, nichesService) {
        $scope.page = 1;
        $scope.itemsPerPage = 10;
        $scope.sortColumn = "name";
        $scope.sortDimension = "asc";

        var queryParams = {
            page: $scope.page,
            itemsPerPage: $scope.itemsPerPage,
            sortColumn: $scope.sortColumn,
            sortDimension: $scope.sortDimension
        };
        nichesService.query(queryParams, function (data) {
            $scope.niches = data;
        });
    }]);

nicheModule.controller('NicheDetail', ['$scope',
    function ($scope) {
    }]);

nicheModule.factory("nichesService", function ($resource) {
    var api_url = "http://localhost:3000/niches";
    return $resource(api_url);
    //return $resource(api_url, {}, {
    //    query: {
    //        method: 'GET',
    //        params: {
    //            page: 'page',
    //            itemPerPage: 'itemPerPage',
    //            sortColumn: 'sortColumn',
    //            sortDimension: 'sortDimension'
    //        }
    //    }
    //    //search: {
    //    //    method: "GET",
    //    //    url: api_url + '/search/:by_name',
    //    //    params: {
    //    //        by_name: 'by_name',
    //    //        page: 'page',
    //    //        results: 'results',
    //    //        sort: "sort"
    //    //    }
    //    //},
    //    //add: {
    //    //    method: 'POST'
    //    //},
    //    //update: {
    //    //    method: 'PUT',
    //    //    url: api_url + '/:id',
    //    //    params: {
    //    //        id: '@_id'
    //    //    }
    //    //},
    //    //delete: {
    //    //    method: 'DELETE',
    //    //    url: api_url + '/:id',
    //    //    params: {
    //    //        id: 'id'
    //    //    }
    //    //}
    //});
});