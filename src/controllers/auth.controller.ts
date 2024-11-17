import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/database';
import { config } from '@/config';
import { ApiError } from '@/utils/ApiError';
import { LoginSchema, RegisterSchema } from '@/schemas/auth.schema';
import { User } from '@/database/types';

export class AuthController {
  public register = async (
    req: Request<object, object, RegisterSchema>,
    res: Response,
  ): Promise<void> => {
    const { email, password } = req.body;

    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      throw new ApiError(400, 'Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db
      .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
      .run(email, hashedPassword);

    const token = jwt.sign({ userId: result.lastInsertRowid }, config.jwtSecret, {
      expiresIn: '24h',
    });

    res.status(201).json({
      status: 'success',
      data: {
        token,
      },
    });
  };

  public login = async (
    req: Request<object, object, LoginSchema>,
    res: Response,
  ): Promise<void> => {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: '24h',
    });

    res.json({
      status: 'success',
      data: {
        token,
      },
    });
  };
}
