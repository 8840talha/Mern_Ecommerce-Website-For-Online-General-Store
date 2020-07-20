const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.SignUP = (req, res) => {
    console.log(req.body)
    const NewUser = new User(req.body)
    NewUser.save().then(newUser => {

        const token = newUser.getJwtToken()
        return res.status(201).json({
            success: true,
            message: 'User registered Successfully',
            createdUser: newUser,
            token: token
        })

    }).catch(err => {
        if (err.name === "MongoError") return res.status(401).json({ success: false, message: 'Email Already Exists,try a differeent Email' })
        else {
            return res.status(400)
                .json({ error: err, message: 'Network error or some error occured' })
        }
    })
}



exports.SignIN = (req, res) => {
    console.log(req.body)
    if (!req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Please Enter both Email and Password' })
    }

    User.findOne({ email: req.body.email })
        .exec().then(user => {
            if (!user) return res.status(404).json({
                success: false,
                message: 'User not registered'
            })
            console.log(user)
            const token = user.getJwtToken()
            // res
            console.log(token)
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return res.status(401).json({ success: false, message: 'Invalid Credentials' })
                if (result) {
                    return res.status(200)
                        .cookie('tokens', token, { expire: new Date() + 9999 })
                        .json({

                            success: true,
                            message: 'User Logged Successfully',
                            LoggedUser: user,
                            token: token
                        })
                }

                return res.status(401).json({ success: false, message: 'Invalid Credentials' })
            })



        }).catch(err => {
            return res.status(500).json({ success: false, message: 'Error Occured', error: err })
        })


}
exports.SignOut = (req, res) => {
    res.clearCookie('tokens').status(200).json({ message: 'userLogged out' })
}

exports.Signed_In_User = (req, res) => {
    console.log(req.user)
    User.findById(req.user.id).exec().then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'Not Found Signed In User',
                data: user
            })
        }
        res.status(200).json({
            message: 'Found Signed In User',
            data: user
        })
    }).catch(err => {
        res.status(200).json({
            message: 'Error Ocurred',
            error: err
        })
    })

}