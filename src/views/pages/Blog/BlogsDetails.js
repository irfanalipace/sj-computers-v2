import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { blogsDetails } from 'core/api/blogs';
import BlogPage from './BlogPage';

const BlogsDetails = () => {
  // const { blogslug } = useParams();
  //   console.log('params-slug-data',blogslug)
  // useEffect(() => {
  //   blogsDetails(blogslug)
  //     .then((response) => {
  //       console.log('Blog details:', response);
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching blog details:', error);
  //     });
  // }, [blogslug]);

  return (
    <div>
      <BlogPage />
    </div>
  );
};

export default BlogsDetails;
