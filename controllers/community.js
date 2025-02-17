const User = require('../models/user')

// View page for community
const home = async (req, res) => {
    try {
        const currentUser = await User.find()
        const isLogged = await User.findById(req.session.user)
        res.render('community/index.ejs', {
            title: 'Community',
            currentUser,
            isLogged,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Show page for users in community 
const viewUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const workouts = currentUser.workouts
        const user = await User.findById(req.session.user)
        res.render('community/show.ejs', {
            title: 'User Workouts',
            currentUser,
            workouts,
            user,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


module.exports = {
    home,
    viewUser,
}