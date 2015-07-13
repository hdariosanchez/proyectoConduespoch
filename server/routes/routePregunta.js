/**
 * Created by darioh on 13/07/15.
 */
'use strict';
var modelPregunta = require('../../model/modelExmPregunta');
var modelTest = require('../../model/modelExmTest');
var modelCasilla = require('../../model/modelExmCasilla');
var modelTexto = require('../../model/modelExmTexto');

var i=0;
var row;
//array para padre.
var parents=[];
//array para hijo.
var childrens=[];
//Nombre de la variable
var childrenNombre = 'nodes';
var padreNombre = 'intIdPadre';
var nombreRespuesta = 'respuesta';


exports.getListado = function(req, res) {
  limpiaDatos();

  modelPregunta.connect();
  modelPregunta.get(function (datos) {

    for(i=datos.length - 1; i>=0; i--){
      datos[i][padreNombre]= null;
      datos[i][nombreRespuesta]= '';
      datos[i][childrenNombre]=[];
      row=datos[i];
                                      /*
                                      if(datos[i].int_id_tipo_pregunta == '1'){
                                        datos[i].int_id_tipo_pregunta = 'text';
                                      }
                                      if(datos[i].int_id_tipo_pregunta == '6'){
                                        datos[i].int_id_tipo_pregunta = 'date';
                                      }
                                      if(datos[i].int_id_tipo_pregunta == '7'){
                                        datos[i].int_id_tipo_pregunta = 'time';
                                      }*/
      parents.push(row);
    }
    //res.json(parents);
  });

  modelTest.connect();
  modelTest.get(function (datos) {
    for(i=datos.length - 1; i>=0; i--){
      datos[i][padreNombre] = datos[i].intIdPregunta;
      datos[i][nombreRespuesta]= false;
      datos[i][childrenNombre]=[];

                                      /*
                                      if(datos[i].int_id_tipo_pregunta == '5'){
                                        datos[i].int_id_tipo_pregunta = 'range';
                                      }
                                      */
      row=datos[i];
      childrens.push(row);
    }
/*
    for(var j=0; j<2; j++) {
      parents.forEach(function (parent) {
        loopChildrens(childrens, parent, j);
      });
    }
    res.json(json);
*/
  });

  modelCasilla.connect();
  modelCasilla.get(function (datos) {
    for(i=datos.length - 1; i>=0; i--){
      datos[i][padreNombre] = datos[i].intIdPregunta;
      datos[i][nombreRespuesta]= false;
      datos[i][childrenNombre]=[];
                                                            /*
                                                              if(datos[i].int_id_tipo_pregunta == '4'){
                                                                datos[i].int_id_tipo_pregunta = 'checkbox';
                                                              }
                                                              if(datos[i].int_id_tipo_pregunta == '3'){
                                                                datos[i].int_id_tipo_pregunta = 'radio';
                                                              }
                                                            */
      row=datos[i];
      childrens.push(row);
    }
  });

  modelTexto.connect();
  modelTexto.get(function (datos) {
    for(i=datos.length - 1; i>=0; i--){
      datos[i][padreNombre] = datos[i].intIdPregunta;
      datos[i][nombreRespuesta]= false;
      datos[i][childrenNombre]=[];

      row=datos[i];
      childrens.push(row);
    }

    for(var j=0; j<2; j++) {
      parents.forEach(function (parent) {
        loopChildrens(childrens, parent, j);
      });
    }
    res.json(json);
  });

};

var json=[];

// Recursividad para comprobar los children
var loopChildrens = function(rows, parent, bandera){

  if(rows.length>0 && bandera ==0){
    rows.forEach(function (row) {
      if(row.intIdPadre == parent.intId){
        parent.nodes.push(row);
        //console.log("PROBANDO JSON-->"+ JSON.stringify(parent));
        //loopChildrens(rows, row,0);
      }
    });
  }
  if(rows.length>0 && bandera == 1) {
    json.push(parent);
  }
};


// Limpia los datos...
var limpiaDatos = function(){
  json.splice(0, json.length);
  console.log("Longitud de json->"+json.length);

  parents.splice(0, parents.length);
  console.log("Longitud de json->"+parents.length);

  childrens.splice(0, childrens.length);
  console.log("Longitud de json->"+childrens.length);

};
