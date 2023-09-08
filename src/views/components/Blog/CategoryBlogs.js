import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Blog/SingleBlog/SingleBlog.css";
import blogmeetingdesktop from "@images/blog/Refurbished-Laptops-desktop.webp";
import blogmeetingmobile from "@images/blog/Refurbished-Laptops-mobile.webp";
import smimage from "@images/blog/smallimage.png";
import book from "@images/blog/blogbook.png";
import { useSelector } from "react-redux";
import LoaderComponent from "@common/LoaderComponent/LoaderComponent";
import { Link, useNavigate } from "react-router-dom";
import { getBlogsPagesApi, getCategoryApi } from "../../../core/api/blogs";
import { categoryApi } from "../../../core/api/category";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import BlogGrid from "./BlogGrid";

const CategoryBlogs = () => {
    const { categoryslug } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [expandedBlogs, setExpandedBlogs] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [categoriesblogs, setCategoriesBlogs] = useState([]);
    const [categorylist, setCategoryList] = useState([]);

    // const categoriesstate = useSelector((state) => state.category.categories);
    // console.log(categoriesstate, 'categoriesstate');

    const category_id = categorylist?.find(
        (category) => category.slug === categoryslug
    )?.id;

    useEffect(() => {
        categoryApi()
            .then((response) => {
                console.log("API Response:", response);
                setCategoryList(response?.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error("API Error:", error);
                setIsLoading(true);
            });
    }, []);

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

    // useEffect(() => {
    //     setIsLoading(true);
    //     getCategoryApi(category_id)
    //         .then((response) => {
    //             if (response.data && response.data?.data.length > 0) {
    //                 setCategoriesBlogs(response.data?.data);
    //                 setPageCount(response.data?.last_page);
    //             } else {
    //                 setBlogs([]);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("API Error:", error);
    //             setIsLoading(false);
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    // }, [category_id]);

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const navigate = useNavigate();

    const blogslist = (blog) => {
        navigate(`/${blog.slug}`, {
            state: {
                blogList: blog,
            },
        });
    };

    useEffect(() => {
        if (category_id) {
            setIsLoading(true); 
            getCategoryApi(category_id, currentPage)
                .then((response) => {
                    if ( response.data?.data?.length > 0) {
                        setCategoriesBlogs(response.data?.data);
                        setPageCount(response.data?.last_page);
                        setIsLoading(false); 
                    } else {
                        setCategoriesBlogs([]);
                        setIsLoading(false); 
                    }
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    setIsLoading(false); 
                });
        }
    }, [category_id, currentPage]);

    // useEffect(() => {

    //     getCategoryApi(category_id)
    //     .then((response) => {
    //         if (response.data && response.data?.data.length > 0) {
    //             setCategoriesBlogs(response.data?.data);
    //             setPageCount(response.data?.last_page);
    //             console.log(response?.data, 'categoriesblogs')
    //             setIsLoading(true);
    //         } else {
    //             setCategoriesBlogs([]);

    //         }
    //     })
    //       .catch((error) => {
    //         console.error("API Error:", error);
    //         setIsLoading(false);
    //       })
    //       .finally(() => {
    //         setIsLoading(false);
    //     });
    //   }, [category_id]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <div className="meeting-data-blog-save-dev-form">
                                {window.innerWidth > 600 ? (
                                    <img src={blogmeetingdesktop} />
                                ) : (
                                    <img src={blogmeetingmobile} />
                                )}
                            </div>
                            <div className="mid-graph-pargarph-page-data"></div>
                            <div className="mid-graph-pargarph-page-datap-data blog-dynamic-style-heading-data1">
                                <div className="content-image-data-paragrap" />
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {categoriesblogs.length > 0 && (
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
                <div className="blog-pagesloader-overlay">
                    <LoaderComponent />
                </div>
            ) : (
                <BlogGrid
                    blogs={categoriesblogs}
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

export default CategoryBlogs;
