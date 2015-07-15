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
  'flow',
  'ui.tree',
  'ngTouch'
])
  .config(function ($routeProvider, flowFactoryProvider) {

    flowFactoryProvider.defaults = {
      target: '/api/pregunta/upload',
      permanentErrors:[404, 500, 501],
      minFileSize: 0
    };
    // You can also set default events:
    flowFactoryProvider.on('catchAll', function (event) {

    });

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
