import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequestHandler, RequestHandler } from './request-handler';
import { Blog } from '@baseline/types/blog';
import { AxiosError, AxiosResponse } from 'axios';
import { createQueryKey, hasQueryKeys } from './util';

const handleAxiosResult = <T>(arg: AxiosResponse<T> | AxiosError): T => {
  if ('data' in arg) return arg.data;
  throw arg;
};

export const useGetBlogs = () => {
  const requestHandler = getRequestHandler();
  return useQuery({
    queryKey: createQueryKey('get-blogs'),
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
    queryKey: createQueryKey('get-blog', blogId),
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
    mutationKey: createQueryKey('create-blog'),
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
      queryClient.invalidateQueries({ predicate: hasQueryKeys('get-blogs') });
    },
  });
};

export const useDeleteBlog = () => {
  const requestHandler = getRequestHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createQueryKey('delete-blog'),
    mutationFn: (blogId: string) =>
      requestHandler
        .request({
          url: `/blog/${blogId}`,
          method: 'DELETE',
          hasAuthentication: true,
        })
        .then(handleAxiosResult),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: hasQueryKeys('get-blog', 'get-blogs'),
      });
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
    mutationKey: createQueryKey('update-blog'),
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
      queryClient.invalidateQueries({
        predicate: hasQueryKeys('get-blog', 'get-blogs'),
      });
    },
  });
};

export const usePublishBlog = () => {
  const requestHandler = getRequestHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createQueryKey('publish-blog'),
    mutationFn: (blogId: string) =>
      requestHandler
        .request({
          url: `/blog/${blogId}/publish`,
          method: 'POST',
          hasAuthentication: true,
        })
        .then(handleAxiosResult),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: hasQueryKeys('get-blog', 'get-blogs'),
      });
    },
  });
};
