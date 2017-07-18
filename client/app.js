var app = angular.module("myApp", ["ngRoute", "ngMessages", "ngCookies"]);

//should be route provider.
app.config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "/partials/login.html",
      controller: "loginController",
    })
    .when("/", {
      templateUrl: "/partials/home.html",
      controller: "homeController",
    })
    .when('/addquiz', {
      templateUrl: '/partials/addquiz.html',
      controller: 'quizAddController',
    })
    .when('/playquiz', {
      templateUrl: '/partials/playquiz.html',
      controller: 'quizController',
    })
    .otherwise("/");
})