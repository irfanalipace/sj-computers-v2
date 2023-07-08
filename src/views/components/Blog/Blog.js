import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import policyimage from "@images/Policy/polict-cart-comp.png";
import TopBar from "../TopBar/TopBar";
import { getBlogsPagesApi } from "../../../core/api/blogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTwitter,
    faFacebook,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import meetingimage from "@images/blog/meeting.png";
import smimage from "@images/blog/smallimage.png";
import meetingset from "@images/blog/meeting2image.png";
import meetingset1 from "@images/blog/videoimagemeeting1.png";
import meetingset2 from "@images/blog/videoimagemeeting2.png";
import meetingset3 from "@images/blog/videoimagemeeting3.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const HeadereLinks = [
    { path: "/", title: "About Us" },
    { path: "/", title: "What We Do?" },
    { path: "/term_services", title: "Return & Refund" },
    { path: "/term_services", title: "Shipping Policy" },
    { path: "/term_services", title: "Terms of Services" },
    { path: "/term_services", title: "Privacy Policy" },
    { path: "/", title: "Subscribe" },
];
const nonHeaderRoutes = [""];
    const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const { blogslug } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    console.log('blog-id-data',blogslug)

    const data = [
        {
            id: 1,
            image: meetingset1,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            date: "Jun 8, 2023",
        },
        {
            id: 2,
            image: meetingset2,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            date: "Jun 9, 2023",
        },
        {
            id: 3,
            image: meetingset3,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            date: "Jun 10,",
        }
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        getBlogsPagesApi()
            .then((response) => {
                setBlogs(response.data);
                
            })
            .catch((error) => {
                // Handle the error
                console.error("API Error:", error);
            });
    }, []);



    const [blog, setBlog] = useState(null);

    useEffect(() => {
      getBlogsPagesApi()
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const firstBlog = response.data[0];
            console.log(firstBlog,'responseof all blog-data')
            setBlog(firstBlog);
          }
        })
        .catch((error) => {
          // Handle the error
          console.error("API Error:", error);
        });
    }, []);
  
    if (!blog) {
      return <div>Loading...</div>;
    }
  



    

    
    // const blogsdata = blogs.map((blog) => {});

    
    return (
        <div>
            {/* {!nonHeaderRoutes.includes(
                        location.pathname.split("/")[1]
                    ) && ( */}
            <>
                <div>
                   
                        <div>
                            <Helmet>
                                <title>{blog.meta_title}</title>
                                
                                <meta
                                    name="meta-description-meta-title"
                                    content={blog.meta_description}
                                />
                            </Helmet>
                            <div className="">
                                <div className="row">
                                    <div>
                                        <header className="topBar px-3 policy-header-topbar">
                                            <div className="topBar-inner-policy">
                                                <div className="menuBar-policy">
                                                    <ul className="text-decoration-none policy-menu-item-list">
                                                        {HeadereLinks.map(
                                                            (link, index) => (
                                                                <li
                                                                    className="policy-listitem"
                                                                    key={index}
                                                                >
                                                                    <Link
                                                                        to={
                                                                            link.path
                                                                        }
                                                                        className="text-decoration-none text-color hover-effect-sets-topbar hover-text-color-policy-comp"
                                                                    >
                                                                        {
                                                                            link.title
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </header>
                                    </div>
                                </div>

                           
                                <div
                                    className="blog-background-color"
                                    key={blog.id}
                                >
                                    <div className="container dev-container-side">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="div-left-blog-text">
                                                    <span>
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    "#ffff00",
                                                                padding: "3px",
                                                                borderRadius:
                                                                    "5px",
                                                                color: "black",
                                                            }}
                                                        >
                                                
                                                            Blog
                                                        </span>{" "}
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    "#ffff00",
                                                                padding: "3px",
                                                                borderRadius:
                                                                    "5px",
                                                                color: "black",
                                                            }}
                                                        >
                                                            {" "}
                                                            {blog.tags}
                                                        </span>
                                                        {blog.lsi}
                                                    </span>
                                                </div>
                                                <div className="dive-reight-border">
                                                    <div className="circle-dev-blog">
                                                        <span>3 min</span>
                                                    </div>
                                                    <div className="date-blog-after-circle">
                                                        <span>
                                                            {blog.publish_date}
                                                        </span>
                                                    </div>
                                                    <div className="ul-item-blog-social-icon">
                                                        <a href="https://www.instagram.com/example">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faInstagram
                                                                }
                                                            />
                                                        </a>
                                                        <a href="https://www.facebook.com/example">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faFacebook
                                                                }
                                                            />
                                                        </a>
                                                        <a href="https://www.youtube.com/example">
                                                            <FontAwesomeIcon
                                                                icon={faYoutube}
                                                            />
                                                        </a>
                                                        <a href="https://twitter.com/example">
                                                            <FontAwesomeIcon
                                                                icon={faTwitter}
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-10">
                                                <div className="dev-left-blog-p">
                                                    <h3> {blogslug}</h3>
                                                    <span>{blog.title}</span>
                                                </div>
                                                <div className="div-left-blog-text-written">
                                                    <span>
                                                        Written by SJ Staff
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="container image-cainter-dev">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="background-image-lin-dve">
                                                <img
                                                    src={meetingimage}
                                                    alt="all_text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="container dev-container-side">
                                    <div className="row">
                                        <div className="col-md-3 ">
                                            <div className="">
                                                <div className="circle-dev-blog1">
                                                    <span>3 min</span>
                                                </div>
                                                <div className="reading-blog-after-circle">
                                                    <span>Reading:</span>
                                                </div>

                                                <div className="span-dev-paragraph">
                                                    <span>
                                                     
                                                     {blog.meta_description}
                                                    </span>
                                                </div>
                                                <div className="ul-item-blog-social-icon2">
                                                    <div className="div-social-dev-blog-p2">
                                                        <a href="https://www.instagram.com/example">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faInstagram
                                                                }
                                                            />
                                                        </a>
                                                        <a href="https://www.facebook.com/example">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faFacebook
                                                                }
                                                            />
                                                        </a>
                                                        <a href="https://www.youtube.com/example">
                                                            <FontAwesomeIcon
                                                                icon={faYoutube}
                                                            />
                                                        </a>
                                                        <a href="https://twitter.com/example">
                                                            <FontAwesomeIcon
                                                                icon={faTwitter}
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="dev-left-blog-data-flow ">
                                                 <span>
                                                  
                                                       {blog.title}
                                                </span> 
                                
                                

                                            </div>
                                 
                                            <div className="dev-left-blog-section2">
                                               
                                   
                                   <div className="blog-dynamic-style-heading-data">
                                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                    </div>

                                            </div>         
                                        </div>
                                    </div>
                                </div> */}

                                <div className="container content-data-of-the-iamges-blogs">
                                    <div className="row">
                                        <div className="col-md-3">
                                       <div>
                                       <div className="main-dev-card-deprt">
                                                <div className="left-dev-span-stories">
                                                    <span>
                                                        STORIES WE THINK YOU’LL
                                                        LIKE
                                                    </span>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>
                                                <div style={{ padding: "7px" }}>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <img
                                                                src={smimage}
                                                            />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="dev-span-section4-dev">
                                                                <span>
                                                                  
                                                                    {blog.meta_description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <img
                                                                src={smimage}
                                                            />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="dev-span-section4-dev">
                                                                <span>
                                                                  
                                                                   {blog.meta_description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <img
                                                                src={smimage}
                                                            />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="dev-span-section4-dev">
                                                                <span>
                                                                  
                                                                     {blog.meta_description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                       </div>
                                        </div>

                                 

                                        <div className="col-md-6">
                                            <div className="blog-dynamic-style-heading-data data-show-user-data-image-content">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: blog.content,
                                                    }}
                                                />
                                            </div>
                                            <div className="image-for-meeting2-section">
                                                <img src={meetingset} />

                                                {/* <img
                                            src={blog.secondary_image ? blog.secondary_image : meetingimage }
                                            alt={blog.all_text}
                                        /> */}
                                            </div>
                                            <span className="span-deve-loram-space">
                                                {blog.meta_description}
                                            </span>
                                            <div className="dve-space-paragrapgh">
                                                {/* <span>
                                                     Lorem ipsum dolor sit amet,
                                                    trt aksdg asking no one
                                                    consectetur asking no one
                                                    consectetur jsjshdi. Lorem
                                                    ipsum dolor sit amet, trt
                                                    aksdg asking no one
                                                    consectetur asking no one c.
                                                    Lorem ipsum dolor sit amet,
                                                    trt aksdg asking no one
                                                    consectetur asking no one
                                                    consectetur jsjshdi. Lorem
                                                    ipsum dolor sit amet, trt
                                                    aksdg asking no one
                                                    consectetur asking no one c. 
                                                    {blog.content}
                                                </span> */}

                                                <div className="blog-dynamic-style-heading-data">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: blog.content,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="image-for-meeting2-section">
                                                <img src={meetingset} />

                                                {/* <img
                                            src={blog.thumbnail_image ? blog.thumbnail_image : meetingimage }
                                            alt={blog.all_text}
                                        /> */}
                                            </div>
                                            <div className="dve-space-paragrapgh">
                                                {/* <span>
                                                     Lorem ipsum dolor sit amet,
                                                    trt aksdg asking no one
                                                    consectetur asking no one
                                                    consectetur jsjshdi. Lorem
                                                    ipsum dolor sit amet, trt
                                                    aksdg asking no one
                                                    consectetur asking no one c.
                                                    Lorem ipsum dolor sit amet,
                                                    trt aksdg asking no one
                                                    consectetur asking no one
                                                    consectetur jsjshdi. Lorem
                                                    ipsum dolor sit amet, trt
                                                    aksdg asking no on
                                                    consectetur asking no one c. 
                                                    {blog.content}
                                                </span> */}
                                                <div className="blog-dynamic-style-heading-data">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: blog.content,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="dev-card-for-sj-computer-data">
                                                <div className="dev-card-for-sj-computer-data-div">
                                                    <span>
                                                        Sign up for weekly Sj
                                                        Computer newsletter
                                                    </span>
                                                </div>
                                                <div class="email-input">
                                                    <input
                                                        type="email"
                                                        placeholder="Enter Email"
                                                    />
                                                    <button className="button-arrow-dev">
                                                        <i className="fa-solid fa-chevron-right reight-border-icon"></i>
                                                    </button>
                                                </div>
                                                <div className="protected-link-effectd">
                                                    <span>
                                                        Protected by reCAPTCHA.
                                                        The Google{" "}
                                                        <Link>
                                                            Privacy Policy
                                                        </Link>{" "}
                                                        and apply.
                                                    </span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div style={{ background: "rgba(49, 130, 67, 0.1)" }}>
                    <div className="container container-blog-data-footer">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="sj-left-dev-set-data-from-section">
                                    <span>More from SJ</span>
                                 <Stack spacing={2}>
                                <Pagination count={3} shape="rounded" />
                            
                                </Stack>
                                </div>
                            </div>
                            <div className="col-md-9 col-sm-10">
                                <div  className="card-dev-container-mobile-space-section-age-cart">
                                    <div className="row">
                                    <div className="col-md-3 col-sm-6 col-6">
                                            <div className="image-fooetr-blog">
                                                <img
                                                    className="image-for-blog-data-sets-view"
                                                    src={meetingset1}
                                                />
                                            </div>
                                            <div
                                             className="dev-folder-card-blog-section-dev-page"
                                                style={{ background: "white" }}
                                            >
                                                <div
                                                    className="dve-sj-computers-icon-dev-blog"
                                                >
                                                    <span className="image-fooetr-blog">
                                                        SJ
                                                    </span>
                                                </div>
                                                <div className="blog-post-paragraph-tag">
                                                    <span>
                                                        Lorem ipsum dolor sit
                                                        amet, Lorem ne
                                                        consectetur jsjshdi.{" "}
                                                    </span>
                                                </div>

                                                <div className="read-date-blog-post-data">
                                                    <div>
                                                        <span className="read-more-blog">
                                                            Read more..
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="read-more-date-with-data-date">
                                                            Jun 8,2023
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-6">
                                            <div className="image-fooetr-blog">
                                                <img
                                                    src={meetingset1}
                                                    className="image-for-blog-data-sets-view"
                                                />
                                            </div>
                                            <div
                                             className="dev-folder-card-blog-section-dev-page"
                                                style={{ background: "white" }}
                                            >
                                                <div
                                                 
                                                    className="dve-sj-computers-icon-dev-blog"
                                                >
                                                    <span className="image-fooetr-blog">
                                                        SJ
                                                    </span>
                                                </div>
                                                <div className="blog-post-paragraph-tag">
                                                    <span>
                                                        Lorem ipsum dolor sit
                                                        amet, Lorem ne
                                                        consectetur jsjshdi.{" "}
                                                    </span>
                                                </div>

                                                <div className="read-date-blog-post-data">
                                                    <div>
                                                        <span className="read-more-blog">
                                                            Read more..
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="read-more-date-with-data-date">
                                                            Jun 8,2023
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6 col-6">
                                            <div className="image-fooetr-blog">
                                                <img
                                                    src={meetingset1}
                                                    className="image-for-blog-data-sets-view"
                                                />
                                            </div>
                                            <div
                                            className="dev-folder-card-blog-section-dev-page"
                                                style={{ background: "white" }}
                                            >
                                                <div
                                                   className="dve-sj-computers-icon-dev-blog"
                                                >
                                                    <span className="image-fooetr-blog">
                                                        SJ
                                                    </span>
                                                </div>
                                                <div className="blog-post-paragraph-tag">
                                                    <span>
                                                        Lorem ipsum dolor sit
                                                        amet, Lorem ne
                                                        consectetur jsjshdi.{" "}
                                                    </span>
                                                </div>

                                                <div className="read-date-blog-post-data">
                                                    <div>
                                                        <span className="read-more-blog">
                                                            Read more..
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="read-more-date-with-data-date">
                                                            Jun 8,2023
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                            <div
                                style={{ background: "rgba(49, 130, 67, 0.1)" }}
                            >
                                <div className="container container-blog-data-footer">
                                    {/* Pagination */}
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="sj-left-dev-set-data-from-section">
                                                <span>More from SJ</span>
                                                <Pagination
                                                    count={Math.ceil(
                                                        data.length /
                                                            itemsPerPage
                                                    )}
                                                    shape="rounded"
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-9 col-sm-10">
                                            <div className="card-dev-container-mobile-space-section-age-cart">
                                                <div className="row">
                                                    {/* Render the current items */}
                                                    {blogs.map((blog) => (
                                                        <div
                                                            key={blog.id}
                                                            className="col-md-3 col-sm-6 col-6"
                                                        >
                                                            <div className="image-fooetr-blog">
                                                                {/* <img
                                                            className="image-for-blog-data-sets-view"
                                                            src={item.image}
                                                            alt="Card"
                                                        /> */}
                                                                <img
                                                                    src={
                                                                        blog.thumbnail_image
                                                                    }
                                                                    alt={
                                                                        blog.all_text
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className="dev-folder-card-blog-section-dev-page"
                                                                style={{
                                                                    background:
                                                                        "white",
                                                                }}
                                                            >
                                                                <div className="dve-sj-computers-icon-dev-blog">
                                                                    <span className="image-fooetr-blog">
                                                                        SJ
                                                                    </span>
                                                                </div>
                                                                <div className="blog-post-paragraph-tag">
                                                                    <span>
                                                                        {
                                                                            blog.meta_description
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="read-date-blog-post-data">
                                                                    <div>
                                                                        <span className="read-more-blog">
                                                                            Read
                                                                            more..
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="read-more-date-with-data-date">
                                                                            {
                                                                                blog.publish_date
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                </div>
            </>
            {/* )} */}
        </div>
    );
};

export default Blog;
