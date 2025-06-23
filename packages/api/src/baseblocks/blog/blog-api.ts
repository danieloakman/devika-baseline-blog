import { Response } from 'express';
// import { AdminMapper } from './admin';
import { isAdmin } from '../../middleware/is-admin';
import {
  createUser,
  getUserAttributesByEmail,
} from '../cognito/cognito.service';
import { RequestContext } from '../../util/request-context.type';
import { Admin } from '@baseline/types/admin';
import { getErrorMessage } from '../../util/error-message';
import createApp from '../../util/express-app';
import createAuthenticatedHandler from '../../util/create-authenticated-handler';
import { blogService } from './blog.service';
import { isBlogPublished } from '../../middleware/is-blog-published';
// import { adminService } from './admin.service';
import StatusCodes from 'http-status-codes';
import * as Conditionals from '../../middleware/conditionals';
import { isAdminSub } from '../admin/admin.service';
import { randomUUID } from 'crypto';

const app = createApp();
// app.use(isAdmin); // All private endpoints require the user to be an admin
export const handler = createAuthenticatedHandler(app);

app.get('/blog/:id', [
  Conditionals.or(isAdmin, isBlogPublished),
  async (req: RequestContext, res: Response) =>
    await blogService
      .get(req.params.id)
      .then(res.json)
      .catch((error) => {
        const message = getErrorMessage(error);
        console.error(`Failed to get blog: ${message}`);
        res.status(400).json({
          error: 'Failed to get blog',
        });
      }),
]);

app.get('/blog', [
  async (req: RequestContext, res: Response) => {
    const userSub = req.currentUserSub;
    const isAdmin = await isAdminSub(userSub);
    if (isAdmin)
      await blogService
        .getAll()
        .then(res.json)
        .catch((error) => {
          const message = getErrorMessage(error);
          console.error(`Failed to get blogs: ${message}`);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to get blogs',
          });
        });
    else
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'NOT IMPLEMENTED',
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
        .then(res.json)
        .catch((error) => {
          const message = getErrorMessage(error);
          console.error(`Failed to update blog: ${message}`);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to update blog',
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

    const Item = {
      ...req.body,
      id: randomUUID(),
      publishedAt: 'not-published',
      authorId: userSub,
    };
    console.log('Creating blog', Item);

    await blogService.dynamoDb
      .put({
        TableName: blogService.table,
        Item,
      })
      .then((result) => res.json(result.Attributes))
      .catch((err) => {
        console.error(`Failed to create blog: ${getErrorMessage(err)}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Failed to create blog',
        });
      });
    // await blogService
    //   .create({
    //     ...req.body,
    //     publishedAt: 'not-published',
    //     authorId: userSub,
    //   })
    //   .then(res.json)
    //   .catch((err) => {
    //     console.error(`Failed to create blog: ${getErrorMessage(err)}`);
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //       error: 'Failed to create blog',
    //     });
    //   });
  },
]);

// app.patch('/admin', [
//   isAdmin,
//   async (req: RequestContext, res: Response) => {
//     try {
//       const { userEmail, userSub } = req.body as Admin;
//       const adminData: Partial<Admin> = {
//         userSub: userSub,
//         userEmail: userEmail.toLowerCase(),
//       };
//       const admin = await adminService.update(adminData);
//       res.json(AdminMapper(admin));
//     } catch (error) {
//       const message = getErrorMessage(error);
//       console.error(`Failed to update admin: ${message}`);
//       res.status(400).json({
//         error: 'Failed to update admin',
//       });
//     }
//   },
// ]);

// app.post('/admin', [
//   isAdmin,
//   async (req: RequestContext, res: Response) => {
//     try {
//       const { userEmail } = req.body as Admin;

//       if (!userEmail) {
//         res.status(400).json({
//           error: 'No email given',
//         });
//         return;
//       }

//       // do not attempt to create user if there is a db record for them already
//       const allAdmins = await adminService.getAll();
//       const existingAdmin = allAdmins.find(
//         (admin) => admin.userEmail === userEmail,
//       );
//       if (existingAdmin) {
//         console.log('Admin user already exists');
//         res.json(AdminMapper(existingAdmin));
//         return;
//       }

//       // determine if email is used in cognito already
//       let existingUserSub = '';
//       try {
//         const userAttributes = await getUserAttributesByEmail(userEmail);
//         existingUserSub = userAttributes?.sub || '';
//       } catch (error) {
//         console.log(error);
//       }

//       // when there is an existing cognito user all we need to do is create the db record
//       if (existingUserSub) {
//         console.log('Existing cognito user found, adding to db');
//         const adminData: Partial<Admin> = {
//           userSub: existingUserSub,
//           userEmail: userEmail.toLowerCase(),
//         };
//         const admin = await adminService.create(adminData);
//         res.json(AdminMapper(admin));
//         return;
//       }

//       // if there is no existing user create cognito user and db record
//       if (!existingUserSub) {
//         console.log('No existing cognito user, creating one');

//         const userAttributes = await createUser(userEmail);
//         if (!userAttributes?.sub) {
//           throw new Error('No user sub after create');
//         }
//         const adminData: Partial<Admin> = {
//           userSub: userAttributes?.sub,
//           userEmail: userEmail,
//         };
//         const admin = await adminService.create(adminData);
//         res.json(AdminMapper(admin));
//         return;
//       }

//       console.error(`Failed to delete admin`);
//       res.status(400).json({
//         error: 'Failed to create admin',
//       });
//     } catch (error) {
//       const message = getErrorMessage(error);
//       console.error(`Failed to create admin: ${message}`);
//       res.status(400).json({
//         error:
//           'Failed to create admin, if working offline please edit serverless.yml',
//       });
//     }
//   },
// ]);

// app.delete('/admin/:userSub', [
//   isAdmin,
//   async (req: RequestContext, res: Response) => {
//     try {
//       const userSub = req.params.userSub;
//       await adminService.delete(userSub);
//       res.status(200);
//       res.send();
//     } catch (error) {
//       const message = getErrorMessage(error);
//       console.error(`Failed to delete admin: ${message}`);
//       res.status(400).json({
//         error: 'Failed to delete admin',
//       });
//     }
//   },
// ]);

// app.get('/admin/list', [
//   isAdmin,
//   async (req: RequestContext, res: Response) => {
//     try {
//       const admins = await adminService.getAll();
//       const formattedAdmins = admins.map((data) => AdminMapper(data));
//       res.json(formattedAdmins);
//     } catch (error) {
//       const message = getErrorMessage(error);
//       console.error(`Failed to get admins: ${message}`);
//       res.status(400).json({
//         error: 'Failed to get admins',
//       });
//     }
//   },
// ]);

// app.get('/admin/:userId', [
//   isAdmin,
//   async (req: RequestContext, res: Response) => {
//     try {
//       const admin = await adminService.get(req.params.userId);
//       res.json(AdminMapper(admin));
//     } catch (error) {
//       const message = getErrorMessage(error);
//       console.error(`Failed to get admin: ${message}`);
//       res.status(400).json({
//         error: 'Failed to get admin',
//       });
//     }
//   },
// ]);

// app.get('/admin', [
//   async (req: RequestContext, res: Response) => {
//     try {
//       const admin = await adminService.get(req.currentUserSub);
//       res.json(AdminMapper(admin));
//     } catch (error) {
//       const message = getErrorMessage(error);
//       console.error(`Failed to get admin: ${message}`);
//       res.status(400).json({
//         error: 'Failed to get admin',
//       });
//     }
//   },
// ]);
