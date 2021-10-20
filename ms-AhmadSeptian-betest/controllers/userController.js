const { tokenGenerator } = require('../helpers/jwt');
const {User} = require('../models')
const client = require('../config/redisConfig')


class userController{
    static async create(req,res){
        try{
            let accNum= await User.find();
            let an=0;
            if(accNum.length===0) {
                an=1
            }else{
            let ant = accNum.map(an=>{
                return an
            })
            an = ant[ant.length-1].accountNumber+1
            }
            console.log
            const userPost = new User({
                userName:req.body.userName,
                accountNumber:an,
                emailAddress : req.body.emailAddress,
                identityNumber : +req.body.identityNumber
            })

            let users = await userPost.save()
            client.flushall()
            res.status(201).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    static async show(req,res){
        try{
            let users = await User.find()
            
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    static async byAccNum(req,res){
        try{
            const id = req.params.id
            let users = await User.findOne({accountNumber:+id})

            const redisValue = JSON.stringify(users,null,3);

            client.set(id,redisValue)
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    static async ByidNum(req,res){
        try{
            const id = +req.params.id
            let users = await User.find({identityNumber:id})
            const redisValue = JSON.stringify(users,null,3);

            client.set(id,redisValue)
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    static async update(req,res){
        try{
            let users = await User.updateOne({accountNumber:req.params.id},{
                userName:req.body.userName,
                emailAddress : req.body.emailAddress,
                identityNumber : +req.body.identityNumber
            });
            res.status(200).json(users)
            client.flushall()
            res.status(200).json({message:"oke"})

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async delete(req,res){
        try{
            let id = +req.params.id
            let users = await User.deleteOne({accountNumber:id});
            client.flushall()
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    static async getToken(req,res){
        try{
            const {userName} = req.body
            let users = await User.findOne({userName})
            let access_token = tokenGenerator(users)
            res.status(200).json(access_token)
        }catch(err){
            res.status(500).json(err)
        }
    }

}

module.exports =userController;