const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    daysPerWeek: {
        type: Number,
        required: true,
    },
    timePerWorkout: {
        type: Number,
        required: true,
    },
    equipmentRequired: {
        type: String,
        required: true,
    },
    descritpion: {
        type: String,
        required: true,
    }

})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    workouts: [workoutSchema]
},{timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User