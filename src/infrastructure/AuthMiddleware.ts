import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
    user: JwtPayload;
}

const secretKey = process.env.JWT_SECRET_KEY || 'secreto'

async function renewToken(oldToken: string): Promise<string> {
    const decodedToken = jwt.verify(oldToken, secretKey) as JwtPayload;
    const newToken = jwt.sign(decodedToken, secretKey, { expiresIn: '1h' });
    return newToken;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send('Acceso denegado');
        return;
    }

    try {
        const verified: JwtPayload = jwt.verify(token, 'secreto') as JwtPayload;
        (req as AuthRequest).user = verified;

        // Verificar si el token está próximo a expirar
        const expirationTime = (verified.exp || 180) * 1000; // Convertir segundos a milisegundos
        const currentTime = Date.now();
        const timeRemaining = expirationTime - currentTime;
        const threshold = 5 * 60 * 1000; // 5 minutos en milisegundos

        if (timeRemaining < threshold) {
            // Si el token está próximo a expirar, renovarlo en el servidor
            const newToken = await renewToken(token);
            // Enviar el nuevo token en el encabezado de autorización
            res.setHeader('Authorization', `Bearer ${newToken}`);
        }


        next();
    } catch (err) {
        res.status(400).send('Token inválido');
    }
};

const roleMiddleware = (roles: Array<'teacher' | 'student' | 'admin'>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!(req as AuthRequest).user || !roles.includes((req as AuthRequest).user.role)) {
            res.status(403).send('Acceso denegado');
            return;
        }
        next();
    };
};

export { authMiddleware, roleMiddleware };
