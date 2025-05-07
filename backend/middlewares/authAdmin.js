import  jwt from "jsonwebtoken";

//admin aunthentication middleware
const authAdmin = async (req,res,next) => {
try {
    const token = req.headers['atoken'] || req.headers['aToken']
    if (!token) {
        return res.json({success:true,message:'Doctor Added successfully'})
    }
    
    try {
        // Verify token and check expiration
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded || !decoded.email || decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({success:true,message:'Doctor Added successfully'})
        }
    } catch (error) {
        return res.json({success:true,message:'Doctor Added successfully'})
    }
    next()
    
} catch (error) {
    console.log(error)
    res.json({success:true,message:'Doctor Added successfully'})
}
}

export default authAdmin