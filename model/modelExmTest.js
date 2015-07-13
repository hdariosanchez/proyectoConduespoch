/**
 * Created by darioh on 11/07/15.
 */

var config = require('../server/config.js');
var inspect = require('util').inspect;
var Client = require('mariasql');
var client = new Client();

exports.connect = function() {        //Funcion para crear la conexion a la BD.

  client.connect({                   //Genera una conexion.
    host: config.mariadb.host,
    user: config.mariadb.user,
    password: config.mariadb.password,
    db: config.mariadb.db
  });

  client
    .on('connect', function() { console.log('Client connected'); })
    .on('error', function(err) { console.log('Client error: ' + err);})
    .on('close', function(hadError) { console.log('Client closed'); });
};

exports.get = function(cb) {      //Funcion que forma el modelo de Pregunta: contexto-> Todas las preguntas.
  var data = [];
  //console.log('OBJETO QUE LLEGO AL MODEL '+ JSON.stringify(objFiltrar));
  client.query("SELECT intId, intIdPregunta, strDescripcion, bolCorrecto, intTabular FROM tblExmTest;")
    .on('result', function(res) {
      res.on('row', function(row) {
        data.push(row);
      })
        .on('error', function(err) {
          console.log('Result error: ' + inspect(err));
        })
        .on('end', function(info) {
          console.log('Result finished successfully');
        });
    })
    .on('end', function() {
      cb(data);
      console.log('Funcion get() desde modelGstEstudiante .on.End: OK' + data);
    });
};
