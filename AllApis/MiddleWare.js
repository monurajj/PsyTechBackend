const jwt = require('jsonwebtoken');
const secretKey = "yourSecretKey";

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Add user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { authenticate };
