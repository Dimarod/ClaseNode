const express = require('express')
//se define el router de express para poder hacer mas operaciones con 
//el servidor
const router = express.Router()
//Traemos nuestro modulo para las respuestas
const response = require('../../network/respuesta')
//Importamos el modulo del controlador
const controller = require('./controller')

router.get('/', (req, res)=>{
    controller.getUsers()
    .then((users)=>{
        response.success(req, res, users, 200)
    })
    .catch(()=>{
        response.error(req, res, 'Not found', 500)
    })
})
router.post('/', (req, res) => {
    controller.addUser(req.body.user)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch((e) => {
            response.error(req, res, 'No has ingresado un nombre valido', 400)
        })
})
module.exports = router