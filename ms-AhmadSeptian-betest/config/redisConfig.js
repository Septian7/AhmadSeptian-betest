const redis = require('redis')
const REDIS_PORT = process.env.RPORT||6379;

const client = redis.createClient(REDIS_PORT)

module.exports=client