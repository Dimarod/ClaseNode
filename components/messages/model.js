const mongoose = require('mongoose')

//Se crea la estructura de como va a guardarse el mensaje
const schema = mongoose.Schema

const mySchema = new schema({
    chat:{
        type: schema.ObjectId,
        ref: 'Chat'
    },
    user: {
        type: schema.ObjectId,
        //Esto tiene que concordar con como nombramos a la tabla de usuarios en el model.js
        //de user
        ref: 'users',
    },
    message: {
        type: String,
        required: true
    },
    date: Date,
    file: String,
})

const model = mongoose.model('Message', mySchema)
module.exports = model