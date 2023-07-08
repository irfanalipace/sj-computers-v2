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

    const [blogs, setBlogs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    useEffect(() => {
        getBlogsPagesApi(currentPage, itemsPerPage)
            .then((response) => {
                if (response.data && response.data?.data.length > 0) {
                    setBlogs(response.data?.data);
                    console.log(response?.data, "data response blog-data");
                }
            })
            .catch((error) => {
              
                console.error("API Error:", error);
            });
    }, [currentPage, itemsPerPage]);

    if (blogs.length === 0) {
        return <div>Loading...</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                    {/* <div className="col-md-3">
                        <div className="container container-card-slice-dev">
                            <div className="row">
                                <div className="col-12">
                                    <div className="newsfeed-data-space">
                                        <span>NEWSFEED</span>
                                    </div>
                                    <hr></hr>
                                    <div className="text-data-span-graph-p-card-blog">
                                        <span>
                                            Lorem ipsum dolor sit amet, trt
                                            aksdg asking no one consectetur sit
                                        </span>
                                    </div>
                                    <div className="jun-date-space-card-blog">
                                        <span>Jun 8, 2023</span>
                                    </div>

                                    <hr></hr>
                                    <div className="text-data-span-graph-p-card-blog">
                                        <span>
                                            Lorem ipsum dolor sit amet, trt
                                            aksdg asking no one consectetur sit
                                        </span>
                                    </div>
                                    <div className="jun-date-space-card-blog">
                                        <span>Jun 8, 2023</span>
                                    </div>

                                    <hr></hr>
                                    <div className="text-data-span-graph-p-card-blog">
                                        <span>
                                            Lorem ipsum dolor sit amet, trt
                                            aksdg asking no one consectetur sit
                                        </span>
                                    </div>
                                    <div className="jun-date-space-card-blog">
                                        <span>Jun 8, 2023</span>
                                    </div>
                                    <hr></hr>

                                    <div className="text-data-span-graph-p-card-blog">
                                        <span>
                                            Lorem ipsum dolor sit amet, trt
                                            aksdg asking no one consectetur sit
                                        </span>
                                    </div>
                                    <div className="jun-date-space-card-blog">
                                        <span>Jun 8, 2023</span>
                                    </div>
                                    <hr></hr>
                                    <div className="more-data-add-blog-space">
                                        <span>More</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container container-card-slice-dev">
                            <div className="row">
                                <div className="col-12">
                                    <div className="newsfeed-data-space">
                                        <span>NEWSFEED</span>
                                    </div>
                                    <hr />
                                    {blogs.slice(0, 6).map((blog) => (
                                        <React.Fragment key={blog.id}>
                                            <div className="text-data-span-graph-p-card-blog">
                                                <span>
                                                    {blog.meta_description}
                                                </span>
                                            </div>
                                            <div className="jun-date-space-card-blog">
                                                <span>{blog.publish_date}</span>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    ))}
                                    <div className="more-data-add-blog-space">
                                        <span>More</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-md-12">
                        {blogs.map((blog) => (
                            <div key={blog.id}>
                                <div className="meeting-data-blog-save-dev-form">
                                    <img src={blogmeeting} />
                                </div>
                                <div className="mid-graph-pargarph-page-data">
                                    <span>{blog.title}</span>
                                </div>
                                <div className="mid-graph-pargarph-page-datap-data blog-dynamic-style-heading-data1">
                                    {expandedBlogs.includes(blog.id) ? (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: blog.content,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: blog.content.slice(
                                                    0,
                                                    400
                                                ),
                                            }}
                                        />
                                    )}
                                </div>

                                <div>
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
                                </div>
                            </div>
                        ))}
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
                    {currentItems.map((blog) => (
                        <div className="col-md-4" key={blog.id}>
                            <div className="product-card">
                                <img src={book} alt={blog.title} />
                                {/* <div className="dev-data-span-card-dev">
              <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: blog.content,
                                                    }}
                                                />
                                            </div> */}

                                <span>
                                    {" "}
                                    Ready to create a WordPress blog? You’ve
                                    made an outstanding choice! Learning how to
                                    start a blog can be your path to an exciting
                                    new adventure. Lucky for you, WordPress is
                                    an excellent tool you can use for that. It’s
                                    free, user-friendly, powerful, plus it also
                                    allows you to start your blog for free
                                    (almost).
                                </span>
                                <div className="read-section-date-section">
                                    <div>
                                        <span>Read me</span>
                                    </div>
                                    <div>
                                        <span>{blog.publish_date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination-blogs-page">
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
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
