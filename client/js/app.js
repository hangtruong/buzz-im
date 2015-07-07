/**
 * Created by joehua on 7/1/15.
 */
'use strict';

/* App Module */
// buzzApp = name in html tag: ng-app
angular.module('buzzApp', [
    'ui.router',
    'ui.bootstrap',
    'ncy-angular-breadcrumb',
    'ngResource',
    'loginModule',
    'dashboardModule',
    'nicheModule',
    'articleModule'
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');  // default page is Dashboard

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
                //data: {
                //    bodyClasses: 'page-login'
                //}
            })
            .state('home', {
                url: '/dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardCtrl',
                ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            })
            .state('niches', {
                url: '/niches',
                templateUrl: 'partials/niche-list.html',
                controller: 'NicheListCtrl',
                ncyBreadcrumb: {
                    label: 'Niches',
                    parent: 'home'
                }
            })
            // TODO Change this to niches/niche-01/articles later
            .state('articles', {
                url: '/articles',
                templateUrl: 'partials/article-list.html',
                controller: 'ArticleListCtrl',
                ncyBreadcrumb: {
                    label: 'Articles',
                    parent: 'home'
                }
            });
    }])

    .config(function ($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            templateUrl: 'partials/breadcrumbs.html'
        });
    });
