const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ayushi:Raavi%403012@cluster0.mhvy5jc.mongodb.net/BusinessCards',{connectTimeoutMS: 30000,})


const cardSchema = mongoose.Schema({
    name : String,
    description : String,
    interest: [
        String
    ],
    linkedin : String,
    twitter : String

})
const card = mongoose.model('cards', cardSchema)

module.exports = card
