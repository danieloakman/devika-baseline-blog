import React from 'react';
import BlogList from '@/components/blog-list/BlogList';
import PageWrapper from '@/components/page-wrapper/PageWrapper';
import { useGetBlog } from '@baseline/client-api/blogs';
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { ErrorMessage } from '@baseline/components';
import Markdown from 'react-markdown';
import BlogView from '@/components/blog-view/BlogView';

const Blog = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useGetBlog(id);

  if (isLoading) return <Spinner color="primary" />;
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <PageWrapper title={blog.title}>
      <BlogView blog={blog} />
    </PageWrapper>
  );
};

export default Blog;
