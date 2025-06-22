import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RequestHandler } from './request-handler';
import { Blog } from '@baseline/types/blog';
import { AxiosResponse } from 'axios';

const toData = <T>(response: AxiosResponse<T>): T => {
  if ('data' in response) {
    return response.data;
  }
  throw response;
};

export const useGetBlogs = (requestHandler: RequestHandler) => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () =>
      requestHandler
        .request<Blog[]>({
          url: '/blog',
          method: 'GET',
          hasAuthentication: true,
        })
        .then(toData),
  });
};

export const useGetBlog = (requestHandler: RequestHandler, blogId: string) => {
  return useQuery({
    queryKey: ['blog', blogId],
    queryFn: () =>
      requestHandler.request<Blog>({
        url: `/blog/${blogId}`,
        method: 'GET',
        hasAuthentication: true,
      }).then(toData),
  });
};

export const useCreateBlog = (requestHandler: RequestHandler) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createBlog'],
    mutationFn: (blog: Omit<Blog, 'id'>) =>
      requestHandler.request<Blog>({
        url: '/blog',
        method: 'POST',
        data: blog,
        hasAuthentication: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
