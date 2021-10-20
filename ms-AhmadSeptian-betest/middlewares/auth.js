const {tokenVerifier} = require('../helpers/jwt')
const {User} = require('../models')

function authen(req,res,next){
    let access_token = req.headers.access_token;

    if(access_token){
        try{
            const decoded = tokenVerifier(access_token)
            req.UserData = decoded
            next()
        }catch(err){
            res.status(401).json({
                message:'User data is not authenticated'
            })
        }
    }else{
        res.status(404).json({
            message:"Token not found!"
        })
    }
}

function author(req,res,next){
    console.log(req.UserData)
    console.log(req.UserData.accountNumber)
    const id = +req.UserData.accountNumber;
    const uid = +req.params.id;
    console.log(id,uid)
    User.findOne({accountNumber:uid})
    .then(User => {
        if (!User) {
            res.status(404).json({
                message: "Cart not found"
            })
        } else if (User.accountNumber !== id) {
            res.status(401).json({
                message: "User is not authorized"
            })
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })

}


module.exports = {
    authen,author
}