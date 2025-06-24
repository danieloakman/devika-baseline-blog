import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequestHandler, RequestHandler } from './request-handler';
import { Blog } from '@baseline/types/blog';
import { AxiosError, AxiosResponse } from 'axios';

const handleAxiosResult = <T>(arg: AxiosResponse<T> | AxiosError): T => {
  if ('data' in arg) return arg.data;
  throw arg;
};

export const useGetBlogs = () => {
  const requestHandler = getRequestHandler();
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () =>
      requestHandler
        .request<Blog[]>({
          url: '/blog',
          method: 'GET',
          hasAuthentication: true,
        })
        .then(handleAxiosResult),
  });
};

export const useGetBlog = (blogId: string) => {
  const requestHandler = getRequestHandler();
  return useQuery({
    queryKey: ['blog', blogId],
    queryFn: () =>
      requestHandler
        .request<Blog>({
          url: `/blog/${blogId}`,
          method: 'GET',
          hasAuthentication: true,
        })
        .then(handleAxiosResult),
  });
};

export const useCreateBlog = () => {
  const requestHandler = getRequestHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBlog'],
    mutationFn: (blog: Omit<Blog, 'id' | 'authorId' | 'publishedAt'>) =>
      requestHandler
        .request<Blog>({
          url: '/blog',
          method: 'POST',
          data: blog,
          hasAuthentication: true,
        })
        .then(handleAxiosResult),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useDeleteBlog = () => {
  const requestHandler = getRequestHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteBlog'],
    mutationFn: (blogId: string) =>
      requestHandler
        .request({
          url: `/blog/${blogId}`,
          method: 'DELETE',
          hasAuthentication: true,
        })
        .then(handleAxiosResult),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export type UpdateBlogParams = Omit<
  Partial<Blog>,
  'id' | 'authorId' | 'publishedAt'
>;
export const useUpdateBlog = (blogId?: string) => {
  const requestHandler = getRequestHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBlog'],
    mutationFn: (blog: UpdateBlogParams) => {
      if (!blogId) throw new Error('Blog ID is required');
      return requestHandler
        .request({
          url: `/blog/${blogId}`,
          method: 'PATCH',
          data: blog,
          hasAuthentication: true,
        })
        .then(handleAxiosResult);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const usePublishBlog = () => {
  const requestHandler = getRequestHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['publishBlog'],
    mutationFn: (blogId: string) =>
      requestHandler
        .request({
          url: `/blog/${blogId}`,
          method: 'PATCH',
          data: { publishedAt: new Date().toISOString() },
          hasAuthentication: true,
        })
        .then(handleAxiosResult),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
