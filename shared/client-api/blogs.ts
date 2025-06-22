import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RequestHandler } from './request-handler';
import { Blog } from '@baseline/types/blog';

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

export const useCreateBlog = (requestHandler: RequestHandler) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createBlog'],
    mutationFn: (blog: Omit<Blog, 'id'>) =>
      requestHandler.request({
        url: '/blogs',
        method: 'POST',
        data: blog,
        hasAuthentication: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};