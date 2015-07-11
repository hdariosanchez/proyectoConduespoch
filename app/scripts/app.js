'use strict';

angular.module('proyectoConduespochEpApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/estudiante', {
        templateUrl: 'views/estudiante.html',
        controller: 'EstudianteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
