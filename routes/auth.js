const express = require('express')
const router = express.Router()
const { SignUP, SignIN, SignOut, Signed_In_User } = require('../controllers/auth')
const auth = require('../middleware/auth')
const { RoleAccess } = require('../middleware/RoleAccess')

router.get('/logout', SignOut)
router.post('/signup', SignUP)
router.post('/signin', SignIN)
router.get('/getMe', auth, Signed_In_User)












module.exports = router


