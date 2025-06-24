import { useGetBlogs } from '@baseline/client-api/blogs';
import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverBody,
  PopoverHeader,
  Spinner,
  Table,
  UncontrolledPopover,
} from 'reactstrap';
import styles from './BlogTable.module.scss';
import { EmptyState } from '@baseline/components';
import { Book, Ellipsis, EllipsisVertical, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Blog } from '@baseline/types/blog';
import ConfirmDelete from '@/components/confirm-delete/ConfirmDelete';

export default function BlogTable() {
  const { data: blogs = [], isSuccess, isLoading, error } = useGetBlogs();

  const isEmpty = !isLoading && !blogs.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Blogs</h1>
        <Link to="/blogs/create">
          <Button color="primary">Create Blog</Button>
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : isEmpty ? (
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
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                  <td>{blog.authorId}</td>
                  <td>TODO</td>
                  <td>TODO</td>
                  <td>TODO</td>
                  <td>
                    <ConfirmDelete
                      itemName={blog.title}
                      deleteFunction={() => {
                        // TODO: delete blog
                      }}
                    >
                      <Trash color="red" />
                    </ConfirmDelete>
                    {/* <BlogActions blog={blog} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

// TODO: fix popover not working
// function BlogActions({ blog }: { blog: Blog }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <Button type="button" id={`blog-actions-${blog.id}`} color="link">
//         <EllipsisVertical />
//       </Button>
//       <Popover
//         target={`blog-actions-${blog.id}`}
//         placement="bottom"
//         style={{ zIndex: 1000 }}
//         flip
//         isOpen={isOpen}
//         toggle={() => setIsOpen(!isOpen)}
//       >
//         <PopoverHeader>Actions</PopoverHeader>
//         <PopoverBody
//           style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
//         >
//           <Button>Delete</Button>
//         </PopoverBody>
//       </Popover>
//     </>
//   );
// }
