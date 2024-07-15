import jwt from "jsonwebtoken"

export const getAuthenticatedUser = async (req,res,next) =>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({message : "Please Login first"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded){
            return res.status(400).json({message : "Invalid Token Provided"})
        }

        req.id = decoded.userId;
        next()

    } catch (error) {
        console.log("problem is in middleware ",error)
    }
}