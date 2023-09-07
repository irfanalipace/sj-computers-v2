import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Blog.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    getBlogsPagesApi,
    blogSlugApiblogDetails,
    getBlogsHeaderPagesApi,
    getBlogCategories,
} from "../../../core/api/blogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTwitter,
    faFacebook,
    faYoutube,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import NotFound from "../../pages/NotFound/NotFound";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import smimage from "@images/blog/smallimage.png";
import primardataimage from "@images/blog/meeting.png";
import { Loader } from "@mantine/core";

const HeadereLinks = [
    { path: "/about_us", title: "About Us" },
    { path: "/", title: "What We Do?" },
    { path: "/return_refund_policy", title: "Return & Refund" },
    { path: "/shipping_policy", title: "Shipping Policy" },
    { path: "/term_services", title: "Terms of Services" },
    { path: "/privacy_policy", title: "Privacy Policy" },
    { path: "/", title: "Subscribe" },
];

const Blog = () => {
    const location = useLocation();
    const { blogList } = location.state || {};

    const { categoryslug } = useParams();

    const [blogdteails, setBlogDetails] = useState("");
    const [blogsdetailserror, setBlogdetailsError] = useState(false);

    const [blogLoading, setblogLoading] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const { blogslug } = useParams();

    const [visibleCategories, setVisibleCategories] = useState(8);
    const blogscategories = useSelector((state) => state.category.categories);

    let RenderedCategories = blogscategories
        .slice(0, visibleCategories)
        ?.map((category) => (
            <li key={category.id}>
                <Link
                    to={`/blogs/category/${category.slug}`}
                    className="text-decoration-none"
                >
                    {category.name}
                </Link>
                {console.log(category, "category data")}
            </li>
        ));

    useEffect(() => {
        if (blogList) {
            setBlogDetails(blogList);
        } else {
            setblogLoading(true);
            blogSlugApiblogDetails(blogslug)
                .then((response) => {
                    setBlogDetails(response?.data);

                    setblogLoading(false);
                })
                .catch((error) => {
                    console.error("API Error:", error);
                        setBlogdetailsError(true);
                        setblogLoading(false);
                });
        }

        getBlogsHeaderPagesApi()
        .then((response) => {
            if (response.data?.data?.length > 0) {
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
        });
    }, [blogslug]);

    const [showMore, setShowMore] = useState(false);

    const toggleContent = () => {
        setShowMore(!showMore);
    };



  

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

    const totalPages = Math.ceil(blogs?.length / itemsPerPage);

    useEffect(() => {
        if (blogdteails?.id) {
            console.log('@@@@ blogdteails: ', blogdteails);
            try {
            
            const blogContent = document.getElementById("blog-content");
            const h2Tags = blogContent.getElementsByTagName("h2");

            if (
                h2Tags?.length > 0 &&
                blogdteails.secondary_image &&
                blogdteails.alt_secondary_image
            ) {
                const firstH2Tag = h2Tags[0];
                const imgTag = document.createElement("img");
                imgTag.src = blogdteails.secondary_image;
                imgTag.alt = blogdteails.alt_secondary_image;

                firstH2Tag.insertAdjacentElement("afterend", imgTag);
            }
        } catch (error) {}
            const wpm = 225;
            const text = `${blogdteails.content}`;
                const words = text.trim()?.split(/\s+/)?.length;
                const time = Math.ceil(words / wpm);
                setReadingTime(time);
        }

        
    }, [blogdteails]);

    // useEffect(() => {
    //     const blogContent = document.getElementById("blog-content");
    //     const h2Tags = blogContent.getElementsByTagName("h2");

    //     if (h2Tags.length > 0) {
    //         const firstH2Tag = h2Tags[0];
    //         const imgTag = document.createElement("img");
    //         imgTag.src = blogdteails.secondary_image

    //         imgTag.alt = blogdteails.alt_secondary_image;

    //         firstH2Tag.insertAdjacentElement("afterend", imgTag);
    //     }
    // }, [blogdteails]);

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

    const [readingTime, setReadingTime] = useState(0);

    

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

    // useEffect(() => {
    //     getBlogCategories(categoryslug)
    //         .then((response) => {
    //             console.log("API Response:", response); // List of the Category Blogs Show Here
    //             setCategoriesBlogs(response);
    //             console.log(response, 'response aapi');
    //         })
    //         .catch((error) => {
    //             console.error("API Error:", error);
    //             if (error) {
    //                 setBlogdetailsError(true);
    //             }
    //         });
    // }, [categoryslug]);

    if (blogLoading) {
        return (
            <div className="text-center">
                <Loader />
            </div>
        );
    }


    const sortedBlogs = blogs.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

    return (
        <>
            {blogsdetailserror ? (
                <NotFound />
            ) : blogList || blogdteails ? (
                <div>
                    <div>
                        <Helmet>
                            <title>{blogdteails.meta_title}</title>

                            <meta
                                name="description"
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
                                                    <span>
                                                        {" "}
                                                        {readingTime} min
                                                    </span>
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
                                                    <a href="https://www.instagram.com/sjcomputersllc/">
                                                        <FontAwesomeIcon
                                                            icon={faInstagram}
                                                        />
                                                    </a>
                                                    <a href="https://www.facebook.com/sjcomputersllc">
                                                        <FontAwesomeIcon
                                                            icon={faFacebook}
                                                        />
                                                    </a>
                                                    <a href="https://www.linkedin.com/company/sj-computers/">
                                                        <FontAwesomeIcon
                                                            icon={faLinkedin}
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

                            <div
                                className="container image-cainter-dev"
                                style={{ height: "400px" }}
                            >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="background-image-lin-dve ">
                                            {/* <img
                                                                         src={primardataimage}
                                                                         alt="all_text"
                                                                     /> */}
                                            {/* {blogdteails.primary_image &&
                                                blogdteails.all_text && (
                                                    <img
                                                        src={
                                                            blogdteails.primary_image
                                                        }
                                                        alt={
                                                            blogdteails.all_text
                                                        }
                                                    />
                                                )} */}

                                            <div>
                                                {/* <img
                                        src={blogdteails.primary_image}
                                        alt={blogdteails.all_text}
                                    /> */}
                                                <img
                                                    src={
                                                        blogdteails.primary_image
                                                    }
                                                    alt={blogdteails.all_text}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container content-data-of-the-iamges-blogs">
                                <div className="row">
                                    <div className="col-md-3 top-stories-data">
                                    <div className="main-dev-card-deprt">
  <div className="left-dev-span-stories">
    <span>Recent Articles</span>
  </div>
  <div>
    <hr />
  </div>
  <div style={{ padding: "7px" }}>
  {blogs?.map((blog) => (
    
    <div key={blog.id}>
         { console.log(blogs,'response.data?.data')}
      <Link to={`/${blog?.slug}`} className="text-decoration-none">
        <div className="row">
          <div className="col-4">
            <div className="them-stori-mage">
              <img src={blog?.thumbnail_image} alt={blog?.alt_thumbnail_image} />
            </div>
          </div>
          <div className="col-8">
            <div className="dev-span-section4-dev">
              <span className="read-more-span-text">
                {blog?.meta_description}
              </span>
            </div>
           
          </div>
        </div>
      </Link>
      <hr />
    </div>
  ))}
  </div>
</div>



                                        {blogscategories?.length > 0 && (
                                            <div className="widget widget_categories">
                                                <h4>Category</h4>
                                                {RenderedCategories}
                                            </div>
                                        )}

                                        {/* <div className="widget widget_categories">
                                            <h4>Category</h4>
                                           
                                          
                                              {RenderedCategories}
                            
                      
                                          
                                        </div> */}
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
            ) : (
                <></>
            )}
        </>
    );
};

export default Blog;
