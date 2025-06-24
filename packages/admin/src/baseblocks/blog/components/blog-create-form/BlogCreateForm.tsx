import React from 'react';
import { useCreateBlog } from '@baseline/client-api/blogs';
import { Controller, useForm } from 'react-hook-form';
import styles from './BlogCreateForm.module.scss';
import {
  Button,
  Input,
  Toast,
  ToastBody,
  ToastHeader,
  Label,
  FormFeedback,
  FormGroup,
  UncontrolledTooltip,
} from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';
import { Info } from 'lucide-react';
import { ErrorMessage } from '@baseline/components';

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
        rules={{
          required: { value: true, message: 'Title is required' },
          maxLength: {
            value: 100,
            message: 'Title must be less than 100 characters',
          },
        }}
        render={({ field, fieldState: { error, invalid } }) => (
          <FormGroup floating>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              invalid={invalid}
              {...field}
            />
            <Label for="title">Title</Label>
            {error && <FormFeedback>{error.message}</FormFeedback>}
          </FormGroup>
        )}
      />

      <Controller
        name="content"
        control={control}
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

      <Button type="submit" color="primary">
        Create Blog
      </Button>
      {createBlog.isError && (
        <ErrorMessage>{createBlog.error}</ErrorMessage>
      )}
    </form>
  );
}

export default BlogCreateForm;
