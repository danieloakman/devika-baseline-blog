import { NextFunction, Response } from 'express';
import { RequestContext } from '../util/request-context.type';
import { blogService } from '../baseblocks/blog/blog.service';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from '../util/error-message';

interface MiddlewareFn {
  (req: RequestContext, res: Response, next: NextFunction): Promise<void>;
}

export const or =
  (...middlewares: MiddlewareFn[]) =>
  async (req: RequestContext, res: Response, next: NextFunction) => {
    let error: unknown;

    for (const middleware of middlewares) {
      try {
        await new Promise((resolve, reject) => {
          middleware(req, res, (err: any) =>
            err ? reject(err) : resolve(true),
          );
        });
        return next();
      } catch (err) {
        error = err;
      }
    }

    // All middlewares failed, return cause of last error:
    if (error)
      res.status(StatusCodes.FORBIDDEN).json({
        error: getErrorMessage(error),
      });
    else next();
  };
