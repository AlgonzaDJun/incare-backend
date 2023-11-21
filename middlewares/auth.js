const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        return res.status(401).json({
            message: "Access Denied",
        });
    }

    const token = header.split("")[1];

    if(!token){
        return res.status(401).json({
            message: "Access Denied",
        });
    }

    try {
        const verified = jwt.verify(token, "treasure");
        req.user = verified;
        next();
    } catch(error) {
        res.status(400).json({
            message: "Invalid Token",
        })
    }
};

module.exports = {
    authToken,
}