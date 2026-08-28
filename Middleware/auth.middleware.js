import jwt from "jsonwebtoken";
import { isTokenRevoked } from "../Services/auth.services.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required"
            });
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }

        // Check revoked token
        if (isTokenRevoked(token)) {
            return res.status(401).json({
                message: "Token has been revoked"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        req.token = token;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


export const authorize = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
};
