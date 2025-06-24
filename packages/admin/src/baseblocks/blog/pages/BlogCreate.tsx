import React from 'react';
import PageContent from '@/components/page-content/PageContent';
import BlogCreateForm from '@/baseblocks/blog/components/blog-create-form/BlogCreateForm';
import { Helmet } from 'react-helmet';

export default function BlogCreate() {
  return (
    <PageContent>
      <Helmet>
        <title>Create Blog</title>
      </Helmet>
      <h1>Create Blog</h1>
      <BlogCreateForm />
    </PageContent>
  );
}
