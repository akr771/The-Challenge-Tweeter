const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akram:akramakr@cluster0.hwa3hi8.mongodb.net/')
.then (console.log('DB is connected'))
.catch(err=>console.log(err))