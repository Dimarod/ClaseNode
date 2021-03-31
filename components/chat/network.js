const express = require('express')
//se define el router de express para poder hacer mas operaciones con 
//el servidor
const router = express.Router()
//Traemos nuestro modulo para las respuestas
const response = require('../../network/respuesta')
//Importamos el modulo del controlador
const controller = require('./controller')

router.get('/:userId', (req, res) => {
    //Para filtrar los mensajes en este caso por usuario
    controller.getChats(req.params.userId)

    .then((chats)=>{
        response.success(req, res, chats, 200)
    })
    .catch(()=>{
        response.error(req, res, 'Unexpected Error', 500)
    })

})

router.post('/', (req, res) => {
    controller.addChat(req.body.users)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((e) => {
            response.error(req, res, 'Información incompleta', 400)
        })


})
module.exports = router