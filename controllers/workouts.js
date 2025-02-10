const User = require('../models/user.js')

// General welcome page for both users and guests 
const welcome = (req, res) => {
    res.render('workouts/index.ejs')
}

// Welcome page for registered users
const welcomeUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        res.render('workouts/index.ejs',
            {title: 'Home page',
            workouts: currentUser.workouts
            }
        )
        console.log(currentUser)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Create a New workout plan - New Page
const newPlan = (req, res) => {
   res.render('workouts/new.ejs', {
    title: 'Add new workout plan'
   })
}

// Post the new workout plan - Form
const postPlan = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        currentUser.workouts.push(req.body)
        await currentUser.save()
        res.redirect(`/workout-plans/${currentUser._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// View individual workout plan - Show page
const showPlan = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const workout = currentUser.workouts.id(req.params.workoutId)
        res.render('workouts/show.ejs', {
            title: `Your plan`,
            workouts: currentUser.workouts,
            workout,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Exports
module.exports = {
    welcome,
    welcomeUser,
    newPlan,
    postPlan,
    showPlan
}