const mongoose = require('mongoose')

mongoose.connect(process.env.DB)

mongoose.connect(process.env.DB)
let db = mongoose.connection

db.on('error',console.error.bind(console,"database connect error!"))
db.once('open',() => {
    console.log('database is connect')
})