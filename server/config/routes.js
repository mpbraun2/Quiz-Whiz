//routes send info to controllers
console.log("hitting the routes!");
var users = require("../controllers/backEndController");

module.exports = function (app) {
    //split the routes into three distinct groups (users, quiz, and solutions)
    //these will be the routes for the user (need login, reg, and a get users route)
    app.get('/api/users', users.allusers);
    app.post("/api/users", users.register);
    app.post("/api/login", users.login);

    //add quiz and get quiz (will need get and post)
    app.get('/api/quizzes', users.getquizzes);
    app.post('/api/quizzes', users.addquiz);


    //add solutions and get solutions (will need get and post)
    app.get('/api/solutions', users.getsolutions);
    app.post('/api/solutions', users.addsolution);

}