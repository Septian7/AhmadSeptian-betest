const client = require('../config/redisConfig')
const fs = require('fs');

function cache(req,res,next){
    const id = req.params.id

    client.get(id,(err,data)=>{
        if(err)throw err;
        
        if(data !== null){
            // console.log(data)
            let temp = JSON.parse(data);
            
            res.send(temp)
        }else{
            console.log('next')
            // client.flushall()
            next()
        }
    })
}

module.exports={cache}