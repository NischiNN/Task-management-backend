// src/middleware/auth.ts
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import network from '../config/network';

const JWT_SECRET = network.JWT_SECRET

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req['userId'] = payload.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
