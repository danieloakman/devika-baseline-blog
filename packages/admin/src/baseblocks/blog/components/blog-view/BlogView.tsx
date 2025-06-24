import {
  UpdateBlogParams,
  useGetBlog,
  useUpdateBlog,
} from '@baseline/client-api/blogs';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
  UncontrolledTooltip,
} from 'reactstrap';
import { ErrorMessage } from '@baseline/components';
import styles from './BlogView.module.scss';
import { Blog } from '@baseline/types/blog';
import { Controller, useForm } from 'react-hook-form';
import { Info } from 'lucide-react';

export function BlogView() {
  const { id } = useParams();
  const { data: blog, isSuccess, isLoading, error } = useGetBlog(id);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : isSuccess ? (
        <BlogUpdateForm blog={blog} />
      ) : (
        <ErrorMessage>{error}</ErrorMessage>
      )}
    </div>
  );
}

function BlogUpdateForm({ blog }: { blog: Blog }) {
  const updateBlog = useUpdateBlog(blog.id);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UpdateBlogParams>({
    defaultValues: {
      title: blog.title,
      content: blog.content,
    },
  });
  const onSubmit = handleSubmit((data) => {
    updateBlog.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} onReset={() => reset(blog)}>
      <Controller
        control={control}
        name="title"
        rules={{
          required: { value: true, message: 'Title is required' },
          maxLength: {
            value: 100,
            message: 'Title must be less than 100 characters',
          },
        }}
        render={({ field, fieldState: { error, invalid } }) => (
          <FormGroup floating>
            <Input {...field} placeholder="Title" invalid={invalid} />
            <Label for="title">Title</Label>
            {error && <FormFeedback>{error.message}</FormFeedback>}
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name="content"
        rules={{
          required: { value: true, message: 'Content is required' },
          maxLength: {
            value: 10000,
            message: 'Content of blog post must be less than 10000 characters',
          },
        }}
        render={({ field, fieldState: { error, invalid } }) => (
          <FormGroup>
            <Label id="content-label" for="content" className={styles.label}>
              Content
              <Info size={16} />
            </Label>
            <UncontrolledTooltip target="content-label" placement="bottom">
              Use markdown to format the content of your blog post.
            </UncontrolledTooltip>

            <MDEditor data-color-mode="light" {...field} />
            {error && <FormFeedback>{error.message}</FormFeedback>}
          </FormGroup>
        )}
      />

      <div className={styles.action}>
        <Button type="reset" color="danger" disabled={!isDirty}>
          Reset
        </Button>
        <Button type="submit" color="primary" disabled={!isDirty}>
          Save
        </Button>
        <Button type="submit" color="success">
          Publish
        </Button>
      </div>
    </form>
  );
}

export default BlogView;
