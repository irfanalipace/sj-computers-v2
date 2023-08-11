import React, { useEffect, useState } from "react";
import blogmeeting from "@images/blog/meetingblog-page2.png";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { Link,useNavigate } from "react-router-dom";
import {
    getBlogsPagesApi,
    blogSlugApiblogDetails,
} from "../../../../core/api/blogs";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./SingleBlog.css";
import Blog from "../Blog";
import BlogsDetails from "../../../pages/Blog/BlogsDetails";
import BlogPage from "../../../pages/Blog/BlogPage";

const SingleBlog = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [expandedBlogs, setExpandedBlogs] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);

    const handleChange = (event) => {
        const filterValue = event.target.value;
        setSelectedFilter(filterValue);
        handleFilter(filterValue);
    };
    const toggleExpanded = (blogId) => {
        if (expandedBlogs.includes(blogId)) {
            setExpandedBlogs(expandedBlogs.filter((id) => id !== blogId));
        } else {
            setExpandedBlogs([...expandedBlogs, blogId]);
        }
    };
    const handlePaginationClick1 = (page) => {
        setCurrentPage(page);
    };

    
    useEffect(() => {
        setIsLoading(true);
        getBlogsPagesApi(currentPage, itemsPerPage)
            .then((response) => {
              
                if (response.data && response.data?.data.length > 0) {
                    setBlogs(response.data?.data);
                    setPageCount(response.data?.last_page);
                } else {
                    setBlogs([]);
                }
            })
            .catch((error) => {
                console.error("API Error:", error);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentPage, itemsPerPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // const [blogdteails, setBlogDetails] = useState("");
    // useEffect(() => {
    //     blogSlugApiblogDetails(blogslug)
    //         .then((response) => {
    //             console.log("slugggggg", blogslug);
    //             setBlogDetails(response?.data);
    //         })
    //         .catch((error) => {
    //             console.error("API Error:", error);
    //         });
    // }, [blogslug]);

    // const [singleblog, setSingle] = useState("");

    // useEffect(() => {
    //     getBlogsPagesApi(currentPage, itemsPerPage)
    //         .then((response) => {
    //             if (response.data && response.data?.data.length > 0) {
    //                 const singleBlog = response.data?.data[0]; // Extract the first blog from the array
    //                 setSingle(singleBlog);
    //             } else {
    //                 setSingle(""); // No blog available
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("API Error:", error);
    //         });
    // }, []);


   
    const navigate = useNavigate();

    const blogslist = (blog) => {

      navigate(`/${blog.slug}`, {
        state: {
          blogList: blog,
          
        }
       
      });
    };
  

    return (
        <div>
            {/* <div className="mein-dev-single-page-cantainer">
                <div className="container conatnier-dev-single-blog-dev">
                    <div className="col-12">
                        <div className="span-dev-page-text-page">
                            <span>{singleblog.title}</span>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <div className="meeting-data-blog-save-dev-form">
                                {/* <img src={blogmeeting} /> */}
                                {blogs.length > 0 && (
                                    
                        <div>
               
              
                    <img
                        src={blogs[0].primary_image ? blogs[0].primary_image:blogmeeting}
                        alt={blogs[0].all_text}
                    />
              
                         </div>
                      )
                    
                      }
                     
                                {/* <img
                                    src={
                                        singleblog.primary_image
                                            ? singleblog.primary_image
                                            : blogmeeting
                                    }
                                    alt={blogs.all_text}
                                /> */}
                            </div>
                            <div className="mid-graph-pargarph-page-data">
                                {/* <span>{singleblog.title}</span> */}
                            </div>
                            <div className="mid-graph-pargarph-page-datap-data blog-dynamic-style-heading-data1">
                                <div
                                    className="content-image-data-paragrap"
                                    // dangerouslySetInnerHTML={{
                                    // __html: singleblog.content
                                    // }}
                                />
                                <span>
                                    Did you know? SJ Computer is the first, and
                                    only, marketer to protuct customers in third
                                    party product liability cases Did you know?
                                    SJ Computer is the first, and only, marketer
                                    to protuct customers in third party product
                                    liability cases Did you know? SJ Computer is
                                    the first, and only, marketer to protuct
                                    customers in third party product liability
                                    cases{" "}
                                </span>
                            </div>

                            {/* <div>
                                    {blog.content.length > 400 && (
                                        <span
                                            className="see-all-stories-data-ever-data"
                                            onClick={() =>
                                                toggleExpanded(blog.id)
                                            }
                                        >
                                            {expandedBlogs.includes(blog.id)
                                                ? "Read Less"
                                                : "Read More"}
                                        </span>
                                    )}
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="trending-blog-filter-data">
                    <div className="treding-blog-sets">
                        {/* <span> Trending Blogs</span> */}
                    </div>
                    <div className="dev-trending-data-image">
                        <select value={selectedFilter}>
                            <option value="">Recent Blogs</option>
                            <option value="trending">Trending Blog</option>
                            <option value="az">Sorting A-Z</option>
                            <option value="date">Sorting by Date</option>
                        </select>
                    </div>
                </div>
            </div>
           
        
            {isLoading ? (
                <div
                    className="blog-pagesloader-overlay"
                    style={{ display: isLoading ? "flex" : "none" }}
                >
                    <LoaderComponent />
                </div>
            ) : (
                <div className="container single-blog-pages-dev-container-all-products">
                   
                    <div className="row">
                        {blogs.map((blog) => (
                         
                            <div className="col-md-4" key={blog.id} >
                               <div>
                      
                               </div>
                                <Link
                                    to={`/${blog.slug}`}
                                    className="text-decoration-none"
                                   
                                    state={{
                                        blogList: blog
                                    }}
                                    onClick={() => blogslist(blog)}
                                >
                                   
                                    <div className="product-card">
                                        {/* <img src={book} alt={blog.title} /> */}

                                        <img
                                            src={
                                                blog.thumbnail_image   
                                                    ? blog.thumbnail_image
                                                    : "https://via.placeholder.com/400x400"
                                            }
                                            alt={blog.alt_thumbnail_image}
                                        />

                                        <div className="dev-data-span-card-dev">
                                            <span> {blog.tags}</span>
                                        </div>           
                                        

                                        <div className="read-section-date-section">
                                            <div>
                                                <span>Read me</span>
                                                
                                            </div>
                                            <div>
                                                <span>{blog.publish_date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        
                      
                    </div>

                    {/* <div className="pagination-blogs-page">
            {prevPageUrl && (
                <button onClick={handlePrevPage}>
                    &laquo; Previous
                </button>
            )}

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePaginationClick(index + 1)}
                    className={
                        currentPage === index + 1 ? "active" : ""
                    }
                >
                    {index + 1}
                </button>
            ))}

            {nextPageUrl && (
                <button onClick={handleNextPage}>Next &raquo;</button>
            )}
        </div> */}

                    <div className="pagination-blogs-page">
                        {/* <button onClick={handlePrevPage} disabled={!prevPageUrl}>
                &laquo; Pre
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePaginationClick(index + 1)}
                    className={
                        currentPage === index + 1 ? "active" : ""
                    }
                >
                    {currentPage}
                </button>
            ))}

            <button onClick={handleNextPage} disabled={!nextPageUrl}>
                Nxt &raquo;
            </button> */}
                        <div>
                            <Stack spacing={2}>
                                <Pagination
                                    count={pageCount}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </Stack>
                        </div>
                        {isLoading && <div className="loader">Loading...</div>}
                    </div>
                </div>
            )}

           
        </div>
    );
};

export default SingleBlog;
