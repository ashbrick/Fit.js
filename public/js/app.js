const app = angular.module('WorkoutApp', []);

app.controller('MyController', ['$http', function($http){
  this.foo ='bar';
  const controller = this;
  this.loggedInUser = false;

//user can sign up
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
          controller.signupUsername = null; //clears username after sign up
          controller.signupPassword = null; // clears password
      })
  }

// user can login
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
              controller.loginUsername = null; // clears username
              controller.loginPassword = null; // clears password
          }
      })
  }

// user can logout
  this.logout = function(){
      $http({
          url:'/session',
          method:'DELETE'
      }).then(function(){
          controller.loggedInUser = false;
      })
  }

// shows all workouts
  this.getWorkouts = function(){
      $http({
          method: 'GET',
          url: '/workouts',
      }).then(function(response){
          controller.workouts = response.data;
          console.log(response.data)
      });
  }

// allows user to create a new workout
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

  this.getWorkouts(); // refreshes page and adds data without taking user away from page

//  keeps the user logged in on page refresh
  $http({
      method:'GET',
      url:'/session'
  }).then(function(response){
      if(response.data.username){
          controller.loggedInUser = response.data; // saves session for logged in user
      }
  })

}]);
