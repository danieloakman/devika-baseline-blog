import { NextFunction, Response } from 'express';
import { RequestContext } from '../util/request-context.type';
import { blogService } from '../baseblocks/blog/blog.service';

export const isBlogPublished = async (
  req: RequestContext,
  res: Response,
  next: NextFunction,
) => {
  const blogId = req.params.id;
  const blog = await blogService.get(blogId);
  if (!blog.publishedAt) {
    res.status(403).json({
      error: 'Blog is not published',
    });
    return;
  }
  next();
};