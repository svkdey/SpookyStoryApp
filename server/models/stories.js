const mongoose=require('mongoose');


const storiesSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    author:{
         type:String,
        required:true
    },
    ownderId:{
        type:String,
        required:true
    }
},{timestamps:true})
//making model into database

const Story = mongoose.model('Story', storiesSchema);
//exporting models
module.exports={Story}