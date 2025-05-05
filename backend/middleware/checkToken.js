import jwt from 'jsonwebtoken'
const JWT_SECRET = 'Batch10-12SocialApp'

const checkToken = (req , res , next)=>{
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({msg:"unauthorized"})
        }
        try {
            let decoded = jwt.verify(token , JWT_SECRET)  //{_id};
            req.user = decoded  //{_id}
            next()

        } catch (error) {
            res.status(500).json({msg:error.message})
        }
}

export default checkToken

// let obj = {
//     name:"hell"
// }

// obj.class = 'B'