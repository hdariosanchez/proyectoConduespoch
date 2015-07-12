'use strict';

angular.module('proyectoConduespochEpApp')
  .controller('EstudianteCtrl', function ($scope, $http, crudTodo) {
    /*
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    */
    $scope.a = 'jolakdfa adfna dfa dfabd fd';

    var urlEstudiante = '/api/estudiante';

    crudTodo.get(urlEstudiante)
      .success(function(dato){
        $scope.estudianteListado = dato;
        console.log('datos posibles' +dato);
      })
      .error(function(err){
        console.log('Error en controlador EstudianteCtrl en crudTodo.get(urlEstudiante): '+err);
      });
  });
