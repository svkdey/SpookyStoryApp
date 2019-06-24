const config={
    production:{
        //when we deploy to heroku we set the secret,and db is given by HEROKU
        SECRET:process.env.SECRET,
        DATABASE:process.env.MONGODB_URI
    },
    default:{
        SECRET:"wordPASS@123",
        DATABASE:"mongodb://localhost:27017/spookystories"
    }
}

exports.get=function get(env) {
    return config[env]||config.default;
    
}