import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import policyimage from "@images/Policy/polict-cart-comp.png";
import TopBar from "../TopBar/TopBar";
import DOMPurify from "dompurify"; // External library for sanitizing HTML
import "bootstrap/dist/css/bootstrap.min.css";

import {
    getBlogsPagesApi,
    blogSlugApiblogDetails,
    getBlogsHeaderPagesApi,
} from "../../../core/api/blogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTwitter,
    faFacebook,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
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

import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { useRef } from "react";
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

const useStyles = makeStyles((theme) => ({
    stickyElement: {
        position: "relative",
    },
    stickyContainer: {
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
    },
}));
const Blog = () => {
    const [blogdteails, setBlogDetails] = useState("");

    const { blogslug } = useParams();
 

    useEffect(() => {
        setIsLoading(true);
        blogSlugApiblogDetails(blogslug)
            .then((response) => {
             
                setBlogDetails(response?.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    }, [blogslug]);

    const [showMore, setShowMore] = useState(false);

    const toggleContent = () => {
        setShowMore(!showMore);
    };

    const [isLoading, setIsLoading] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);

    useEffect(() => {
        getBlogsHeaderPagesApi(currentPage, itemsPerPage)
            .then((response) => {
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
        setCurrentPage(pageNumber - 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const handlelinkClick = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        const blogContent = document.getElementById("blog-content");
        const h2Tags = blogContent.getElementsByTagName("h2");

        if (h2Tags.length > 0) {
            const firstH2Tag = h2Tags[0];
            const imgTag = document.createElement("img");
            imgTag.src = blogdteails.secondary_image
                ? blogdteails.secondary_image
                : "https://via.placeholder.com/400x400";

          
            imgTag.alt = blogdteails.all_text;

            firstH2Tag.insertAdjacentElement("afterend", imgTag);
        }
    }, [blogdteails]);

    // useEffect(() => {
    //     const blogContent = document.getElementById("blog-content");
    //     const h2Tags = blogContent.getElementsByTagName("h2");

    //     if (h2Tags.length > 0) {
    //       const firstH2Tag = h2Tags[0];
    //       if (blogdteails.secondary_image) {
    //         const imgTag = document.createElement("img");
    //         imgTag.src = blogdteails.secondary_image;
    //         imgTag.alt = blogdteails.all_text;
    //         firstH2Tag.insertAdjacentElement("afterend", imgTag);
    //       } else {
    //         const imgTags = firstH2Tag.nextElementSibling.getElementsByTagName("img");
    //         for (let i = 0; i < imgTags.length; i++) {
    //           imgTags[i].style.display = "none";
    //         }
    //       }
    //     }
    //   }, [blogdteails]);

    const classes = useStyles();
    const stickyContainerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const stickyContainer = stickyContainerRef.current;

            if (stickyContainer) {
                const rect = stickyContainer.getBoundingClientRect();
                const isSticky = rect.top <= 0;

                if (isSticky) {
                    stickyContainer.classList.add(classes.stickyContainer);
                } else {
                    stickyContainer.classList.remove(classes.stickyContainer);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [classes.stickyContainer]);

    const [readingTime, setReadingTime] = useState(0);

    const wpm = 225;
    const text = `${blogdteails.content}`;
    useEffect(() => {
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        setReadingTime(time);
    }, [text, wpm]);

    const categories = [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
        { id: 3, name: "Category 3" },
        // Add more categories as needed
    ];

    const handleClick = (event, category_id) => {
        event.preventDefault();
        window.history.pushState(null, null, `#`);
    };

    // const handleClick = (event, category_id) => {
    //     event.preventDefault();
    //     window.history.pushState(null, null, `#${category_id}`);
    //   };
  
    return (
        <div>
            <>
                <div>
                    <div>
                        <Helmet>
                            <title>{blogdteails.meta_title}</title>

                            <meta
                                name="meta-description-meta-title"
                                content={blogdteails.meta_description}
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
                                                                    {link.title}
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

                            <div className="blog-background-color">
                                <div className="container dev-container-side">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="div-left-blog-text">
                                                <span>
                                                    <span
                                                        style={{
                                                            padding: "3px",
                                                            borderRadius: "5px",
                                                            color: "whit",
                                                        }}
                                                    >
                                                        Blogs /
                                                    </span>{" "}
                                                    {blogslug}
                                                </span>
                                            </div>
                                            <div className="dive-reight-border">
                                                <div className="circle-dev-blog">
                                                    <span> {readingTime} min</span>
                                                </div>
                                                <div className="date-blog-after-circle">
                                                    <span>
                                                        {blogdteails.publish_date
                                                            ? new Date(
                                                                  blogdteails.publish_date
                                                              ).toLocaleDateString(
                                                                  "en-US",
                                                                  {
                                                                      month: "2-digit",
                                                                      day: "2-digit",
                                                                      year: "numeric",
                                                                  }
                                                              )
                                                            : null}
                                                    </span>
                                                </div>
                                                <div className="ul-item-blog-social-icon">
                                                    <a href="https://www.instagram.com/example">
                                                        <FontAwesomeIcon
                                                            icon={faInstagram}
                                                        />
                                                    </a>
                                                    <a href="https://www.facebook.com/example">
                                                        <FontAwesomeIcon
                                                            icon={faFacebook}
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
                                        <div className="col-md-9">
                                            <div className="dev-left-blog-p">
                                                <h1 className="heading-data-title-image">
                                                    {blogdteails.title}
                                                </h1>
                                            </div>
                                            <div className="div-left-blog-text-written">
                                                <span>Written by SJ Staff</span>
                                            </div>
                                            <div className="div-left-blog-text-writt">
                                                
                                                {blogdteails.categories?.map(
                                                 
                                                    (category, index) => (
                                                        <React.Fragment
                                                            key={category.id}
                                                        >
                                                            {index > 0 && (
                                                                <div className="vertical-line-blogs"></div>
                                                            )}
                                                            <div>
                                                                <Link
                                                                    to="#"
                                                                    onClick={(
                                                                        event
                                                                    ) =>
                                                                        handleClick(
                                                                            event,
                                                                            category.id
                                                                        )
                                                                    }
                                                                    className="text-decoration-none"
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </Link>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container image-cainter-dev">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="background-image-lin-dve">
                                            {/* <img
                                                                                src={meetingimage}
                                                                                alt="all_text"
                                                                            /> */}

                                            <img
                                                src={
                                                    blogdteails.primary_image
                                                        ? blogdteails.primary_image
                                                        : "https://via.placeholder.com/400x400"
                                                }
                                                alt={blogdteails.all_text}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container content-data-of-the-iamges-blogs">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className={classes.stickyElement}>
                                            <div
                                                className="main-dev-card-deprt"
                                                ref={stickyContainerRef}
                                            >
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
                                                            <div className="them-stori-mage">
                                                                <img
                                                                    src={
                                                                        blogdteails.thumbnail_image
                                                                            ? blogdteails.thumbnail_image
                                                                            : smimage
                                                                    }
                                                                    alt={
                                                                        blogdteails.all_text
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="dev-span-section4-dev">
                                                                <span>
                                                                    {
                                                                        blogdteails.all_text
                                                                    }
                                                                    principles
                                                                    by which we
                                                                    process your
                                                                    personal
                                                                    data, and
                                                                    mentions our
                                                                    responsibilities.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <div className="them-stori-mage">
                                                                <img
                                                                    src={
                                                                        blogdteails.thumbnail_image
                                                                            ? blogdteails.thumbnail_image
                                                                            : smimage
                                                                    }
                                                                    alt={
                                                                        blogdteails.all_text
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="dev-span-section4-dev">
                                                                <span>
                                                                    {
                                                                        blogdteails.all_text
                                                                    }
                                                                    principles
                                                                    by which we
                                                                    process your
                                                                    personal
                                                                    data, and
                                                                    mentions our
                                                                    responsibilities.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <div className="them-stori-mage">
                                                                <img
                                                                    src={
                                                                        blogdteails.thumbnail_image
                                                                            ? blogdteails.thumbnail_image
                                                                            : smimage
                                                                    }
                                                                    alt={
                                                                        blogdteails.all_text
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="dev-span-section4-dev">
                                                                <span>
                                                                    {
                                                                        blogdteails.all_text
                                                                    }
                                                                    principles
                                                                    by which we
                                                                    process your
                                                                    personal
                                                                    data, and
                                                                    mentions our
                                                                    responsibilities.
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-7">
                                        <div className="blog-dynamic-style-heading-data data-show-user-data-image-content">
                                            <div
                                                id="blog-content"
                                                dangerouslySetInnerHTML={{
                                                    __html: blogdteails.content,
                                                }}
                                            />

                                            {/* {blogdteails.content && (
                                                                                    <>
                                                                                        <div
                                                                                            dangerouslySetInnerHTML={{
                                                                                                __html:
                                                                                                    blogdteails.content.substring(
                                                                                                        0,
                                                                                                        600
                                                                                                    ) + "...",
                                                                                            }}
                                                                                        />
                                                                                        {blogdteails.content
                                                                                            .length > 600 && (
                                                                                            <div className="image-secondry-image">
                                                                                                <img
                                                                                                    src={
                                                                                                        blogdteails.secondary_image
                                                                                                            ? blogdteails.secondary_image
                                                                                                            : meetingset
                                                                                                    }
                                                                                                    alt={
                                                                                                        blogdteails.all_text
                                                                                                    }
                                                                                                />
                                                                                                <div className="after-data-image-secoundry-data-image">
                                                                                                    <span>
                                                                                                        {
                                                                                                            blogdteails.all_text
                                                                                                        }
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div
                                                                                                    dangerouslySetInnerHTML={{
                                                                                                        __html: blogdteails.content.substring(
                                                                                                            600
                                                                                                        ),
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        )}
                                                                                    </>
                                                                                )} */}

                                            {/* <div
                                                                                className="content-image-data-paragrap"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: insertImageAfterWords(blogdteails.content),
                                                                                }}
                                                                                /> */}

                                            {/* {!showMore && (
                                                                                    <button
                                                                                        className="show-more-button"
                                                                                        onClick={toggleContent}
                                                                                    >
                                                                                        Show More
                                                                                    </button>
                                                                                )} */}
                                            <div className="background-image-lin-dve">
                                                {/* <img
                                                                                    src={meetingset}
                                                                                    alt="Blog Image"
                                                                                /> */}
                                                {/* <div className="content-image-data-paragrap"
                                                                                dangerouslySetInnerHTML={{
                                                                                __html: blogdteails.content.substring(3000),
                                                                                }}
                                                                            />  */}
                                                {/* <div className="content-image-data-paragrap" dangerouslySetInnerHTML={{
                                  __html: showMore
                                    ? blogdteails.content
                                    : (blogdteails.content.length > 3000 ? blogdteails.content.substring(0, 3000) + "..." : blogdteails.content)
                                }} />
                                
                                {blogdteails.content.length > 3000 && !showMore &&
                                  <div className="content-image-data-paragrap" dangerouslySetInnerHTML={{
                                    __html: blogdteails.content.substring(3000)
                                  }} />
                                }
                                {console.log(blogdteails.content,'blogs of the dta')} */}
                                            </div>
                                        </div>
                                        {/* <div className="image-for-meeting2-section">
                                                                            <img src={meetingset} />
                                
                                                                            <img
                                                                            src={blog.secondary_image ? blog.secondary_image : meetingimage }
                                                                            alt={blog.all_text}
                                                                           
                                                                        />
                                                                         
                                                                        </div> */}
                                        <span className="span-deve-loram-space">
                                            {/* {blog.meta_description} */}
                                        </span>
                                        {/* <div className="dve-space-paragrapgh">
                                                                            <div className="blog-dynamic-style-heading-data">
                                                                            <div
                                                                                        dangerouslySetInnerHTML={{
                                                                                        __html: showMore
                                                                                            ? blog.content
                                                                                            : blog.content.substring(0, 700) + "...",
                                                                                        }}
                                                                                    />
                                                                                    {!showMore && blog.content.length > 700 && (
                                                                                        <div>
                                                                                        <img src={meetingset} alt="Blog Image" />
                                                                                        <div
                                                                                dangerouslySetInnerHTML={{
                                                                                __html: blog.content.substring(700),
                                                                                }}
                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                        {!showMore && (
                                                                                    <button
                                                                                        className="show-more-button"
                                                                                        onClick={toggleContent}
                                                                                    >
                                                                                        Show More
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        </div> */}

                                        {/* <div className="image-for-meeting2-section">
                                                                            <img src={meetingset} />
                                
                                                                            <img
                                                                                src={
                                                                                    blog.thumbnail_image
                                                                                        ? blog.thumbnail_image
                                                                                        : meetingimage
                                                                                }
                                                                                alt={blog.all_text}
                                                                            />
                                                                        </div>
                                                                        <div className="dve-space-paragrapgh">
                                                                            <div className="blog-dynamic-style-heading-data">
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: showMore
                                                                                            ? blog.content
                                                                                            : blog.content.substring(
                                                                                                  0,
                                                                                                  700
                                                                                              ) + "...",
                                                                                    }}
                                                                                />
                                                                                {!showMore && (
                                                                                    <button
                                                                                        className="show-more-button"
                                                                                        onClick={toggleContent}
                                                                                    >
                                                                                        Show More
                                                                                    </button>
                                                                                )}
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
                                                                            <div className="pagination-blogs-page">
                                                                         
                                
                                                                                <button
                                                                                    onClick={handlePrevPage}
                                                                                    disabled={!prevPageUrl}
                                                                                >
                                                                                    &laquo; Pre
                                                                                </button>
                                
                                                                                {Array.from(
                                                                                    { length: totalPages },
                                                                                    (_, index) => (
                                                                                        <button
                                                                                            key={index}
                                                                                            onClick={() =>
                                                                                                handlePaginationClick(
                                                                                                    index + 1
                                                                                                )
                                                                                            }
                                                                                            className={
                                                                                                currentPage ===
                                                                                                index + 1
                                                                                                    ? "active"
                                                                                                    : ""
                                                                                            }
                                                                                        >
                                                                                            {currentPage}
                                                                                        </button>
                                                                                    )
                                                                                )}
                                
                                                                                <button
                                                                                    onClick={handleNextPage}
                                                                                    disabled={!nextPageUrl}
                                                                                >
                                                                                    Nxt &raquo;
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="blog-post-paragraph-tag">
                                                                        <span>
                                                                            {
                                                                                item.tags
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
                                                                                    item.publish_date
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                    </div>
                </div>
            </>
        </div>
    );
};

export default Blog;
