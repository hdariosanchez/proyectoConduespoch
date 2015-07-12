'use strict';

angular.module('proyectoConduespochEpApp')
  .controller('DocenteCtrl', function ($scope, $http, $cookieStore) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    var mobileView = 992;

    $scope.getWidth = function() {
      return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
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

    $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
      $scope.$apply();
    };

  });
