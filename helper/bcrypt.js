const bcrypt = require('bcryptjs')

const createHashPassword = (password) => bcrypt.hashSync(password)
const compareHashPassword = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = { 
    createHashPassword, 
    compareHashPassword
}