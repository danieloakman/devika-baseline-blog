import React from 'react';
import { useGetBlogs } from '@baseline/client-api/blogs';
import styles from './BlogList.module.scss';
import { Spinner } from 'reactstrap';
import { ErrorMessage } from '@baseline/components';

export default function BlogList() {
  const { data: blogs = [], isLoading, error } = useGetBlogs();

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner color="primary" />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        blogs.map((blog) => <div key={blog.id}>{blog.title}</div>)
      )}
    </div>
  );
}
