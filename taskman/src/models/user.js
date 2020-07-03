const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
// const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        },
        default: 0
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid.')
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: 7,
        validate(value){
            if (validator.contains(value.toLowerCase(), 'password')){
                throw new Error('Password must not contain "password".')
            }
        },
        trim: true,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'udemytask',
    localField: '_id',
    foreignField: 'owner'
})

// This method 'toJSON' is running even though we don't explicitly calling it
userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password 
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
// Has the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this 

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user task when user is removed
userSchema.pre('remove', async function (next) {
    const user = this 
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('udemyuser', userSchema)

module.exports = User