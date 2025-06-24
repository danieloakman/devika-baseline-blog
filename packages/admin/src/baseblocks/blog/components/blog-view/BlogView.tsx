import { useGetBlog } from "@baseline/client-api/blogs";
import React from "react";
import { useParams } from "react-router-dom";   

export function BlogView() {
  const { id } = useParams();
  const { data: blog, isSuccess, isLoading, error } = useGetBlog(id);

  return (
    <div>
      <h1>{blog?.title}</h1>
      <p>Blog ID: {id}</p>
      <p>Blog Title: {blog?.title}</p>
      <p>Blog Content: {blog?.content}</p>
      <p>Blog Author: {blog?.authorId}</p>
      {/* <p>Blog Created At: {blog?.createdAt}</p> */}
      {/* <p>Blog Updated At: {blog?.updatedAt}</p> */}
    </div>
  );
}

export default BlogView;
