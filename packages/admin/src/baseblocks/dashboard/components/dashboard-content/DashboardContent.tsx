import React from 'react';
import styles from './DashboardContent.module.scss';
import { getRequestHandler } from '@baseline/client-api/request-handler';
import { useCreateBlog, useGetBlogs } from '@baseline/client-api/blogs';
import {
  Spinner,
  Input,
  Button,
  Toast,
  ToastHeader,
  ToastBody,
} from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

const DashboardContent = (): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <BlogCreateForm />
        {/* <Blogs /> */}
      </div>
    </div>
  );
};

const BlogCreateForm = () => {
  const createBlog = useCreateBlog(getRequestHandler());
  const { control, handleSubmit } = useForm<{ title: string; content: string }>(
    {
      defaultValues: {
        title: '',
        content: '',
      },
    },
  );

  const onSubmit = handleSubmit((data) => {
    createBlog.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className={styles.preview}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <label>
            <p>Title</p>
            <Input type="text" placeholder="Title" {...field} />
          </label>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <label>
            <p>Content</p>
            <Input type="text" placeholder="Content" {...field} />
          </label>
        )}
      />

      <Button type="submit" color="primary">
        Create Blog
      </Button>
      {createBlog.isError && (
        <Toast>
          <ToastHeader>Error</ToastHeader>
          <ToastBody>
            <pre>{JSON.stringify(createBlog.error, null, 2)}</pre>
          </ToastBody>
        </Toast>
      )}
    </form>
  );
};

const Blogs = () => {
  const {
    data: blogs = [],
    isSuccess,
    isLoading,
    error,
  } = useGetBlogs(getRequestHandler());
  return isLoading ? (
    <Spinner color="primary" />
  ) : isSuccess ? (
    blogs.map((blog) => (
      <pre key={blog.id}>{JSON.stringify(blog, null, 2)}</pre>
    ))
  ) : (
    <pre>Error: {JSON.stringify(error, null, 2)}</pre>
  );
};

export default DashboardContent;
