import React, { useMemo } from 'react';
import { useGetBlogs } from '@baseline/client-api/blogs';
import styles from './BlogList.module.scss';
import { Spinner, CardTitle, CardText } from 'reactstrap';
import { EmptyState, ErrorMessage, Card } from '@baseline/components';
import { Blog } from '@baseline/types/blog';
import Markdown from 'react-markdown';
import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BlogList() {
  const { data: blogs = [], isLoading, error } = useGetBlogs();

  if (!isLoading && !blogs.length)
    return (
      <EmptyState
        title="No blogs found"
        description="No blogs found"
        icon={<Book size={48} />}
        className={styles.emptyState}
      />
    );
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner color="primary" />
      ) : error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : (
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
      )}
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  const navigate = useNavigate();
  const blogContent = useMemo(() => {
    return blog.content.length > 100
      ? blog.content.slice(0, 100) + '...'
      : blog.content;
  }, [blog]);

  return (
    <Card onClick={() => navigate(`/blog/${blog.id}`)}>
      <CardTitle tag="h1">{blog.title}</CardTitle>
      <CardText className={styles.blogContent}>
        <Markdown>{blogContent}</Markdown>
      </CardText>
    </Card>
  );
}
