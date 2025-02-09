const express = require('express');

const User = require('../models/user.js')

const welcome = (req, res) => {
    // res.send(`Welcome to the party ${req.session.user.username}`)
    res.render('workouts/index.ejs')
}

const welcomeUser = async (req, res) => {
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

const newPlan = (req, res) => {
   res.render('workouts/new.ejs', {
    title: 'Add new workout plan'
   })
}

const postPlan = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        await currentUser.save()
        res.redirect(`/workout-plans/${currentUser._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


module.exports = {
    welcome,
    welcomeUser,
    newPlan,
    postPlan,
}