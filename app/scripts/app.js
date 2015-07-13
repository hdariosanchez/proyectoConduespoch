'use strict';

var proyectoConduespochEpApp = angular.module('proyectoConduespochEpApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'ngGrid',
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
      .when('/docente', {
        templateUrl: 'views/docente.html',
        controller: 'DocenteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
