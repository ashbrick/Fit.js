const app = angular.module('WorkoutApp', []);

app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.loggedInUser = false;

  this.indexOfEditFormToShow = null;
  // ----------------------------
  // LOGIN FORM FUNCTIONS
  // ----------------------------

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

  // ----------------------------
  // MAIN INDEX PAGE FUNCTIONS
  // ----------------------------



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

  //This function will delete a workout
this.deleteWorkout = function(workout){
    $http({
      method: 'DELETE',
      url: '/workouts/' + workout._id
    }).then(
      function(response){
          controller.getWorkouts();
      },
      function(error){
      }
  );
}

//This function will edit a workout
this.editWorkout = function(todo){
  $http({
    method: 'PUT',
    url: '/workouts/' + todo._id,
    data: {
      type: this.updatedType,
      duration: this.updatedDuration,
      sets: this.updatedSets,
      reps: this.updatedReps,
      rest: this.updatedRest
    }
  }).then(
    function(response){
      controller.getWorkouts();
      controller.indexOfEditFormToShow = null;
    },
    function(error){
    }
  );
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
