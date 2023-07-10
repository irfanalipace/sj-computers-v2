import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SingleBlog.css";
import blogmeeting from "@images/blog/meetingblog-page2.png";
import smimage from "@images/blog/smallimage.png";
import book from "@images/blog/blogbook.png";

import { Link } from "react-router-dom";

import imageproduct from "@images/blog/product.png";
import imageproduct1 from "@images/blog/product1.png";
import imageproduct2 from "@images/blog/product2.png";
import imagepencel from "@images/blog/imagepen.png";
import laptopimg from "@images/blog/latopimage.png";
import bloglaptop1 from "@images/blog/bookwithlaptop.png";
import bloglaptop2 from "@images/blog/laptopwithbook2.png";
import productviewblog from "@images/blog/typelaptop.png";
import { getBlogsPagesApi } from "../../../../core/api/blogs";
import meetingset from "@images/blog/meeting2image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SingleBlog = () => {
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect(() => {
        setIsLoading(true);
        getBlogsPagesApi(currentPage, itemsPerPage)
            .then((response) => {
                console.log(response,'lnffffffff"')

                if (response.data && response.data?.data.length > 0) {
                    setBlogs(response.data?.data);
                    setPrevPageUrl(response.data?.prev_page_url);
                    setNextPageUrl(response.data?.next_page_url);
                } else {
                    setBlogs([]);
                    setPrevPageUrl(response.data?.prev_page_url);
                    setNextPageUrl(response.data?.next_page_url);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("API Error:", error);
                setIsLoading(false);
            });
    }, [currentPage, itemsPerPage]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    //    console.log('responseof paginationClasses',currentItems)

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
                                <img src={blogmeeting} />
                                
                            </div>
                            <div className="mid-graph-pargarph-page-data">
                                <span>Title of My Blogs</span>
                            </div>
                            <div className="mid-graph-pargarph-page-datap-data blog-dynamic-style-heading-data1">
                                Did you know? SJ Computer is the first, and
                                only, marketer to protuct customers in third
                                party product liability cases Did you know? SJ
                                Computer is the first, and only, marketer to
                                protuct customers in third party product
                                liability cases Did you know? SJ Computer is the
                                first, and only, marketer to protuct customers
                                in third party product liability cases
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

            <div className="container single-blog-pages-dev-container-all-products">
                <div className="row">
                    {blogs.map((blog) => (
                        <div className="col-md-4" key={blog.id}>
                            <Link to={`/${blog.slug}`} className="text-decoration-none">
                                <div className="product-card">
                                    {/* <img src={book} alt={blog.title} /> */}


                                    <img
                                            src={blog.thumbnail_image ? blog.thumbnail_image : book }
                                            alt={blog.all_text}
                                           
                                        /> 


                                     <div className="dev-data-span-card-dev">
                                     <span>
                                        {" "}
                                      {blog.tags}
                                    </span>
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
  <button onClick={handlePrevPage}>&laquo; Previous</button>
  
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePaginationClick(index + 1)}
      className={currentPage === index + 1 ? "active" : ""}
    >
      {index + 1}
    </button>
  ))}

  <button onClick={handleNextPage}>Next &raquo;</button>
</div>


            </div>
        </div>
    );
};

export default SingleBlog;
