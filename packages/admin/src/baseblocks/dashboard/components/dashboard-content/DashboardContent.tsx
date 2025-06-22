import React from 'react';
import styles from './DashboardContent.module.scss';
import { getRequestHandler } from '@baseline/client-api/request-handler';
import { useGetBlogs } from '@baseline/client-api/blogs';

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
            <div>Loading...</div>
          ) : isSuccess ? (
            blogs.map((blog) => <div key={blog.id}>{blog.title}</div>)
          ) : (
            <pre>Error: {JSON.stringify(error, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
