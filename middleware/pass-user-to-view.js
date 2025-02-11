const passUserToView = (req, res, next) => {
    console.log('pass user: ', req.session)
    res.locals.user = req.session.user ? req.session.user : null
    next()
}

module.exports = passUserToView