const jwt = require('jsonwebtoken')
const secretCode = process.env.SECRET_CODE;

const tokenGenerator = (user) =>{
    const {userName,accountNumber,emailAddress,identityNumber} =user
    let token = jwt.sign({
        userName,accountNumber,emailAddress,identityNumber
    },secretCode)
    return token
}

const tokenVerifier = token =>{
    let decoded = jwt.verify(token,secretCode)
    return decoded
}

module.exports = {
    tokenGenerator,
    tokenVerifier
}