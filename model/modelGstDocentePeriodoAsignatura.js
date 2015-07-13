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

exports.get = function(objFiltrar ,cb) {      //Funcion que forma el modelo de estudiante: contexto-> Todos los estudiantes.
  var data = [];
  console.log('OBJETO QUE LLEGO AL MODEL '+ JSON.stringify(objFiltrar));
  client.query("SELECT p.intId as intIdPeriodo, d.intId as intIdDocente, a.intId as intIdAsignatura, a.strCodigo, a.strNombre, a.strEstado FROM tblGstDocentePeriodoAsignatura AS dpa " +
  "LEFT JOIN " +
  "tblGstDocente AS d ON dpa.intIdDocente = d.intId " +
  "LEFT JOIN " +
  "tblGstAsignatura AS a ON dpa.intIdAsignatura = a.intId " +
  "LEFT JOIN " +
  "tblGstPeriodo AS p ON dpa.intIdPeriodo = p.intId " +
  "WHERE d.intId = ? AND p.intId = ?;",
    [objFiltrar.intIdDocente, objFiltrar.intIdPeriodo])
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

// inserta un nuevo producto en la tabla "producto"
//exports.db_insertar = function(id_grupo, desc_producto, cb) {
exports.db_insertar = function(productoNuevo, cb) {
  //INSERT INTO producto (int_id_grupo, int_id_unidad, str_descripcion, flt_min, flt_max, str_estado) VALUES
  //(1, 1, 'Borrego', 4.5, 10.5, 'Activo')
  client.query("INSERT INTO producto (int_id_grupo, int_id_unidad, str_descripcion, flt_min, flt_max, str_estado) VALUES (?, ?, ?, ?, ?, ?);",
    [productoNuevo._num_grupo, productoNuevo._num_unidad, productoNuevo._descripcion, productoNuevo._flt_min, productoNuevo._flt_max, "Activo"])
    .on('error', function(err) {
      console.log('Result error: ' + inspect(err));
    })
    .on('end', function() {
      console.log('Result finished successfully');
      cb(true);
    });
}

// elimina un elemento de la tabla "producto" de acuerdo a su "id_producto"
exports.db_eliminar = function(id_producto, cb) {
  //client.query("DELETE FROM producto WHERE int_id = :var_id_producto;",
  client.query("UPDATE producto SET str_estado = ? WHERE int_id = ?;",
    ["Inactivo" ,id_producto])
    //{var_id_producto: id_producto})
    .on('error', function(err) {
      console.log('Result error: ' + inspect(err));
    })
    .on('end', function() {
      console.log('Result finished successfully');
      cb(true);
    });
}

// obtiene un elemento de la tablas "producto" join "producto" a partir de "id_producto"
exports.db_get_elemento_by_id = function(id_producto, cb) {
  var data = [];
  client.query("SELECT id_producto, desc_producto, num_grupo FROM producto INNER JOIN grupo "+
  "ON producto.id_grupo = grupo.id_grupo WHERE id_producto = :id;",{id: id_producto})
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
    });
}

exports.db_actualizar = function (productoEditar, cb){
  console.log("SI LLEGA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  client.query("UPDATE producto SET int_id_grupo = ?, int_id_unidad = ?, str_descripcion = ?, flt_min = ?, flt_max = ? WHERE int_id = ?;",
    [productoEditar._num_grupo, productoEditar._num_unidad, productoEditar._descripcion, productoEditar._flt_min, productoEditar._flt_max, productoEditar._id])
    .on('error', function(err) {
      console.log('Result error: ' + inspect(err));
    })
    .on('end', function() {
      console.log('Result finished successfully');
      cb(true);
    });
}

exports.disconnect = function() {   //Funcion cerrar conexion abierta en este model Estudiante
  client.end();
  console.log('Conexion cerrada desde modelGstEstudiante');
};
