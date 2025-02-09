const welcome = (req, res) => {
    // res.send(`Welcome to the party ${req.session.user.username}`)
    res.render('registered/index.ejs')
}


module.exports = {
    welcome
}