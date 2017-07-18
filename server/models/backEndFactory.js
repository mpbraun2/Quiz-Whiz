console.log("hitting the backEndFactory");
//require mongoose, bcryptjs, perform validations (users/quizzes) here
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs")
//username/email/password validations should be enough for user.
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 30,
        trim: true
    },


    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        validate: {
            validator: function (value) {
                //validator will allow s@s.co
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: "The Email provided does not match the registered pattern of string@string.string, please try again!"
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        //should this help with extended hashing?
        maxlength: 64,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
            },
            message: "The Password provided does not meet requirements, you must have at least 1 number, uppercase letter and special character"
        },

    }

}, { timestamps: true });


//validations for the quiz, should include questions, and 3 answers (two false)
var quizSchema = mongoose.Schema({
    question: {
        type: String,
        //per wireframe, needs to be at least 15 characters.
        minlength: 15,
        maxlength: 500,
        required: true
        //should this need to be unique?
    },
    //min length can be 1 if it is a letter answer or number as a string (MAKE SURE REQUIRED)
    correctAnswer: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true,
    },
    falseAnswer1: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true,
    },
    falseAnswer2: {
        type: String,
        minlength: 1,
        maxlength: 250,
        required: true,
    }
}, { timestamps: true });



//need validations for the answer count/percentage to work. change the schema?
var quizTakenSchema = mongoose.Schema({
    _quizUser: {
        type: String,
        ref: 'User',
        required: true
    },
    correctAnswerCount: {
        //shouldn't be string
        type: Number,
        min: 0,
        max: 3,
        required: true,
    },
    //can only be 0%, 33%, 66%, or 100%. Min of 0, max of 100?
    correctAnswerPercent: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
    }
}, { timestamps: true })

//hash the user's password (ensure bcryptjs is installed!)
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}
// checking if password is correct with what is entered in login.
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function (done) {
    this.password = this.generateHash(this.password);
    done();
})

//require the users, quiz, and solutions schemas again.
mongoose.model('User', userSchema);
mongoose.model('Quiz', quizSchema);
mongoose.model('Solution', quizTakenSchema);