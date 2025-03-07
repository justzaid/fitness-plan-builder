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

// Define a list of allowed user IDs (these are the users you want to show in the community)
const allowedUserIds = ['67a9b32365815a7e78ee08e9', '67acf319810d2e2c704a8927', '67acf41e810d2e2c704a8952'];  // Replace these with actual user IDs

const allowedUsers = async (req, res) => {
    try {
        // Fetch only the users from the allowedUserIds list and populate their workouts (if any)
        const currentUser = await User.find({ _id: { $in: allowedUserIds } }).populate('workouts');

        // Check if the user is logged in via session
        const isLogged = req.session.user ? true : false;

        // Render the community index page with filtered users
        res.render('community/index.ejs', {
            title: 'Community',
            currentUser,
            isLogged,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

module.exports = {
    home,
    viewUser,
    allowedUsers,
}