import { NextFunction, Response } from 'express';
import { RequestContext } from '../util/request-context.type';
import { blogService } from '../baseblocks/blog/blog.service';
import { StatusCodes } from 'http-status-codes';

interface MiddlewareFn {
  (req: RequestContext, res: Response, next: NextFunction): Promise<void>;
}

export const or =
  (...middlewares: MiddlewareFn[]) =>
  async (req: RequestContext, res: Response, next: NextFunction) => {
    for (const middleware of middlewares) {
      try {
        await new Promise((resolve, reject) => {
          middleware(req, res, (err: any) =>
            err ? reject(err) : resolve(true),
          );
        });
        return next(); // If any middleware passes, continue
      } catch (error) {
        // Continue to next middleware
      }
    }
    // All middlewares failed
    res.status(StatusCodes.FORBIDDEN);
  };
