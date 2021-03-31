const model = require('./model');

//Se prueba si la base de datos conecto correctamente
//Funcion para guardar los mensajes en la base de datos
function addChat(chat) {
    // list.push(message)
    const myChat = new model(chat)
    myChat.save()
}
//Funcion para traer los mensajes guardados en la base de datos
function getChats(userId) {
    return new Promise((resolve, reject) => {
        let filter = {}
        if (userId) {
            filter = {
                users: userId
            }
        }
        model.find(filter)
        .populate('users')
        .exec((error, populated)=>{
            if (error) {
                reject(error)
                return false
            }

            resolve(populated)
        })
    })

}

module.exports = {
    add: addChat,
    get: getChats,
}