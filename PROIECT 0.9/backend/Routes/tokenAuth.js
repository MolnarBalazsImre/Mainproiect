const jwt = require('jsonwebtoken')

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.send("No token sended")
    
    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if (err) return res.send("Bad authToken"+token)
        req.user = user
        next()
    })
}

module.exports = authenticateToken;