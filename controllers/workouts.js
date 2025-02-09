const express = require('express')
const router = express.Router();

const User = require('../models/user.js')

const userIndex = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        res.render('workouts/index.ejs',
            {title: 'Home page'}
        )
        console.log(currentUser)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports = {
    router,
    userIndex,
}