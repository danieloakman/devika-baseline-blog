import { Response } from 'express';
import { isAdmin } from '../../middleware/is-admin';
import { RequestContext } from '../../util/request-context.type';
import { getErrorMessage } from '../../util/error-message';
import createApp from '../../util/express-app';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { blogService } from './blog.service';
import { isBlogPublished } from '../../middleware/is-blog-published';
import StatusCodes from 'http-status-codes';
import * as Conditionals from '../../middleware/conditionals';
import { isAdminSub } from '../admin/admin.service';
import { Blog } from '@baseline/types/blog';

// TODO: many errors here have lost info and to fix it would be nice to use a result type or similar

const app = createApp();
// app.use(isAdmin); // All private endpoints require the user to be an admin
// TODO: this is making every request attempt to be authenticated. But we have unauth'd endpoints here, so fix this
export const handler = createAuthenticatedHandler(app);

const blogMapper = ({ publishedAt, ...blog }: Blog): Blog => ({
  ...blog,
  publishedAt: publishedAt === 'not-published' ? null : publishedAt,
});

app.get('/blog/:id', [
  async (req: RequestContext, res: Response) => {
    const isAdmin = await isAdminSub(req.currentUserSub).catch(() => false);
    await blogService
      .get(req.params.id)
      .then((result) => {
        console.log({ isAdmin, publishedAt: result.publishedAt });
        if (!isAdmin && result.publishedAt === 'not-published')
          res.status(StatusCodes.NOT_FOUND).json({
            error: 'Blog is not published',
          });
        else res.json(blogMapper(result));
      })
      .catch((error) => {
        const message = getErrorMessage(error);
        console.error(`Failed to get blog: ${message}`);
        res.status(400).json({
          error: 'Failed to get blog',
        });
      });
  },
]);

app.get('/blog', [
  async (req: RequestContext, res: Response) => {
    const userSub = req.currentUserSub;
    const isAdmin = await isAdminSub(userSub).catch(() => false);
    await blogService
      .getAll()
      .then((result) => {
        if (isAdmin) res.json(result.map(blogMapper));
        else
          res.json(
            result
              .filter((blog) => blog.publishedAt && blog.publishedAt !== 'not-published')
              .map(blogMapper),
          );
      })
      .catch((error) => {
        console.log('full error', JSON.stringify(error.stack, null, 2));
        const message = getErrorMessage(error);
        console.error(`Failed to get blogs: ${message}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to get blogs',
        });
      });
  },
]);

app.patch('/blog/:id', [
  isAdmin,
  async (req: RequestContext, res: Response) => {
    const id = req.params.id;
    if (!Object.keys(req.body).length)
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'No body provided' });
    else
      await blogService
        .update({ id, ...req.body })
        .then((result) => res.json(result))
        .catch((error) => {
          const message = getErrorMessage(error);
          console.error(`Failed to update blog: ${message}`);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to update blog',
          });
        });
  },
]);

app.delete('/blog/:id', [
  isAdmin,
  async (req: RequestContext, res: Response) => {
    const id = req.params.id;
    await blogService
      .delete(id)
      .then((result) => res.json(result))
      .catch((error) => {
        const message = getErrorMessage(error);
        console.error(`Failed to delete blog: ${message}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to delete blog',
        });
      });
  },
]);

app.post('/blog', [
  isAdmin,
  async (req: RequestContext, res: Response) => {
    const userSub = req.currentUserSub;
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Title and content are required',
      });
      return;
    }

    await blogService
      .create({
        ...req.body,
        publishedAt: 'not-published',
        authorId: userSub,
      })
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(`Failed to create blog: ${getErrorMessage(err)}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to create blog',
        });
      });
  },
]);

app.post('/blog/:id/publish', [
  isAdmin,
  async (req: RequestContext, res: Response) => {
    const id = req.params.id;
    try {
      const blog = await blogService.get(id);
      if (blog.publishedAt && blog.publishedAt !== 'not-published') {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Blog is already published',
        });
        return;
      }
      const result = await blogService.update({
        id,
        publishedAt: new Date().toISOString(),
      });
      res.json(blogMapper(result));
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(`Failed to publish blog: ${message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to publish blog',
      });
    }
  },
]);

// app.post('/blog')
