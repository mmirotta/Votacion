angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('PlaylistsCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('LoginCtrl', function($scope, $stateParams) {

  $scope.login = {};
  $scope.login.usuario = "m.mirotta@gmail.com";
  $scope.login.clave = "votacion";

  $scope.Logear = function (){
    firebase.auth().signInWithEmailAndPassword($scope.login.usuario, $scope.login.clave).catch(function (error){
      console.info("incorrecto", error);
    }).then( function(resultado){
      console.info("correcto", resultado);
    });
  }
});

