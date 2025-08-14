const {getUser} = require("../service/auth");


function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies.token;
    req.user = null;

    if(!tokenCookie)
    return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next()
}

function restrictTo(roles = []){
    return function (req,res,next){
        console.log("Roles Allowed", roles);
        console.log("User Object", req.user);
        if(!req.user)
            {
        return res.redirect("/login");
        
        }
         if (!Array.isArray(roles)) roles = [roles]
        {
         console.log(`Role '${req.user.role}' is not allowed`);
        }
        if(!roles.includes(req.user.role))
        {
            return res.end("UnAuthorized Access");
        }
        console.log("CHECK PASSED")

        return next();
            
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}