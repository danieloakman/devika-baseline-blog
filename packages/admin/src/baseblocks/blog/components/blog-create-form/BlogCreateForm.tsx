import React from 'react';
import { useCreateBlog } from '@baseline/client-api/blogs';
import { Controller, useForm } from 'react-hook-form';
import styles from './BlogCreateForm.module.scss';
import { Button, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';

function BlogCreateForm() {
  const createBlog = useCreateBlog();
  const { control, handleSubmit } = useForm<{ title: string; content: string }>(
    {
      defaultValues: {
        title: '',
        content: '',
      },
    },
  );
  const onSubmit = handleSubmit((data) => createBlog.mutate(data));

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <Controller
        name="title"
        control={control}
        rules={{ required: { value: true, message: 'Title is required' } }}
        render={({ field, fieldState: { error, invalid } }) => (
          <label>
            <p>Title</p>
            <Input type="text" placeholder="Title" {...field} invalid={invalid} />
            
          </label>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <label>
            <p>Content</p>
            <Input type="textarea" placeholder="Content" {...field} />
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
}

export default BlogCreateForm;
