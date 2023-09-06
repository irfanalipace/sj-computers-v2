import React, { useEffect, useState } from "react";
import "../Blog/SingleBlog/SingleBlog.css";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Pagination from "@mui/material/Pagination";
import { colors } from "laravel-mix/src/Log";

const BlogGrid = ({ blogs, pageCount, currentPage, handlePageChange, isLoading }) => {
  

  
  const navigate = useNavigate();

  const blogslist = (blog) => {
      navigate(`/${blog.slug}`, {
          state: {
              blogList: blog,
          },
      });
  };

  if (blogs.categories && Array.isArray(blog.categories)) {
    blog.categories.forEach((category) => {
      console.log(category.name, 'list data');
    });
  } else {
    console.error('Categories not defined or not an array');
  }
  
    return (
        <div className="container single-blog-pages-dev-container-all-products">
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={blog?.id}>
              <div className="product-card product-blogs-card">
                <Link
                  to={`/${blog?.slug}`}
                  className="text-decoration-none"
                  state={{
                    blogList: blog,
                    
                  }}
                  
                  onClick={() => blogslist(blog)}
                >
                  <img src={blog?.thumbnail_image} alt={blog?.alt_thumbnail_image} />
                  <div className="dev-data-span-card-dev">
                    <span>{blog?.title}</span>
                  </div>
                  <div className="read-more-button-blogs">
                    <span>{blog?.publish_date}</span>
                  </div>
                  
                  <div className="read-more-span-text">
                    <span>{blog?.meta_description}</span>
                  </div>
                  </Link>
                  <div className="read-section-date-section">
                    <div style={{ paddingTop: "4px" }}>
                      <span style={{ fontWeight: "bold" }}>Read Full Blog
                      
                  
                      </span>
                    </div>
           
                    {/* {blog?.tags && blog?.tags?.length > 0 && (
                      <div style={{ display: "flex" }}>
                        {console.log(blogs?.categories,'category name')}
                        {blog?.tags
                          ?.split(",")
                          ?.slice(0, 3)
                          ?.map((tag) => (
                            <div className="span-data-blogs-lending-page" key={tag}>
                              <span>{tag}</span>
                            </div>
                          ))}
                      </div>
                    )} */}
                    {blog?.categories && blog?.categories?.length > 0 && (
                    <div style={{ display: "flex" }}>
                     {blog?.categories?.map((category) => (
                    <div className="span-data-blogs-lending-page" key={category}>
                    {/* <span>{category.name} {console.log(category.name, 'category')}</span> */}
                    <Link to={`/blogs/category/${category.slug}`} className="text-decoration-none" style={{color:'black', fontSize:'12'}}>{category.name}</Link>
                   </div>
                   ))}
                    </div>
                    )}
                  </div>
               
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-blogs-page">
          <div>
            <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
          </div>
          {isLoading && <div className="loader">Loading...</div>}
        </div>
      </div>
    );
};

export default BlogGrid;
