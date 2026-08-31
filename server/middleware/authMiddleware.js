const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        console.log("Authorization Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("Extracted Token:", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded Token:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT Verify Error:", error);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
};

const optionalAuth = (req , res , next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            req.user = null;
            return next();
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch(error){
        req.user = null;
        next();
    }
};


module.exports = protect;
module.exports.optionalAuth = optionalAuth;