const express = require('express')
//se define el router de express para poder hacer mas operaciones con 
//el servidor
const router = express.Router()
//Traemos nuestro modulo para las respuestas
const response = require('../../network/respuesta')
//Importamos el modulo del controlador
const controller = require('./controller')
//Con multer podremos subir ficheros o archivos a node js hay que instalarlo
const multer = require('multer')
const { createBrotliCompress } = require('zlib')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/files/',)
    },
    filename: (req, file, cb)=>{
        const [name, extension]=
        file.originalname.split('.')
        cb(null , `${name}-${Date.now()}.${extension}`)
    }
})
const upload= multer({
    storage: storage
})

router.get('/', (req, res) => {
    //Para filtrar los mensajes en este caso por id de chat o por usuario
    const filterUsers = req.query.user || null
    controller.getMessages(filterUsers)

    .then((messageList)=>{
        response.success(req, res, messageList, 200)
    })
    .catch(()=>{
        response.error(req, res, 'Unexpected Error', 500)
    })

})

router.post('/', upload.single('file'), (req, res) => {
    //Para crear nuestras cabeceras
    // res.header({'custom-header':'Nuestro header'})
    //Para traer las cabeceras
    // console.log(req.headers);
    //Para recoger el query y no solo el body
    // console.log(req.query);
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 200)
        })
        .catch((e) => {
            response.error(req, res, 'Información incompleta', 400)
        })
    //El body siempre se encuentra en la request
    // console.log(req.body);
    // res.status(201).send({error: '', body: 'Creado correctamente'})


})
//Mandamos el id del mensaje que queremos cambiar desde la peticion patch
router.patch('/:id', (req, res)=>{
    controller.updateMessage(req.params.id, req.body.message)
    .then((data)=>{
        response.success(req, res, data, 200)
    })
    .catch(()=>{
        response.error(req, res, 'Error interno', 500)
    })
})
router.delete('/:id', (req, res)=>{
    controller.deleteMessage(req.params.id, req.body.message)
    .then(()=>{
        response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200)
    })
    .catch(()=>{
        response.error(req, res, 'Error interno', 500)
    })
})
module.exports = router