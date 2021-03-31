const mongoose = require('mongoose')

//Se crea la estructura de como va a guardarse el mensaje
const schema = mongoose.Schema

const mySchema = new schema({
    users:[{
        type: schema.ObjectId,
        ref: 'users'
}]
})

const model = mongoose.model('Chat', mySchema)
module.exports = model