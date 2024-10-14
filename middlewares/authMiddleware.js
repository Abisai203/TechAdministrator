import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
}