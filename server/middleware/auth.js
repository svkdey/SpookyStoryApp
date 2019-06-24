const {User}=require('./../models/user');
const auth=(req,res,next)=>{
    let token=req.cookies.Authentication;
    // console.log(token)
    User.findByToken(token,(err,user)=>{
        //  console.log("at auth", user)
        if(err) throw err;
        if(!user[0]) return res.json({
            error:true
        })
        req.token=token;
        req.user=user[0];
        next();
    })

}

module.exports={auth}