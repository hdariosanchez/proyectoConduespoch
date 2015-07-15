/**
 * Created by darioh on 14/07/15.
 */

var modelTipoPregunta = require('../../model/modelExmTipoPregunta.js');

exports.getlistadoTipo = function (req, res) {
  modelTipoPregunta.connect();
  modelTipoPregunta.get(function (datos) {
    res.json(datos);
  });
};
