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
    var urlTipoPregunta = '/api/tipoPregunta';
    var removeTemplate =
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#editarProductoModal" ng-click="indexProductoEditar($index)"> ' +
      '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> </button>' +
      '<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#eliminarProductoModal" ng-click="indexProducto($index)"> ' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button>';
    //var contadorRespuestaTest = 2;
    var bandera = 0;  // Bandera relacionada con el añadir nueva opcion de respuesta al pregunta test y casilla.

    $scope.respuestaTest = [];
    $scope.respuestaCasilla = [];
    $scope.respuestaVerdadFalso = [];
    $scope.respuestaTexto = [];
    $scope.seleccion = [];
    $scope.visible = true;
    $scope.visibleC = false;
    $scope.visibleT = false;
    $scope.visibleVF = false;
    $scope.visibleTx = false;
    $scope.tipoPreguntaModel ={};
    $scope.pregunta ={
      "intIdTipoPregunta":"",
      "intIdAsignatura":"",
      "intIdNumero":"",
      "strBase":"",
      "dtFechaCreacion": new Date(),
      "dtFechaModificacion": new Date(),
      "fltValor":"",
      "lgbImagen":"",
      "nodes": []
    };
    var test = {
      "intId": "",
      "intIdPregunta": "",
      "strDescripcion": "",
      "bolCorrecto": false,
      "intTabular": ""
    };
    $scope.casilla = {
      "intId": "",
      "intIdPregunta": "",
      "strDescripcion": "",
      "bolCorrecto": false,
      "fltValor":"",
      "intTabular": ""
    };
    $scope.texto = {
      "intId": "",
      "intIdPregunta": "",
      "strDescripcion": "",
      "fltValor": "",
      "intTabular": ""
    };

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
        console.log('Error en controlador DocenteCtrl en crudTodo.get(urlPregunta): '+err);
      });

    crudTodo.get(urlTipoPregunta) //Funcion para utilizar llamadas a traves de un servicios angular hacia el servidor nodejs.
      .success(function(dato){
        $scope.listadoTipoPregunta = dato;
      })
      .error(function(err){
        console.log('Error en controlador DocenteCtrl en crudTodo.get(urlTipoPregunta): '+err);
      });

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

    $scope.seleccionMateriaTipoPregunta = function(materiaSeleccionada){
      $scope.visible = false;
      $scope.pregunta.intIdAsignatura = materiaSeleccionada.intIdAsignatura;
      $scope.NombreMateria = materiaSeleccionada.strNombre;
      console.log('Materia seleccionada y renderizada en log desde seleccionMateriaTipoPregunta: '+ JSON.stringify(materiaSeleccionada));
    };

    $scope.$watch('tipoPreguntaModel', function(newValue, oldValue){ //Estar escuchando el cambio en el select de tipo pregunta..
      $scope.pregunta.intIdTipoPregunta = newValue.intId;

      switch (parseInt(newValue.intId)){

        case 1:

          for(var i= 0; i<2; i++){
            $scope.respuestaTest.push({
              "intId": i+1,
              "intIdPregunta": "",
              "strDescripcion": "",
              "bolCorrecto": false,
              "intTabular": i+1
            });
          }
          $scope.visibleT = true;
          //apagar las demas y borrar datos de los demas tipos de respuesta.
          $scope.visibleC = false;
          $scope.visibleTx = false;
          $scope.visibleVF = false;
          $scope.respuestaCasilla.splice(0, $scope.respuestaCasilla.length);
          $scope.respuestaTexto.splice(0, $scope.respuestaTexto.length);
          $scope.respuestaVerdadFalso.splice(0, $scope.respuestaVerdadFalso.length);
              break;

        case 2:

          for(var i= 0; i<2; i++) {
            $scope.respuestaCasilla.push({
              "intId": i+1,
              "intIdPregunta": "",
              "strDescripcion": "",
              "bolCorrecto": false,
              "fltValor":"",
              "intTabular": i+1
            });
          }
          $scope.visibleC = true;
          //apagar las demas.
          $scope.visibleTx = false;
          $scope.visibleT = false;
          $scope.visibleVF = false;
          $scope.respuestaTexto.splice(0, $scope.respuestaTexto.length);
          $scope.respuestaTest.splice(0, $scope.respuestaTest.length);
          $scope.respuestaVerdadFalso.splice(0, $scope.respuestaVerdadFalso.length);
              break;

        case 3:

            $scope.respuestaVerdadFalso.push({
              "intId": 1,
              "intIdPregunta": "",
              "strDescripcion": "Verdad",
              "bolCorrecto": false,
              "intTabular": 1
            });

            $scope.respuestaVerdadFalso.push({
              "intId": 2,
              "intIdPregunta": "",
              "strDescripcion": "Falso",
              "bolCorrecto": false,
              "intTabular": 2
            });

          $scope.visibleVF = true;
          //apagar las demas y borrar datos de los demas tipos de respuesta.
          $scope.visibleC = false;
          $scope.visibleT = false;
          $scope.visibleTx = false;
          $scope.respuestaCasilla.splice(0, $scope.respuestaCasilla.length);
          $scope.respuestaTest.splice(0, $scope.respuestaTest.length);
          $scope.respuestaTexto.splice(0, $scope.respuestaTexto.length);
          break;

              break;
        case 4:

          for(var i= 0; i<2; i++) {
            $scope.respuestaTexto.push({
              "intId": i+1,
              "intIdPregunta": "",
              "strDescripcion": "",
              "fltValor": "",
              "intTabular": i+1
            });
          }
          $scope.visibleTx = true;
          //apagar las demas.
          $scope.visibleC = false;
          $scope.visibleT = false;
          $scope.visibleVF = false;
          $scope.respuestaCasilla.splice(0, $scope.respuestaCasilla.length);
          $scope.respuestaTest.splice(0, $scope.respuestaTest.length);
          $scope.respuestaVerdadFalso.splice(0, $scope.respuestaVerdadFalso.length);
              break;
        case 5:
          alert('No autorizado.');
          $scope.visibleTx = false;
          $scope.visibleC = false;
          $scope.visibleT = false;
          $scope.visibleVF = false;
              break;
      }
    });

    $scope.tester2 =function(scope){
      console.log(JSON.stringify(scope));
    };

    $scope.agregarRespuestaCasilla = function(scope){
      for(var i=0; i<$scope.respuestaCasilla.length; i++){

        if(bandera == 1){
          $scope.respuestaCasilla[i].intId = $scope.respuestaCasilla[i].intId + 1;
        }
        if($scope.respuestaCasilla[i].intId == scope.intId && bandera == 0) {
          $scope.respuestaCasilla.splice(i+1,0,
            {
              "intId": scope.intId+1,
              "intIdPregunta": "",
              "strDescripcion": "",
              "bolCorrecto": false,
              "intTabular": scope.intId+1
            }
          );
          i+=1;
          bandera=1;
        }
      }
      bandera=0;
    };

    $scope.agregarRespuestaTest = function(scope){
      for(var i=0; i<$scope.respuestaTest.length; i++){

        if(bandera == 1){
          $scope.respuestaTest[i].intId = $scope.respuestaTest[i].intId + 1;
        }
        if($scope.respuestaTest[i].intId == scope.intId && bandera == 0) {
          $scope.respuestaTest.splice(i+1,0,
            {
              "intId": scope.intId+1,
              "intIdPregunta": "",
              "strDescripcion": "",
              "bolCorrecto": false,
              "intTabular": scope.intId+1
            }
          );
          i+=1;
          bandera=1;
        }
      }
      bandera=0;
    };

    $scope.agregarRespuestaTexto = function(scope){
      for(var i=0; i<$scope.respuestaTexto.length; i++){
        if(bandera == 1){
          $scope.respuestaTexto[i].intId = $scope.respuestaTexto[i].intId + 1;
        }
        if($scope.respuestaTexto[i].intId == scope.intId && bandera == 0) {
          $scope.respuestaTexto.splice(i+1,0,
            {
              "intId": scope.intId+1,
              "intIdPregunta": "",
              "strDescripcion": "",
              "fltValor": "",
              "intTabular": scope.intId+1
            }
          );
          i+=1;
          bandera=1;
        }
      }
      bandera=0;
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
