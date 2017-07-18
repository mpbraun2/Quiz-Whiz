app.factory('quizFactory', function ($http) {
  var factory = {};
  var quizzes = [];
//get quizzes (get)
  factory.getAllQuizzes = function (receivedQuizzes) {
    $http.get('/api/quizzes').then(function (response) {
      quizzes = response.data.quizzes;
      receivedQuizzes(quizzes);
    })
  }
//add quiz question (should be post)
  factory.addNewQuiz = function (quizinfo, finishedAddingQuiz) {
    $http.post('/api/quizzes', quizinfo).then(function (response) {
      finishedAddingQuiz();
    })
  }
  //add the solutions (should be post)
  factory.addSolution = function (solutioninfo, finishedAddingSolution) {
    $http.post('/api/solutions', solutioninfo).then(function (response) {
      finishedAddingSolution(solutioninfo);
    })
  }
  //provide the solutions (get)
  factory.getSolutions = function (receivedSolutions) {
    $http.get('/api/solutions').then(function (response) {
      solutions = response.data.solutions;
      receivedSolutions(solutions);
    })
  }

  return factory;
})