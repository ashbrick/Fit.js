const app = angular.module('WorkoutApp', []);

app.controller('MyController', ['$http', function($http){
  this.foo ='bar';
  const controller = this;
  this.loggedInUser = false;

  this.signup = function(){
      $http({
          url:'/users',
          method:'POST',
          data: {
              username: this.signupUsername,
              password: this.signupPassword
          }
      }).then(function(response){
          controller.loggedInUser = response.data;
      })
  }

  this.login = function(){
      $http({
          url:'/session',
          method:'POST',
          data: {
              username: this.loginUsername,
              password: this.loginPassword
          }
      }).then(function(response){
          if(response.data.username){
              controller.loggedInUser = response.data;
          } else {
              controller.loginUsername = null;
              controller.loginPassword = null;
          }
      })
  }

  this.logout = function(){
      $http({
          url:'/session',
          method:'DELETE'
      }).then(function(){
          controller.loggedInUser = false;
      })
  }

  this.getWorkouts = function(){
      $http({
          method: 'GET',
          url: '/workouts',
      }).then(function(response){
          controller.workouts = response.data;
          console.log(response.data)
      });
  }

  this.createWorkout = function(){
    $http({
      method:'POST',
      url: '/workouts',
      data: {
        type: this.type,
        duration: this.duration,
        sets: this.sets,
        reps: this.reps,
        rest: this.rest
      }
    }).then(function(response){
        controller.getWorkouts();
      console.log(response);
    }, function(){
      console.log('error');
    });
  }

  this.getWorkouts();

  $http({
      method:'GET',
      url:'/session'
  }).then(function(response){
      if(response.data.username){
          controller.loggedInUser = response.data;
      }
  })

}]);
