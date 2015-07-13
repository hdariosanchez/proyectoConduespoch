'use strict';

angular.module('proyectoConduespochEpApp')
  .controller('DocenteCtrl', function ($scope, $http, $cookieStore, crudTodo) {
    /*
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    */

    var docentePeriodoAsignatura = {    //Modelo ejemplo para enviar datos y filtrar la presentacion de primera instancia de las asignaturas
      "intIdDocente": "1",              //pertenecientes al docente en ese periodo ingresado.
      "intIdPeriodo": "1",
      "strNombreApellido":"Hermes Dario Sanchez Bermeo"
    };
    var asignaturaSeleccionda = {}; //Esto no deberia declarar pero hasta mientras-> sigue a crudTodo.getFiltrado(urlPregunta, asignaturaSeleccionda)

    var urlAsignatura = '/api/asignatura';  //Seccion de variables locales y globales (no scope) como url a enviar y contadores...
    var urlPregunta = '/api/pregunta';

    crudTodo.getFiltrado(urlAsignatura, docentePeriodoAsignatura) //Funcion para utilizar llamadas a traves de un servicios angular hacia el servidor nodejs.
      .success(function(dato){                                    //Obtiene todas las materias en el periodo actual y el docente en particular.
        $scope.listadoAsignatura = dato;
      })
      .error(function(err){
        console.log('Error en controlador DocenteCtrl en crudTodo.getFiltrado(urlAsignatura, docentePeriodoAsignatura): '+err);
      });

    crudTodo.get(urlPregunta) //Funcion para utilizar llamadas a traves de un servicios angular hacia el servidor nodejs.
      .success(function(dato){
        $scope.listadoPregunta = dato;
      })
      .error(function(err){
        console.log('Error en controlador DocenteCtrl en crudTodo.getFiltrado(urlPregunta, asignaturaSeleccionda): '+err);
      });

    $scope.seleccion = [];

    var removeTemplate =
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#editarProductoModal" ng-click="indexProductoEditar($index)"> ' +
      '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> </button>' +
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarProductoModal" ng-click="indexProducto($index)"> ' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';


    $scope.gridOptions = { //Opciones y datos en "data" para mostrar en la tabla.
      data: 'listadoPregunta',
      selectedItems: $scope.seleccion,
      enableRowSelection: true,
      enableCellSelection: true,
      showGroupPanel: false,
      showFooter: true,
      enableCellEdit: false,
      showSelectionCheckbox: true,
      enableColumnResize: true,
      enableColumnReordering: true,
      enableRowReordering: true,
      multiSelect: false,
      enableHighlighting: true,
      //noKeyboardNavigation: true,
      virtualizationThreshold: 50,
      afterSelectionChange: function (theRow, evt) {
        /*
        $scope.editarproducto.int_id = parseInt(theRow.entity.int_id);
        $scope.editarproducto.descripcion = theRow.entity.Producto;
        $scope.editarproducto.numGrupo = theRow.entity.Grupo;
        $scope.editarproducto.numMinimo = parseFloat(theRow.entity.flt_min);
        $scope.editarproducto.numMaximo = parseFloat(theRow.entity.flt_max);
        $scope.editarproducto.numUnidad = theRow.entity.Unidad_medida;
        */
      },
      columnDefs: [
        {field: 'intId', displayName: 'Id', visible: false},
        {field: 'intIdTipoPregunta', displayName: 'TipoPregunta', visible: false},
        {field: 'intIdAsignatura', displayName: 'Asignatura', visible: false}, //Aca mejorar para que pueda hacer filtrado por asignatura.
        {field: 'intNumero', displayName: 'Numero', visible: false},
        {field: 'strBase', displayName: 'Base', width: '58%'},
        {field: 'dtFechaCreacion', displayName: 'Fecha Creacion', width: '13%'},
        {field: 'fltValor', displayName: 'Valor', width: '7%'},
        {field: 'lgbImagen', displayName: 'Imagen', visible: false},
        {field: 'nodes', displayName: 'Nodes', visible: false},
        {field: 'strEstado', displayName: 'Estado', width: '10%'},
        {field: 'remove', displayName:'Acción', cellTemplate: removeTemplate, width: '10%'}
      ]};



    $scope.tester = function(materiaSeleccionada){
      console.log('Materia seleccionada y renderizada en log desde tester: '+ JSON.stringify(materiaSeleccionada));
    };

    var mobileView = 992; //Averiguar que mismo.

    $scope.getWidth = function() {  // hacer responsive creo - Averiguar que mismo.
      return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) { // Como su nombre mismo lo indica - Averiguar que mismo.
      if (newValue >= mobileView) {
        if (angular.isDefined($cookieStore.get('toggle'))) {
          $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
        } else {
          $scope.toggle = true;
        }
      } else {
        $scope.toggle = false;
      }
    });

    $scope.toggleSidebar = function() { // Lo mismo que anterior
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() { // sudo !!
      $scope.$apply();
    };




  });
