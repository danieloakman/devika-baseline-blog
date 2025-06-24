import { useGetBlogs } from '@baseline/client-api/blogs';
import React from 'react';
import { Table } from 'reactstrap';
import styles from './BlogTable.module.scss';
import { EmptyState } from '@baseline/components';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogTable() {
  const { data: blogs = [], isSuccess, isLoading, error } = useGetBlogs();

  const isEmpty = !isLoading && !blogs.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Blogs</h1>
      </div>

      {isEmpty ? (
        <EmptyState
          title="No blogs found"
          description="Create a blog to get started"
          icon={<Book size={48} />}
        >
          <Link to="/blogs/create">Create Blog</Link>
        </EmptyState>
      ) : (
        <div className={styles.table}>
          <Table hover striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Created At</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
          </Table>
        </div>
      )}
    </div>
  );
}
