import React from 'react';
import BlogList from '@/components/blog-list/BlogList';
import PageWrapper from '@/components/page-wrapper/PageWrapper';

const Home = () => (
  <PageWrapper title="Blogs">
    <h1>Blogs</h1>
    <BlogList />
  </PageWrapper>
);

export default Home;
