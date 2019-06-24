const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config = require('./../config/config')

const getConfigParameter = config.get(process.env.NODE_ENV)
const secretpw = getConfigParameter.SECRET;
const SALT=12;
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        
    },
    token:{
        type:String
    }

})



userSchema.pre('save',function(next){
  
    var user=this;
    //   console.log(user)
    // only hash the password if it has been modified (or is new)
    if(user.isModified('password')){
        bcrypt.genSalt(SALT,function(error,salt){
            if(error) return next(error);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(error);
                user.password=hash;
                next();
            })
        })
    }
    else{ return next();}
})
//comparing pW and returning if isMatch else err
userSchema.methods.comparePassword=function(candidatePW,cb){
    bcrypt.compare(candidatePW,this.password,function(err,isMatch){
        if(err) return cb(err);
        else cb(null,isMatch);
    })
}

userSchema.methods.generateToken=function(cb){
    var user=this;
    var token = jwt.sign(user._id.toHexString(), secretpw);
    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err)
        else cb(null,user);
    })

}

// assign a function to the "statics" object of our userSchema
userSchema.statics.findByToken=function(token,cb){
    const user=this;
    jwt.verify(token,secretpw,function(err,decode){
        user.find({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            else cb(null,user);
        })
    })
}

userSchema.methods.deleteToken=function(token,cb){
    var user=this;
    user.update({$unset:{token:1}},function(err,user){
        if(err) return cb(err);
        else cb(null,user);
    })
}

const User = mongoose.model('User', userSchema);
module.exports={User}