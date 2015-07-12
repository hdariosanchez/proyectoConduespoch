/**
 * Created by darioh on 12/07/15.
 */

var modelEstudiante = require('../../model/modelGstEstudiante.js');

exports.getlistado = function (req, res) {
  modelEstudiante.connect();
  modelEstudiante.get(function (datos) {
    res.json(datos);
  });
  //modelEstudiante.disconnect();
};
