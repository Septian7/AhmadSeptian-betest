const userRoute = require('express').Router()
const userController = require('../controllers/userController')
const { author,authen } = require("../middlewares/auth");
const { cache }= require('../middlewares/redis_AhmadSeptian_betest')


userRoute.get('/',userController.show)
userRoute.get('/:id/accountNumber',cache,userController.byAccNum)
userRoute.get('/:id/identityNumber',cache,userController.ByidNum)
userRoute.post('/create',userController.create)
userRoute.post('/getToken',userController.getToken)
userRoute.put('/update/:id',authen,author,userController.update)
userRoute.delete('/delete/:id',authen,author,userController.delete)


module.exports = userRoute