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

    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedBlogs, setExpandedBlogs] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const { blogslug } = useParams();
    console.log('sulg-single-page-data',blogslug)
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



    // useEffect(() => {
    //     getBlogsPagesApi()
    //         .then((response) => {
               
    //             console.log("singleblogs response-pages-data:", response);
    //             setBlogs(response.data); 
    //         })
    //         .catch((error) => {
               
    //             console.error("API Error:", error);
    //         });
    // }, []);



    // const [blogs, setBlogs] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
  
    useEffect(() => {
      getBlogsPagesApi(currentPage, itemsPerPage)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setBlogs(response.data);
          }
        })
        .catch((error) => {
          // Handle the error
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
                    {/* <div className="col-md-3">
                        <div>
                            <div className="conatiner conatiner-dev-stories-dev-data-for-blog">
                                <div className="row">
                                    <div className="stories-data-effctive-blog">
                                        <span>TOP STORIES</span>
                                    </div>
                                    <div>
                                        <hr></hr>
                                    </div>
                                    <div className="col-5">
                                        <div className="smimage-stories-blog">
                                            <img src={smimage} />
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="dev-data-sngle-stories-data">
                                            <span>
                                                Lorem ipsum dolor sit amet, trt
                                                aksdg sit amet, trt aksdg asking
                                                no one
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-5">
                                        <div className="smimage-stories-blog">
                                            <img src={smimage} />
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="dev-data-sngle-stories-data">
                                            <span>
                                                Lorem ipsum dolor sit amet, trt
                                                aksdg aksdg asking asking no one
                                                trt aksdg asking no one
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-5">
                                        <div className="smimage-stories-blog">
                                            <img src={smimage} />
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="dev-data-sngle-stories-data">
                                            <span>
                                                Lorem ipsum dolor sit amet, trt
                                                aksdg sit amet trt aksdg asking
                                                no one consectetur one
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div
                                        className="col-5"
                                        style={{
                                            background:
                                                "rgba(49, 130, 67, 0.03)",
                                        }}
                                    >
                                        <div className="smimage-stories-blog">
                                            <img src={smimage} />
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="dev-data-sngle-stories-data">
                                            <span>
                                                Lorem ipsum dolor sit amet, trt
                                                aksdg sit amet, trt aksdg trt
                                                aksdg asking no one
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <hr></hr>

                                      <div className="see-all-stories-data-ever-data-dev-store-data-live">
                                      <span >
                                            See all Stories
                                        </span>
                                      </div>
                                    </div>
                                </div>
                            </div>

                            <div className="conatiner conatiner-dev-stories-dev-data-for-blog">
                                <div className="row">
                                    <div className="stories-data-effctive-blog">
                                        <span>TOP STORIES</span>
                                    </div>
                                    <div>
                                        <hr />
                                    </div>
                                    {blogs.slice(0, 5).map((blog) => (
                                        <React.Fragment key={blog.id}>
                                            <div className="col-5">
                                                <div className="smimage-stories-blog">
                                                    <img
                                                        src={
                                                            blog.thumbnail_image
                                                        }
                                                        alt={blog.all_text}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="col-7">
                                                <div className="dev-data-sngle-stories-data">
                                                    
                                                    <span>
                                                        {blog.meta_description}
                                                        
                                                    </span>
                                                 
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                   
                                    <div>
                                        <hr />
                                        <div className="see-all-stories-data-ever-data-dev-store-data-live">
                                            <span>See all Stories</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="container">
               <div className="trending-blog-filter-data">
               <div className="treding-blog-sets">
                    <span> Trending Blogs</span>
                </div>
                            <div>
                       <select value={selectedFilter} >
                    <option value="">Recent Blogs</option>
                    <option value="trending">Trending Blog</option>
                    <option value="az">Sorting A-Z</option>
                    <option value="date">Sorting by Date</option>
                </select>
                </div>
               </div>
               </div>

            <div className="container single-blog-pages-dev-container-all-products">
                {/* <div className="row">
                    <div className="col-md-4 col-lg-4 col-sm-6">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-6">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-6">
                        <div
                            className="product-card"
                            style={{ backgroundColor: "#318243" }}
                        >
                            <div
                                style={{
                                    paddingTop: "50px",
                                    paddingLeft: "12px",
                                    paddingRight: "80px",
                                    paddingBottom: "px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    <span className="span-sj-computer-side">
                                        SJ News
                                    </span>
                                </div>

                                <div className="dev-space-name-folder-span-text">
                                    <span>
                                        Sign up for the latest news, facts,
                                        analysis, and original stories about
                                        Amazon delivered to you. Sign up for the
                                        latest news, facts, analysis, and
                                        original stories about Amazon delivered
                                        to you.
                                    </span>
                                </div>
                                <div
                                    className="email-input-data-feilds"
                                    style={{
                                        color: "white",
                                    }}
                                >
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="input-email-fileds-data-file"
                                    />
                                    <button className="button-arrow-dev input-email-fileds-data-file button-arrow-dev-blog-dve ">
                                        <i className="fa-solid fa-chevron-right reight-border-icon"></i>
                                    </button>
                                </div>
                                <div className="protected-link-effectdspan-dev-blog">
                                    <span>
                                        Protected by reCAPTCHA. The Google{" "}
                                        <Link>Privacy Policy</Link> and apply.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div> */}
                    {/* {blogs.slice(0, 2).map((blog, index) => (
            <div className="col-md-4 col-lg-4 col-sm-6" key={index}>
              <div className="product-card">
                <img src={blog.thumbnail_image} alt={`Product ${index + 1}`} />
                <div className="dev-data-span-card-dev">
                  <span>{blog.content}</span>
                </div>
                <div className="read-section-date-section">
                  <div>
                    <span>Read me</span>
                  </div>
                  <div>
                    <span>{blog.content}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-4 col-lg-4 col-sm-6">
            <div className="product-card" style={{ backgroundColor: "#318243" }}>
              <div style={{ paddingTop: "50px", paddingLeft: "12px", paddingRight: "80px", paddingBottom: "px" }}>
                <div style={{ display: "flex" }}>
                  <span className="span-sj-computer-side">SJ News</span>
                </div>
                <div className="dev-space-name-folder-span-text">
                  <span>
                    Sign up for the latest news, facts, analysis, and original stories about
                    Amazon delivered to you. Sign up for the latest news, facts, analysis,
                    and original stories about Amazon delivered to you.
                  </span>
                </div>
                <div className="email-input-data-feilds" style={{ color: "white" }}>
                  <input type="email" placeholder="Enter Email" className="input-email-fileds-data-file" />
                  <button className="button-arrow-dev input-email-fileds-data-file button-arrow-dev-blog-dve">
                    <i className="fa-solid fa-chevron-right reight-border-icon"></i>
                  </button>
                </div>
                <div className="protected-link-effectdspan-dev-blog">
                  <span>
                    Protected by reCAPTCHA. The Google <Link>Privacy Policy</Link> and apply.
                  </span>
                </div>
              </div>
            </div>
          </div> */}
              

                {/* <div className="row">
                    <div className="col-md-4">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


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
              
              <span> Ready to create a WordPress blog? You’ve made an outstanding choice! Learning how to start a blog can be your path to an exciting new adventure. Lucky for you, WordPress is an excellent tool you can use for that. It’s free, user-friendly, powerful, plus it also allows you to start your blog for free (almost).</span>
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

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePaginationClick(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>


                {/* <div className="row">
  {blogs.map((blog) => (
    <div className="col-md-4" key={blog.id}>
      <div className="product-card">
        <img src={blog.primary_image} alt={blog.all_text} />
        <div className="dev-data-span-card-dev">
          <span>{blog.content}</span>
        </div>
        <div className="read-section-date-section">
          <div>
            <span>{blog.title}</span>
          </div>
          <div>
            <span>{blog.publish_date}</span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div> */}

                {/* <div className="row">
                    <div className="col-md-4">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="product-card">
                            <img src={book} alt="Product 1" />
                            <div className="dev-data-span-card-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt aksdg asking
                                    no one consectetur asking no one no one
                                    consectetur asking no one
                                </span>
                            </div>
                            <div className="read-section-date-section">
                                <div>
                                    <span>Read me</span>
                                </div>
                                <div>
                                    <span>Jun 8, 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-6">
                        <div className="card card-data-setelledted-data">
                            <div className="row no-gutters m-0">
                                <div className="col-6 custom-col p-0">
                                    <div>
                                        <img
                                            src={imageproduct1}
                                            alt="Image 1"
                                            className="image-view-blog-data"
                                        />
                                    </div>
                                    <div className="">
                                        <img
                                            src={imageproduct2}
                                            alt="Image 2"
                                            className="image-view-blog-data"
                                        />
                                    </div>
                                </div>
                                <div className="col-6 text-right custom-col p-0">
                                    <img
                                        src={imageproduct}
                                        alt="Image 3"
                                        className="image-view-blog-data2"
                                    />
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="dev-data-span-card-dev">
                                    <span>
                                        Lorem ipsum dolor sit amet, trt aksdg
                                        asking no one consectetur asking no one
                                        no one consectetur asking no one
                                    </span>
                                </div>
                                <div className="read-section-date-section">
                                    <div>
                                        <span>Read me</span>
                                    </div>
                                    <div>
                                        <span>Jun 8, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card card-data-setelledted-data">
                            <div className="row no-gutters">
                                <div>
                                    <img
                                        src={imagepencel}
                                        alt="Image 1"
                                        className="image-view-blog-dat-pencel"
                                    />
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="dev-data-span-card-dev">
                                    <span>
                                        Lorem ipsum dolor sit amet, trt aksdg
                                        asking no one consectetur asking no one
                                        no one consectetur asking no one
                                    </span>
                                </div>
                                <div className="read-section-date-section">
                                    <div>
                                        <span>Read me</span>
                                    </div>
                                    <div>
                                        <span>Jun 8, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card card-data-setelledted-data">
                            <div className="row no-gutters m-0">
                                <div className="col-6 p-0 text-right custom-col">
                                    <img
                                        src={imageproduct}
                                        alt="Image 3"
                                        className="image-view-blog-dataset"
                                    />
                                </div>
                                <div className="col-6 p-0 custom-col">
                                    <div>
                                        <img
                                            src={imageproduct1}
                                            alt="Image 1"
                                            className="image-view-blog-data3"
                                        />
                                    </div>
                                    <div className="">
                                        <img
                                            src={imageproduct2}
                                            alt="Image 2"
                                            className="image-view-blog-data3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="dev-data-span-card-dev">
                                    <span>
                                        Lorem ipsum dolor sit amet, trt aksdg
                                        asking no one consectetur asking no one
                                        no one consectetur asking no one
                                    </span>
                                </div>
                                <div className="read-section-date-section">
                                    <div>
                                        <span>Read me</span>
                                    </div>
                                    <div>
                                        <span>Jun 8, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recent-blogs-data">
                    <div>
                        <span>Recent Blog</span>
                    </div>
                    <div className="recent-blogs-data-more">
                        <span>see All</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-data-setelledted-data">
                            <div className="row m-0 ">
                                <div className="col-5 p-0">
                                    <div>
                                        <img
                                            src={imageproduct2}
                                            alt="Image 1"
                                            className="image-section-last-one"
                                        />
                                    </div>
                                    <div className="">
                                        <img
                                            src={laptopimg}
                                            alt="Image 2"
                                            className="image-section-last-one"
                                        />
                                    </div>
                                </div>
                                <div className="col-7 p-0 custom-col">
                                    <div>
                                        <img
                                            src={imagepencel}
                                            alt="Image 1"
                                            className="image-view-blog-dateta22"
                                        />
                                    </div>
                                    <div className="">
                                        <img
                                            src={imageproduct1}
                                            alt="Image 2"
                                            className="image-view-blog-dateta22"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="dev-data-span-card-dev">
                                    <span>
                                        Lorem ipsum dolor sit amet, trt aksdg
                                        asking no one consectetur asking no one
                                        no one consectetur asking no one
                                    </span>
                                </div>
                                <div className="read-section-date-section">
                                    <div>
                                        <span>Read me</span>
                                    </div>
                                    <div>
                                        <span>Jun 8, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-data-setelledted-data">
                            <div className="row ">
                                <div className="row no-gutters m-0">
                                    <div className="col-5 p-0 text-right custom-col">
                                        <img
                                            src={bloglaptop2}
                                            alt="Image 3"
                                            className="product-single-data-view-product"
                                        />
                                    </div>
                                    <div className="col-7 p-0 custom-col">
                                        <div>
                                            <img
                                                src={bloglaptop1}
                                                alt="Image 1"
                                                className="product-blog-view-data-image-peoduct-image"
                                            />
                                        </div>
                                        <div className="">
                                            <img
                                                src={imagepencel}
                                                alt="Image 2"
                                                className="product-blog-view-data-image-peoduct-image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="dev-data-span-card-dev">
                                    <span>
                                        Lorem ipsum dolor sit amet, trt aksdg
                                        asking no one consectetur asking no one
                                        no one consectetur asking no one
                                    </span>
                                </div>
                                <div className="read-section-date-section">
                                    <div>
                                        <span>Read me</span>
                                    </div>
                                    <div>
                                        <span>Jun 8, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-data-setelledted-data">
                            <img
                                src={productviewblog}
                                className="image-laptop-type-scroll"
                            />

                            <div className="card-body">
                                <div className="dev-data-span-card-dev">
                                    <span>
                                        Lorem ipsum dolor sit amet, trt aksdg
                                        asking no one consectetur asking no one
                                        no one consectetur asking no one
                                    </span>
                                </div>
                                <div className="read-section-date-section-end">
                                    <div>
                                        <span>Read me</span>
                                    </div>
                                    <div>
                                        <span>Jun 8, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <div className="position-image-data-blog">
                            <img src={meetingset} />
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="position-image-data-blog-text-data">
                            <div className="dev-green-space-dev">
                                <span>
                                    Lorem ipsum dolor sit amet, trt Lorem ipsum
                                    dolor sit amet, trt
                                </span>
                            </div>
                            <div className="space-green-card-data">
                                Lorem ipsum dolor sit amet, trt aksdg asking no
                                one consectetur asking no one consectetur
                                jsjshdi. Lorem ipsum dolor sit amet, trt aksdg
                                asking no one consectetur asking no one c.
                            </div>
                            <div className="learn-more-blog-button">
                                <button>
                                    Learn <small>more</small>{" "}
                                    <i className="fas fa-arrow-right fa-0x"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SingleBlog;
