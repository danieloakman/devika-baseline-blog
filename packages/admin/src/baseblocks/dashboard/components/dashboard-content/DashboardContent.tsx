import React from 'react';
import styles from './DashboardContent.module.scss';
import { getRequestHandler } from '@baseline/client-api/request-handler';
import { useGetBlogs } from '@baseline/client-api/blogs';
import { Spinner } from 'reactstrap';

const DashboardContent = (): JSX.Element => {
  const {
    data: blogs = [],
    isSuccess,
    isLoading,
    error,
  } = useGetBlogs(getRequestHandler());
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <div className={styles.preview}>
          {isLoading ? (
            <Spinner color="primary" />
          ) : isSuccess ? (
            blogs.map((blog) => (
              <pre key={blog.id}>{JSON.stringify(blog, null, 2)}</pre>
            ))
          ) : (
            <pre>Error: {JSON.stringify(error, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
