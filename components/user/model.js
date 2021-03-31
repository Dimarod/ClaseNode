const mongoose = require('mongoose')

const schema = mongoose.Schema

const mySchema = new schema({
    //El nombre de esta propiedad debe ser el mismo que llames como parametro en la funcion
    // del controlador
    username: String,
})

const model = mongoose.model(/*Esto define como se va a llamar la tabla o coleccion en la base de datos*/'users', mySchema)
module.exports = model