import React from 'react';
import PageContent from '../../../components/page-content/PageContent';
import BlogList from '../components/BlogList';
import BlogCreateForm from '../components/BlogCreateForm';

export default function Blogs() {
  return (
    <PageContent>
      <BlogCreateForm />
      <BlogList />
    </PageContent>
  );
}
