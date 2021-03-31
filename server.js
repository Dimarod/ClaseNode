const express = require('express')
const app = express()
const server = require('http').Server(app)

const config = require('./config')
const cors = require('cors')
const db = require('./dbconect')
// const router = require('./components/messages/network')
const router = require('./network/routes')

//recibir informacion del cliente
const bodyParser = require('body-parser')
const socket = require('./socket')

db(config.dbUrl)


app.use(cors())

//Añadimos para poder usar el body-parser segun la extension que necesitemos
//en este caso .json
app.use(bodyParser.json())
// app.use(router);
router(app)
socket.connect(server)



//Para devolver un texto x
// app.use('/', (req, res)=>{
//     res.send('Hola')
// })

app.use('/app', express.static('public'))

server.listen(3000,()=>{
    console.log('La app esta funcionando en el http://localhost:3000');
})
console.log('La app está escuchando en el puerto 3000');