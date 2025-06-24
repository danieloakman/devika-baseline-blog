import React from 'react';
import Markdown from 'react-markdown';
import { Blog } from '@baseline/types/blog';
import styles from './BlogView.module.scss';

export function BlogView({ blog }: { blog: Blog }) {
  return (
    <>
      <h1>{blog.title}</h1>
      <hr className={styles.hr} />
      <Markdown>{blog.content}</Markdown>
    </>
  );
}

export default BlogView;
