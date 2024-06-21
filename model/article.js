const mongoose= require ('mongoose')
const schema=mongoose.Schema

const Article= new schema({
    title:{
        type:String,
    },
    content:{
        type:String,
    },
    createdAt: {
      type: Date,
      default: Date.now
  
    }
})

module.exports=mongoose.model('article',Article)