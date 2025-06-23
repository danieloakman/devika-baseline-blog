import { useGetBlogs } from "@baseline/client-api/blogs";
import { getRequestHandler } from "@baseline/client-api/request-handler";
import React from "react";
import { Spinner } from "reactstrap";

const BlogList = () => {
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

export default BlogList;
