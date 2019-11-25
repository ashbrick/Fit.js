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
          controller.loginUsername = null;
          controller.loginPassword = null;
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

// stretch goal: relational db notes
        // right now createWorkout is creating new exercises and adding them to the exercises db (this function SHOULD be creating workout names and adding them to a workouts collection)
        // we need createWorkout to create a workout name and add it to the workouts db with the info for (duration,date and exercises)
        // then we need to create a createExercise() function that creates an exercise and adds it to a list that will populate and attach to the workout id of the workout that's created using createdWorkout()
  this.createWorkout = function(){ //allows user to create a new workout
    $http({
      method:'POST',
      url: '/workouts',
      data: {
        workoutName: this.workoutName,
        duration: this.duration,
        date: this.date,
        exercises: this.exercises,
        sets: this.sets,
        reps: this.reps,
        rest: this.rest
      }
    }).then(function(response){
        controller.getWorkouts();
        controller.workoutName = null;
        controller.duration = null;
        controller.date = null;
        controller.exercises = null;
        controller.sets = null;
        controller.reps = null;
        controller.rest = null;
      console.log(response);
    }, function(){
      console.log('error');
    });
  }

// this function will create exercises that get pushed into a workout
    // this.createExercise = function(){
    //
    // }

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
      workoutName: this.updatedWorkoutName,
      duration: this.updatedDuration,
      exercises: this.updatedExercises,
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

// NAVIGATION
this.includePath = 'partials/navigation.html';

//write a function that will allow us to change what we see based on the path so wecan see different partials (also go back to nav menu in partials and add an ngclick )
this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html';
}

//create a function that hides the partial that you're not actually trying to view


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
