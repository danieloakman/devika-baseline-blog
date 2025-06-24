import React from 'react';
import { useGetBlogs } from '@baseline/client-api/blogs';
import styles from './BlogList.module.scss';
import { Spinner, Card, CardTitle, CardBody, CardText } from 'reactstrap';
import { ErrorMessage } from '@baseline/components';
import { Blog } from '@baseline/types/blog';
import Markdown from 'react-markdown'

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
        <CardTitle tag="h1">{blog.title}</CardTitle>
        <CardText>
          <Markdown>{blog.content}</Markdown>
        </CardText>
      </CardBody>
    </Card>
  );
}
