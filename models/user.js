const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name'],
        maxlength: 32
    },
    email: {
        type: String,
        unique: true,
        required: [true, ' Please add an email'],
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            'Please add a Valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please Add a Password'],
        minlength: 6
    },
    role: {
        type: String,
        required: [true, 'Please Add a role'],
        default: 'customer'
    },
    about: {
        type: String,
        trim: true
    },
    history: {
        type: Array,
        default: []
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,


}, { timestamps: true })


// A pre save middle ware for hashing passwords
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.getJwtToken = function () {
    const token = jwt.sign({
        email: this.email,
        userId: this._id,
        role:this.role
    }, process.env.SECRET
        , {
            expiresIn: "1h"
        }
    )
    return token;
}




module.exports = mongoose.model('User', UserSchema);