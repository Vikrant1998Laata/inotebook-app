var jwt = require('jsonwebtoken');
const JWT_SECRET = 'vikrantisagood$boy'

const fetchuser = (req,res,next)=>{
    // Get the user from jwt token and add id to request object
   
        const token = req.header('auth-token') // Bringing token from header/ We are givinng the header the name by ourself but this should be different
    
        if(!token){
            res.status(401).send({error: "Please authenticate using a valid token"});
        }
   

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser