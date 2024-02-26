import React, { useEffect, useState } from "react";
import "./Blog.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Pagination from "@mui/material/Pagination";

const BlogGrid = ({
    blogs,
    pageCount,
    currentPage,
    handlePageChange,
    isLoading,
}) => {
    const navigate = useNavigate();

    const handleBlogClick = (blog) => {
        navigate(`/${blog.slug}`, {
            state: {
                blogList: blog,
            },
        });
    };

    return (
        <div>
            <div className="container single-blog-pages-dev-container-all-products">
                {blogs?.length > 0 ? (
                    <div className="row">
                        {blogs.map((blog) => (
                            <div
                                className="col-lg-4 col-md-6 col-sm-12"
                                key={blog?.id}
                            >
                                <div className="product-card product-blogs-card">
                                    <Link
                                        to={`javascript:void(0)`}
                                        className="text-decoration-none"
                                        state={{
                                            blogList: blog,
                                        }}
                                        onClick={() => handleBlogClick(blog)}
                                    >
                                        <img
                                            src={blog?.thumbnail_image}
                                            alt={blog?.alt_thumbnail_image}
                                        />
                                        <div className="dev-data-span-card-dev">
                                            <span>{blog?.title}</span>
                                        </div>
                                        <div className="read-more-button-blogs">
                                            <span>{blog?.publish_date}</span>
                                        </div>

                                        <div className="read-more-span-text">
                                            <span>
                                                {blog?.meta_description}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="read-section-date-section">
                                        <Link
                                            to={"javascript:void(0)"}
                                            className="text-decoration-none"
                                            state={{
                                                blogList: blog,
                                            }}
                                            onClick={() =>
                                                handleBlogClick(blog)
                                            }
                                        >
                                            <div style={{ paddingTop: "4px" }}>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Read Full Blog
                                                </span>
                                            </div>
                                        </Link>
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
                                        {blog?.categories &&
                                            blog?.categories?.length > 0 && (
                                                <div
                                                    style={{ display: "flex" }}
                                                >
                                                    {blog?.categories?.map(
                                                        (category) => (
                                                            <div
                                                                className="span-data-blogs-lending-page"
                                                                key={category}
                                                            >
                                                                <Link
                                                                    to={`/blogs/category/${category.slug}`}
                                                                    className="text-decoration-none"
                                                                    style={{
                                                                        color: "black",
                                                                        fontSize:
                                                                            "12px",
                                                                    }}
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </Link>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="blogs-not-found-message">
                        <h2>Blogs not found.</h2>
                    </div>
                )}

                {blogs?.length > 0 && (
                    <div className="pagination-blogs-page">
                        <div>
                            <Pagination
                                count={pageCount}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                        {/* {isLoading && <div className="loader">Loading...</div>} */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogGrid;
