const jwt=require('jsonwebtoken');
const JWT_SECRET='Harryisagoodb$oy';
const fetchusers=(req,res,next)=>{
    //get the user from the jwt tokenand add id to req obj
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"plz authenticate the valid token"})
    }
    try {
        const data=jwt.verify(token , JWT_SECRET);
        req.users=data.users;
        next();
        
    } catch (error) {
        res.status(401).send({error:"plz authenticate the valid token"})
        
    }

}
module.exports=fetchusers;