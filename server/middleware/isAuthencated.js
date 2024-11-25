import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Not authorized, please login" });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Not authorized, please login" });
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export  default isAuthenticated;