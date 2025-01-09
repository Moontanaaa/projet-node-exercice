import jwt from 'jsonwebtoken'

export const loginVerification = async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.json({message : 'Please provide an email and a password'})
    }
    next()
}


export const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.json({message : 'Access denied, no token provided'})
    }
    try{
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if(!verify){
            return res.json({message : 'Access denied'})
        }
        req.user = verify
        next()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : 'Invalid signature'})
    }
}