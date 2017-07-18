//use login from Slack project
app.controller("loginController", function ($scope, $location, userFactory, quizFactory, $cookies, $routeParams) {
  $scope.register = function () {
    if ($scope.registerUser.password == $scope.registerUser.confirm) {
      userFactory.register($scope.registerUser, function () {
        if (userFactory.user) {
          $cookies.put('loggeduserid', userFactory.user.id);
          $cookies.put('loggedusername', userFactory.user.username);
          var favcookie = $cookies.get('loggedusername')
          var othercookie = $cookies.get("loggeduserid")
          $location.url('/')

        }
        else {
          $scope.errors = userFactory.errors;
        }
      })
    }
  }
  $scope.login = function () {

    userFactory.login($scope.logininfo, function () {
      if (userFactory.user) {
        $cookies.put('loggeduserid', userFactory.user.id);
        $cookies.put('loggedusername', userFactory.user.username);

        $location.url('/')
      }
      else {
        $scope.errors = userFactory.errors;
      }
    })
  }
})

app.controller("homeController", function ($scope, $location, userFactory, quizFactory, $cookies, $routeParams) {
  var logincookie = $cookies.get("loggeduserid")

  if (logincookie) {
//try and pull the last solution for the user.
    if (userFactory.lastSolution) {
      $scope.lastSolution = userFactory.lastSolution
    }
    else {
      console.log("Need to take quiz to generate a solution")
    }
//should keep logged user name and id.
    var id = $cookies.get("loggeduserid")
    var name = $cookies.get("loggedusername")
    $scope.user = { id: id, username: name }

    quizFactory.getSolutions(function (solutions) {
      $scope.solutions = solutions;
    })
//direct to playquiz
    $scope.playQuiz = function () {
      $location.url('/playquiz');
    }
//basic logout
    $scope.logout = function () {
      $cookies.remove("loggeduserid")
      $cookies.remove("loggedusername")
      $location.url("/login")

    }
//have a redirect to login if all else fails.
  } else {
    $location.url("/login")
  }
})
