const router = require('express').Router();

router.get('/',(req,res)=>{
    res.status(200).json('Home')
})

const userRoute = require('./users')

router.use('/users',userRoute)

module.exports = router