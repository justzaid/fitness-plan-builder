// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

const port = process.env.PORT ? process.env.PORT : '3000'

// Creates a connection in MongoDB Database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('hello')
    console.log(`Connected to MongoDB Database ${mongoose.connection.name}`)
})


// Controllers
const pagesCtrl = require('./controllers/pages')
const authCtrl = require('./controllers/auth')
const workoutCtrl = require('./controllers/workouts')
const communityCtrl = require('./controllers/community')

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 7 * 24 * 60 * 60 // 1 week in seconds
    }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        httpOnly: true,
        secure: false,
    }
}))
app.use(passUserToView)

// Landing
app.get('/', pagesCtrl.home)

// Route handler for community page
// app.get('/community', communityCtrl.home)
app.get('/community', communityCtrl.allowedUsers)
app.get('/community/:userId/view', communityCtrl.viewUser)

// Route handlers for authentication
app.get('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-up', authCtrl.addUser)
app.get('/auth/sign-in', authCtrl.signInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.get('/auth/sign-out', authCtrl.signOut)

// User must be signed in to access below routes
app.use(isSignedIn);

// Route handlers for Registered users performing CRUD
app.get('/workout-plans/:userId', workoutCtrl.welcomeUser) // User personal plan page
app.get('/workout-plans/:userId/new-plan', workoutCtrl.newPlan) // User new plan page
app.post('/workout-plans/:userId', workoutCtrl.postPlan) // User post plan
app.get('/workout-plans/:userId/view/:workoutId', workoutCtrl.showPlan) // User view individual plan
app.get('/workout-plans/:userId/edit/:workoutId', workoutCtrl.editPlan) // User edit plan
app.post('/workout-plans/:userId/update/:workoutId', workoutCtrl.updatePlan) // User update plan
app.get('/workout-plans/:userId/delete/:workoutId', workoutCtrl.deletePlan) // User delete plan




app.listen(port, () => {
    console.log(`The express app is ready on port ${port}`)
})


