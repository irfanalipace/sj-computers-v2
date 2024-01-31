import React, { useEffect, useState } from "react";
import blogmeetingdesktop from "@images/blog/Refurbished-Laptops-desktop.webp";
import blogmeetingmobile from "@images/blog/Refurbished-Laptops-mobile.webp";


import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import {  useNavigate } from "react-router-dom";
import {
    getBlogsPagesApi,
} from "@api/blogs";
import BlogGrid from "@components/Blog/BlogGrid";

import "@fortawesome/fontawesome-free/css/all.min.css";

import "./Blogs.css";


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
                if (response.data?.data?.length > 0) {
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
            },
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
                                {/* <img src={blogmeeting} />
                                <img src={blogmeetingmobile}  className="mobile-image-blogs-data"/> */}
                                {window.innerWidth > 600 ? ( // Check if screen width is greater than 767px (desktop)
                                    <img src={blogmeetingdesktop} />
                                ) : (
                                    <img src={blogmeetingmobile} />
                                )}
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
                                <span></span>
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


            {blogs.length > 0 && (
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
            )}


            {isLoading ? (
                <div
                    className="blog-pagesloader-overlay"
                    style={{ display: isLoading ? "flex" : "none" }}
                >
                    <LoaderComponent />
                </div>
            ) : (
                //         <div className="container single-blog-pages-dev-container-all-products">
                //             <div className="row">
                //                 {blogs.map((blog) => (
                //                     <div
                //                         className="col-lg-4 col-md-6 col-sm-12"
                //                         key={blog?.id}
                //                     >
                //                         <div></div>
                //                         <Link
                //                             to={`/${blog?.slug}`}
                //                             className="text-decoration-none"
                //                             state={{
                //                                 blogList: blog,
                //                             }}
                //                             onClick={() => blogslist(blog)}
                //                         >
                //                             <div className="product-card product-blogs-card">
                //                                 {/* <img src={book} alt={blog.title} /> */}

                //                                 <img
                //                                     src={
                //                                         blog?.thumbnail_image

                //                                     }
                //                                     alt={blog?.alt_thumbnail_image}
                //                                 />

                //                                 <div className="dev-data-span-card-dev">
                //                                     <span> {blog?.title}</span>
                //                                 </div>
                //                                 <div className="read-more-button-blogs">
                //                                     <span>{blog?.publish_date}</span>
                //                                 </div>
                //                                 <div className="read-more-span-text">
                //                                     <span>{blog?.meta_description}</span>
                //                                 </div>
                //                                 <div className="read-section-date-section">
                //                                     <div style={{ paddingTop: "4px" }}>
                //                                         <span
                //                                             style={{
                //                                                 fontWeight: "bold",
                //                                             }}
                //                                         >
                //                                             Read Full Blog
                //                                         </span>
                //                                     </div>
                //                                     {blog?.tags && blog?.tags?.length > 0 && (
                //                                     <div style={{ display: "flex" }}>
                //                                         {blog?.tags
                //                                             ?.split(",")
                //                                             ?.slice(0, 3)
                //                                             ?.map((tag) => (
                //                                                 <div
                //                                                     className="span-data-blogs-lending-page"
                //                                                     key={tag}
                //                                                 >
                //                                                     <span>{tag}</span>
                //                                                 </div>
                //                                             ))}
                //                                     </div>
                //                                       )}
                //                                 </div>

                //                             </div>

                //                         </Link>
                //                     </div>
                //                 ))}
                //             </div>

                //             {/* <div className="pagination-blogs-page">
                //     {prevPageUrl && (
                //         <button onClick={handlePrevPage}>
                //             &laquo; Previous
                //         </button>
                //     )}

                //     {Array.from({ length: totalPages }, (_, index) => (
                //         <button
                //             key={index}
                //             onClick={() => handlePaginationClick(index + 1)}
                //             className={
                //                 currentPage === index + 1 ? "active" : ""
                //             }
                //         >
                //             {index + 1}
                //         </button>
                //     ))}

                //     {nextPageUrl && (
                //         <button onClick={handleNextPage}>Next &raquo;</button>
                //     )}
                // </div> */}

                //             <div className="pagination-blogs-page">
                //                 {/* <button onClick={handlePrevPage} disabled={!prevPageUrl}>
                //         &laquo; Pre
                //     </button>

                //     {Array.from({ length: totalPages }, (_, index) => (
                //         <button
                //             key={index}
                //             onClick={() => handlePaginationClick(index + 1)}
                //             className={
                //                 currentPage === index + 1 ? "active" : ""
                //             }
                //         >
                //             {currentPage}
                //         </button>
                //     ))}

                //     <button onClick={handleNextPage} disabled={!nextPageUrl}>
                //         Nxt &raquo;
                //     </button> */}
                //                 <div>
                //                     <Stack spacing={2}>
                //                         <Pagination
                //                             count={pageCount}
                //                             page={currentPage}
                //                             onChange={handlePageChange}
                //                         />
                //                     </Stack>
                //                 </div>
                //                 {isLoading && <div className="loader">Loading...</div>}
                //             </div>
                //         </div>
                <BlogGrid
                    blogs={blogs}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    isLoading={isLoading}
                    blogslist={blogslist}
                />
            )}
        </div>
    );
};

export default SingleBlog;
