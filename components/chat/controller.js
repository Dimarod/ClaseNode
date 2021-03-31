const store = require('./store')

function addChat(users) {
    return new Promise((resolve, reject) => {
        if (!users || !Array.isArray(users)) {
            return Promise.reject('invalid user list')
            
        }
        const chat = {
            users: users,
        }
        resolve(store.add(chat));
        
        
    })


    
}

function getChats(userId) {
    return new Promise((resolve, reject)=>{
        resolve(store.get(userId))
    })
    
}

module.exports = {
    getChats,
    addChat,
}