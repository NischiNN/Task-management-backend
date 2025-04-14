// src/services/UserService.ts
import * as jwt from 'jsonwebtoken';
import UserDAO from '../dao/User';
import { Response } from 'express';
import network from '../config/network';
import { Types } from 'mongoose';

const JWT_SECRET = network.JWT_SECRET;
const JWT_EXPIRES_IN = network.JWT_EXPIRATION || '7d';

export default class UserService {
  // Signup
  static async signup(name: string, email: string, password: string) {
    const existingUser = await UserDAO.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await UserDAO.create({ name, email, password });
    console.log(user, name, email, password);
    return user;
  }

  // Login — set JWT in cookie
  static async login(email: string, password: string, res: Response) {
    const user = (await UserDAO.findByEmail(email)) as unknown as {
      id: string;
      name: string;
      email: string;
      password: string;
    } & {
      _id: Types.ObjectId;
    } & { comparePassword: (s: string) => Promise<boolean> };
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const tokenPayload = { userId: user.id };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any,
    });

    // Set token in HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: 'none',
    });

    return { message: 'Login successful', user };
  }

  // Get user by userId
  static async getUser(userId: number) {
    const user = await UserDAO.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
