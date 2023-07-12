import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SingleBlog.css";
import blogmeeting from "@images/blog/meetingblog-page2.png";
import smimage from "@images/blog/smallimage.png";
import book from "@images/blog/blogbook.png";

import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { Link } from "react-router-dom";

import imageproduct from "@images/blog/product.png";
import imageproduct1 from "@images/blog/product1.png";
import imageproduct2 from "@images/blog/product2.png";
import imagepencel from "@images/blog/imagepen.png";
import laptopimg from "@images/blog/latopimage.png";
import bloglaptop1 from "@images/blog/bookwithlaptop.png";
import bloglaptop2 from "@images/blog/laptopwithbook2.png";
import productviewblog from "@images/blog/typelaptop.png";
import { getBlogsPagesApi,blogSlugApiblogDetails } from "../../../../core/api/blogs";
import meetingset from "@images/blog/meeting2image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const SingleBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [expandedBlogs, setExpandedBlogs] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);

    const { blogslug } = useParams();

    console.log("sulg-single-page-data", blogslug);
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
                console.log(response.data?.meta_title, '22222222"');

                if (response.data && response.data?.data.length > 0) {
                    setBlogs(response.data?.data);
                    setPrevPageUrl(response.data?.prev_page_url);
                    setNextPageUrl(response.data?.next_page_url);
                } else {
                    setBlogs([]);
                    setPrevPageUrl(response.data?.prev_page_url);
                    setNextPageUrl(response.data?.next_page_url);
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

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber - 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    //     if (isLoading) {
    //     return <LoaderComponent />; // Render the loader component if isLoading is true
    //   }

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);

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










 const [singleblog, setSingle]=useState("")

    useEffect(() => {
       
        getBlogsPagesApi(currentPage, itemsPerPage)
          .then((response) => {
       
      
            if (response.data && response.data?.data.length > 0) {
              const singleBlog = response.data?.data[0]; // Extract the first blog from the array
              setSingle(singleBlog);
             
            } else {
                setSingle(''); // No blog available
             
            }
          })
          .catch((error) => {
            console.error("API Error:", error);
      
          })
         
      }, []);
      

    return (
        <div>
            <div className="mein-dev-single-page-cantainer">
                <div className="container conatnier-dev-single-blog-dev">
                    <div className="col-12">
                        <div className="span-dev-page-text-page">
                            <span>
                                Did you know? SJ Computer is the first, and
                                only, marketer to protuct customers in third
                                party product liability cases
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <div className="meeting-data-blog-save-dev-form">
                                {/* <img src={blogmeeting} /> */}
                                <img
                                    src={
                                        singleblog.primary_image
                                            ? singleblog.primary_image
                                            : blogmeeting
                                    }
                                    alt={blogs.all_text}
                                />
                               
                            </div>
                            <div className="mid-graph-pargarph-page-data">
                                <span>{singleblog.title}</span>
                            </div>
                            <div className="mid-graph-pargarph-page-datap-data blog-dynamic-style-heading-data1">
                    
                              
                                <div className="content-image-data-paragrap"
                                                dangerouslySetInnerHTML={{
                                                __html: singleblog.content
                                                }}
                                            /> 
                                
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
                        <span> Trending Blogs</span>
                    </div>
                    <div>
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
                            <div className="col-md-4" key={blog.id}>
                                {isLoading ? (
                                    <LoaderComponent />
                                ) : (
                                    <Link
                                        to={`/${blog.slug}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="product-card">
                                            {/* <img src={book} alt={blog.title} /> */}

                                            <img
                                                src={
                                                    blog.thumbnail_image
                                                        ? blog.thumbnail_image
                                                        : book
                                                }
                                                alt={blog.all_text}
                                            />

                                            <div className="dev-data-span-card-dev">
                                                <span> {blog.tags}</span>
                                            </div>

                                            <div className="read-section-date-section">
                                                <div>
                                                    <span>Read me</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        {blog.publish_date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
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
                                    count={10}
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
