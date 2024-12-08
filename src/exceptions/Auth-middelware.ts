import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['token'];

    if (token) {
      try {
        // Verify token
        this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

        // Attach token to the authorization header if request is from Swagger
        if (req.headers['user-agent']?.includes('Swagger')) {
          req.headers['authorization'] = `Bearer ${token}`;
        }

        next();
      } catch (err) {
        // Token is invalid or expired
        res.clearCookie('token');
        res.status(401).send({ message: 'Unauthorized' });
      }
    } else {
      // No token provided
      res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
