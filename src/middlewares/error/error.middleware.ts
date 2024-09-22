import { Injectable, NestMiddleware } from '@nestjs/common';
import { error } from 'console';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }

  handleError(err: { message: string; }, req: Request, res: Response) {
    error(err);
    res.status(500).json({
      error: err.message
    });
  }
}
