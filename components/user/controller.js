const store = require('./store')

function addUser(user) {
    if(!user){
     return Promise.reject('Invalid name')
    }
    const name = {
        //Con el nombre de esta variable se guardara dentro de la tabla users
        //Ej: _id: ... username: ...
        username: user,
    }
    return store.add(name)
}
const getUsers = () => {
    return new Promise((resolve, reject)=>{
        resolve(store.get())
    })
}

module.exports = {
    addUser,
    getUsers,
}