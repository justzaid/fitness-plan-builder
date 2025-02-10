const User = require('../models/user')

// View page for community
const home = async (req, res) => {
    try {
        const currentUser = await User.find()
        res.render('community/index.ejs', {
            title: 'Community page',
            currentUser,
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
        const workout = currentUser.workouts
        const user = currentUser.username
        res.render('community/show.ejs', {
            title: 'User Page',
            workout,
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