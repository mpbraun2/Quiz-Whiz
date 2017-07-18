app.controller("quizController", function ($scope, $location, userFactory, quizFactory, $cookies, $routeParams) { //$route?
  var logincookie = $cookies.get("loggeduserid")
  //if cookie is good to go, proceed
  if (logincookie) {

    quizFactory.getAllQuizzes(function (quizzes) {
      //need to create an empty array where a quiz will be pushed in randomly.
      quizarray = [];
      //is this truly random?
      quizzes.sort(function () { return  Math.round(Math.random())-0.5 });

      //should push three random questions
      quizarray.push(quizzes[0]);
      quizarray.push(quizzes[1]);
      quizarray.push(quizzes[2]);

      $scope.quizzes = quizarray;
    })
    //each correct answer should increase 
    $scope.submitAnswers = function () {
      var answerinfo = $scope.answerInfo;
      var correctanswer = 0;

      //if true, need to increment correctanswer
      for (key in answerinfo) {
        if (answerinfo[key] == true) {

          correctanswer += 1;
        }
      }
      //create the percentages, but avoid the repeating places.
      var percent = ((correctanswer / 3) * 100)
      var cleanpercent = Math.round(percent)

      //variable should take in account user, count, and percent
      var quizsolution = {
        _quizUser: logincookie,
        correctAnswerCount: correctanswer,
        correctAnswerPercent: cleanpercent
      }
      //this is not fully working
      quizFactory.addSolution(quizsolution, function (solutioninfo) {
        $scope.answerInfo = {};
        userFactory.lastSolution = solutioninfo.correctAnswerCount;
        $location.url('/');

      })

    }
  }
  else {
    $location.url('/login');
  }
});
//add controller.
app.controller("quizAddController", function ($scope, $location, userFactory, quizFactory, $cookies, $routeParams) { //$route?
  var logincookie = $cookies.get("loggeduserid")
  if (logincookie) {
    //needs question, and 3 solutions (one true)
    $scope.addQuiz = function () {
      var newQuestion = {
        question: $scope.quizinfo.question,
        correctAnswer: $scope.quizinfo.correctAnswer,
        falseAnswer1: $scope.quizinfo.falseAnswer1,
        falseAnswer2: $scope.quizinfo.falseAnswer2
      }
      //redirect back
      quizFactory.addNewQuiz(newQuestion, function () {
        $scope.quizinfo = {}
        $location.url('/')
      })
    }
  }
  else {
    $location.url('/login');
  }
});