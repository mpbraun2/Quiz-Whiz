//should contain login and reg for users.

app.factory("userFactory", function ($http) {
  var factory = {};
  factory.user = null;
  factory.errors = [];
  factory.lastSolution = null;
//register factory
  factory.register = function (user, finishedAddingUser) {
    $http.post('/api/users', user).then(function (response) {
      if (response.data.errors) {
        factory.errors.push(response.data.errors)
      }
      else {
        factory.user = {
          id: response.data.user._id,
          username: response.data.user.username
        }
      }
      finishedAddingUser();
    })
  }
//login factory
  factory.login = function (logger, finishedLoggingUser) {
    $http.post('/api/login', logger).then(function (response) {
      if (response.data.errors) {
        factory.errors.push(response.data.errors)
      }
      else {
        factory.user = {
          id: response.data.id,
          username: response.data.username
        }
      }
      finishedLoggingUser();
    })
  }
  factory.allUsers = function (finishedGettingUsers) {
    $http.get('/api/users').then(function (response) {
      var users = response.data.users;
      finishedGettingUsers(users);
    })
  }
  return factory;
})