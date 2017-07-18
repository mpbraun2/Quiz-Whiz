//Server Controller that does requests for quizzes, users, and solutions.
console.log("hitting the controllers");
//make sure to require all mongoose models and mongoose itself.(quiz, user, and solutions)
var mongoose = require("mongoose");
var Quiz = mongoose.model("Quiz");
var User = mongoose.model("User");
var Solution = mongoose.model("Solution");

//find all users
module.exports.allusers = function (request, response) {
  //.\mongo search should be User.find({}) to find all users in user collection. Response is ALWAYS JSON.
  User.find({}).then(function (users) {
    response.json({ users: users })
  }).catch(function (err) {
    console.log(err)
  })
}

//login to check that emails and passwords are good, not validation like backEndFactory.
module.exports.login = function (request, response) {
  //will pull the next email with this email match (which needs to be unique, make sure to check)
  User.findOne({ email: request.body.email }, function (err, user) {
    //if there are any errors, return them as json objects
    if (err) {
      console.log(err)
      response.json({ errors: err });
    }
    //if there are no errors and the password is good, json response user id and username. Should allow push forward.
    else if (user.validPassword(request.body.password) && user) {
      response.json({
        id: user._id,
        username: user.username
      });
    }
    //if there are no errors and the password is WRONG, json response with an error/message
    else if (!user.validPassword(request.body.password) && user) {
      response.json({
        errors: {
          login: {
            //pass through a full message
            message: "Password does not match database."
          }
        },

      })
    }
    //dont forget to create a test case if the email isn't in the database yet!
    else {
      response.json({
        errors: {
          login: {
            //pass through a full message
            message: "Email was not found in database, please register for use of site."
          }
        }
      })
    }
  })
}
//user being saved through registration
module.exports.register = function (request, response) {
  var user = new User(request.body);
  user.save(function (err) {
    //BUT if there are errors, return errors
    if (err) {
      response.json({ errors: err })
      console.log(err);
    } else {
      response.json({ message: "User was successfully registered!", user: user });
    }
  });
}
//pulls all of the quizzes.
module.exports.getquizzes = function (request, response) {
  Quiz.find({}).then(function (quizzes) {
    response.json({ quizzes: quizzes })
  }).catch(function (err) {
    console.log(err);
  })
}

//quiz being registered
module.exports.addquiz = function (request, response) {
  var quiz = new Quiz(request.body);
  quiz.save(function (err, newquiz) {
    //BUT if there are errors, return the errors, do not allow for creation
    if (err) {
      console.log(err);
    }
    else {
      //else create the quiz.
      response.json({ newquiz: newquiz })
      console.log(response)
    }
  })
}

//creates the solutions (both correct and false.)
module.exports.addsolution = function (request, response) {
  var solution = new Solution(request.body);
  solution.save(function (err, newsolution) {
    //if errors do not allow for soltuion
    if (err) {
      console.log(err);
    }
    //else create the quiz
    else {
      response.json({ newsolution: newsolution });
      console.log("CREATED A NEW SOLUTION (SUCCESS)")
    }
  })
}
//make sure to put the quiz user with the solution. More efficient per 6/22 talk with Vanessa (MEAN WALL)
module.exports.getsolutions = function (request, response) {
  Solution.find({}).populate('_quizUser').then(function (solutions) {
    response.json({ solutions: solutions });
  }).catch(function (err) {
    console.log(err);
  })
}