const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },lastName: {
        type: String,
        required: false,
        trim: true,
    }, email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // unique: true,
        validate(value){
            if( !validator.isEmail(value) ){ 
            throw new Error('Email is invalid')}
        }
    }, password: {
        type: String,
        required: true,
        trim: true,
    }, isAuthor:{
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// https://alexanderzeitler.com/articles/mongoose-tojson-toobject-transform-with-subdocuments/
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
  
// Create an Authorization token for the User
userSchema.methods.generateAuthToken = async function () {
const user = this;
const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '3 days'
});
user.tokens = user.tokens.concat({ token });
await user.save();
return token;
};

// Find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
const user = await User.findOne({ email });
if (!user) {
    throw new Error('Unable to log in.');
}
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    throw new Error('Unable to login.');
}
return user;
};

// This mongoose middleware will hash our user's passwords 
// whenever a user is created or a user password is updated.
userSchema.pre('save', async function (next) {
const user = this;
if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 12);
}
next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;