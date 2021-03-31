const list = []
//Se crea la conexion a la base de datos

const model = require('./model');

//Se prueba si la base de datos conecto correctamente
//Funcion para guardar los mensajes en la base de datos
function addMessage(message) {
    // list.push(message)
    const myMessage = new model(message)
    myMessage.save()
}
//Funcion para traer los mensajes guardados en la base de datos
async function getMessage(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {}
        if (filterUser !== null) {
            filter = {
                user: filterUser,
            }
        }
        model.find(filter)
        .populate('user')
        .exec((error, populated)=>{
            if (error) {
                reject(error)
                return false
            }

            resolve(populated)
        })
    })

}
async function updateText(id, message) {
    const mssg = await model.findOne({
        _id: id
    })
    mssg.message = message
    const newMessage = await mssg.save()
    return newMessage
}

function deleteMessage(id) {
    return model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessage,
    list: getMessage,
    update: updateText,
    remove: deleteMessage
}