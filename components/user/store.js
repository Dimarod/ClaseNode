const list = []

const model = require('./model');

function addUser(username) {
    const myUser = new model(username)
    return myUser.save()
}
const getUsers= async ()=> {
    const users = await model.find()
    return users
}



module.exports = {
    add: addUser,
    get: getUsers,
}