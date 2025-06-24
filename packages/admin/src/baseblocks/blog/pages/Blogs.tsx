import React from 'react';
import PageContent from '../../../components/page-content/PageContent';
import BlogTable from "@/baseblocks/blog/components/blog-table/BlogTable";
import { Helmet } from 'react-helmet';

export default function Blogs() {
  return (
    <PageContent>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <BlogTable />
    </PageContent>
  );
}
