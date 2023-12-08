const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY
const signPayloadToToken = (payload) => jwt.sign(payload, secretKey)
const verifyTokenToPayload = (token) => jwt.verify(token, secretKey)

module.exports = { 
    signPayloadToToken, 
    verifyTokenToPayload 
}