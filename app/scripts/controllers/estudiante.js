'use strict';

angular.module('proyectoConduespochEpApp')
  .controller('EstudianteCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.bandera = 1;
  });
