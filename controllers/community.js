const User = require('../models/user')

// View page for community
const home = async (req, res) => {
    try {
        const CurrentUser = await User.find()
        res.render('community/index.ejs', {
            title: 'Community page',
            CurrentUser,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

// Show page for users in community 

module.exports = {
    home,
}