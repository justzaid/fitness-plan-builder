const User = require('../models/user.js')

// Welcome page for registered users
const welcomeUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const user = currentUser.username
        res.render('workouts/index.ejs',
            {title: `${user}'s Workout Plans`,
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
        const currentUser = await User.findById(req.session.user)
        const workout = currentUser.workouts.id(req.params.workoutId)
        res.render('workouts/show.ejs', {
            title: `Your ${workout.name}`,
            workout,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Edit individual workout plan - Edit page
const editPlan = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const workout = currentUser.workouts.id(req.params.workoutId)
        res.render('workouts/edit.ejs', {
            title: `Editing your ${workout.name} plan`,
            workout,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Update individual workout plan - Update
const updatePlan = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const workout = currentUser.workouts.id(req.params.workoutId)
        
        workout.set(req.body)
        await currentUser.save()

        res.redirect(`/workout-plans/${currentUser.id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Delete functionality for individual workout plans
const deletePlan = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        currentUser.workouts.id(req.params.workoutId).deleteOne()
        await currentUser.save()
        res.redirect(`/workout-plans/${currentUser._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Exports
module.exports = {
    welcomeUser,
    newPlan,
    postPlan,
    showPlan,
    editPlan,
    deletePlan,
    updatePlan,
}