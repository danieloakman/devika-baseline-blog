import React from 'react';
import { useGetBlogs } from '@baseline/client-api/blogs';
import styles from './BlogList.module.scss';
import { Spinner, Card, CardTitle, CardBody, CardText } from 'reactstrap';
import { ErrorMessage } from '@baseline/components';
import { Blog } from '@baseline/types/blog';

export default function BlogList() {
  const { data: blogs = [], isLoading, error } = useGetBlogs();

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
  return (
    <Card className={styles.blogCard}>
      <CardBody>
        <CardTitle>{blog.title}</CardTitle>
        <CardText>{blog.content}</CardText>
      </CardBody>
    </Card>
  );
}
