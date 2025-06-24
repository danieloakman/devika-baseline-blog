import React from "react";
import PageContent from "@/components/page-content/PageContent";
import BlogViewComponent from "@/baseblocks/blog/components/blog-view/BlogView";

export default function BlogView() {
  return (
    <PageContent>
      <h1>Blog View/Update</h1>
      <BlogViewComponent />
    </PageContent>
  );
}