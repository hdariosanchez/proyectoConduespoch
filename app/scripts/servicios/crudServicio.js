/**
 * Created by darioh on 12/07/15.
 */

proyectoConduespochEpApp.factory('crudTodo', function ($http) {
  //var STORAGE_ID = 'todos-angularjs';

  return {
    get: function (urlController) { // Funcion para obtener listado de todos los datos.
      var url = urlController;  //Asigno url desde el controlador para realizar el proceso del crud en funcion del modelo a utilizar.
      return $http.get(url);    // regreso el resultado para realizar una "promise" para obtener datos por success or error.
    },

    getFiltrado: function (urlController, todo) {
      var url = urlController;
      console.log('dentro del servijsdjf'+todo);
      return $http.post(url, todo);
    },

    create: function (urlController, todo) {
      var url = urlController;
      return $http.post(url, todo);
    },

    update: function (urlController, todo) {
      var url = urlController + todo.id;
      return $http.put(url, todo);
    },

    delete: function(urlController, id) {
      var url = urlController + id;
      return $http.delete(url);
    }
  };
});
