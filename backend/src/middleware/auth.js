import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) =>{
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({success: false, error: "No token"});
    }
    const token = header.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch {
         res.status(401).json({success: false, error: "Invalid token" });
    }

};

