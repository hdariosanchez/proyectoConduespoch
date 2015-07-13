/**
 * Created by darioh on 12/07/15.
 */

var modelDocentePeriodoAsignatura = require('../../model/modelGstDocentePeriodoAsignatura.js');

exports.getlistado = function (req, res) {
  modelDocentePeriodoAsignatura.connect();
  modelDocentePeriodoAsignatura.get(req.body, function (datos) {
    res.json(datos);
  });
};
