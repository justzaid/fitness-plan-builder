const isSignedIn = (req, res, next) => {
    if(req.session.user) return next()    
    red.redirect('/auth/sign-in')
}

module.exports = isSignedIn