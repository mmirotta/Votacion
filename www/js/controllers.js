angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('PlaylistsCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('LoginCtrl', function($scope, $stateParams, $timeout) {
  $scope.logueado = 'no';
  $scope.verificado = 'no';

  $scope.login = {};
  $scope.login.usuario = "m.mirotta@gmail.com";
  $scope.login.clave = "votacion";

  $scope.Logear = function (){
    firebase.auth().signInWithEmailAndPassword($scope.login.usuario, $scope.login.clave).catch(function (error){

      console.info("Error", error);
    }).then( function(resultado){

      $timeout(function() {
        $scope.logueado = 'si';
        if (resultado.emailVerified == false)
          $scope.verificado = 'si';
        else
          $scope.verificado = 'no';

      });
      console.info("login correcto", resultado);

    });
  };

  $scope.Deslogear = function (){
    firebase.auth().signOut().catch(function (error){
      console.info("login incorrecto", error);
    }).then( function(resultado){
      $timeout(function() {
        $scope.logueado = 'no';
        $scope.usuario = JSON.stringify(resultado);
        //$scope.usuario = JSON.stringify(firebase.auth().currentUser()); Esto es para usarlo en cualquier lado porque firebase esta global
      });
      console.info("deslogueo correcto", resultado);
    });
  };

  $scope.Resetear = function (){
    firebase.auth().sendPasswordResetEmail($scope.login.usuario).then(function(resultado){
      console.info("resertear clave correcto", resultado);
    }).catch(function (error){
      console.info("resertear clave incorrecto", error);
    });
  };

  $scope.VerificarMail = function (){
    firebase.auth().currentUser.sendEmailVerification().then(function(resultado){
      console.info("verifico el usuario correcto", resultado);
    }).catch(function (error){
      console.info("verifico el usuario incorrecto", error);
    });
  };

  $scope.Registrar = function (){
    firebase.auth().createUserWithEmailAndPassword($scope.login.usuario, $scope.login.clave).then(function(resultado){
      $timeout(function() {
        $scope.logueado = 'si';
        if (resultado.emailVerified == false)
          $scope.verificado = 'si';
        else
          $scope.verificado = 'no';

      });
      console.info("registrar el usuario correcto", resultado);
    },function (error){
      if(error.code == "auth/email-already-in-use")
        $scope.errorMensaje = "El email ya esta registrado";

      console.info("registrar el usuario incorrecto", error);
    });
  };

});

