import { useQuery } from '@tanstack/react-query';
import { RequestHandler } from './request-handler';

export const useGetBlogs = (requestHandler: RequestHandler) => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () =>
      requestHandler.request({
        url: '/blogs',
        method: 'GET',
        hasAuthentication: true,
      }),
  });
};

export const useGetBlog = (requestHandler: RequestHandler, blogId: string) => {
  return useQuery({
    queryKey: ['blog', blogId],
    queryFn: () =>
      requestHandler.request({
        url: `/blogs/${blogId}`,
        method: 'GET',
        hasAuthentication: true,
      }),
  });
};
