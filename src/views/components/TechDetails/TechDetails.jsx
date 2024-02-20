import React, { useState } from "react";
import "./TechDetails.css";
import { Grid } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { formatDate } from "../../../core/utils/helpers";

const TechDetails = ({ product }) => {
    const [collapseAll, setCollapseAll] = useState(true);
    const [summary, setSummary] = useState(true);
    const [other, setOther] = useState(true);
    // console.log(product, "product");
    return (
        <div className="tech-details-container">
            <Grid container mt={3}>
                <Grid lg={6}>
                    <Grid container>
                        <Grid>
                            <h3 className="tech-details-heading">
                                Technical Details
                            </h3>
                        </Grid>
                        <Grid>
                            <Grid
                                container
                                onClick={() => {
                                    setCollapseAll(!collapseAll);
                                    setSummary(!summary);
                                    setOther(!other);
                                }}
                            >
                                <Grid>
                                    {collapseAll ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </Grid>
                                <Grid>
                                    <p className="collapse-text mt-1">
                                        Collapse all
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid lg={6}>
                    <h3 className="tech-details-heading">
                        Additional Information
                    </h3>
                </Grid>
            </Grid>
            <Grid container>
                <Grid lg={6}>
                    <>
                        <Grid container onClick={() => setSummary(!summary)}>
                            <Grid>
                                {summary ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </Grid>
                            <Grid>
                                <p className="collapse-text mt-1">Summary</p>
                            </Grid>
                        </Grid>
                        {summary && (
                            <table className="tech-details-container">
                                <tr>
                                    <td>Standing screen display size</td>
                                    <td>27 Inches</td>
                                </tr>
                                <tr>
                                    <td>Screen Resolution</td>
                                    <td>1920x1080</td>
                                </tr>
                                <tr>
                                    <td>Max Screen Resolution</td>
                                    <td>1920 x 1080 Pixels</td>
                                </tr>
                            </table>
                        )}
                        <Grid container onClick={() => setOther(!other)} mt={1}>
                            <Grid>
                                {other ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </Grid>
                            <Grid>
                                <p className="collapse-text mt-1">
                                    Other Technical Details
                                </p>
                            </Grid>
                        </Grid>
                        {other && (
                            <table className="tech-details-container">
                                <tr>
                                    <td>Brand</td>
                                    <td>
                                        {product?.description?.brand?.length >
                                        0 ? (
                                            product?.description?.brand[0]
                                                ?.value
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Series</td>
                                    <td>LG27MK400HB</td>
                                </tr>
                                <tr>
                                    <td>Item model number</td>
                                    <td>
                                        {" "}
                                        {product?.description?.model_number
                                            ?.length > 0 ? (
                                            product?.description
                                                ?.model_number[0]?.value
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Item Weight</td>
                                    <td>
                                        {product?.description
                                            ?.item_package_weight?.length >
                                        0 ? (
                                            product?.description
                                                ?.item_package_weight[0]
                                                ?.value +
                                            " " +
                                            product?.description
                                                ?.item_package_weight[0]?.unit
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Product Dimensions</td>
                                    <td>
                                        {product?.description
                                            ?.item_package_dimensions?.length >
                                        0 ? (
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.height?.value +
                                            " × " +
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.length?.value +
                                            " × " +
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.width?.value +
                                            " " +
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.height?.unit
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Item Dimensions LxWxH</td>
                                    <td>
                                        {product?.description
                                            ?.item_package_dimensions?.length >
                                        0 ? (
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.height?.value +
                                            " × " +
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.length?.value +
                                            " × " +
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.width?.value +
                                            " " +
                                            product?.description
                                                ?.item_package_dimensions[0]
                                                ?.height?.unit
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Color</td>
                                    <td>Black</td>
                                </tr>
                                <tr>
                                    <td>Power Source</td>
                                    <td>AC</td>
                                </tr>
                                <tr>
                                    <td>Manufacturer</td>
                                    <td>
                                        {product?.description?.manufacturer
                                            ?.length > 0 ? (
                                            product?.description
                                                ?.manufacturer[0]?.value
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Country of Origin</td>
                                    <td>China</td>
                                </tr>
                                <tr>
                                    <td>Is Discontinued By Manufacturer</td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td>Date First Available</td>
                                    <td>
                                        {product?.description
                                            ?.product_site_launch_date?.length >
                                        0 ? (
                                            formatDate(
                                                product?.description
                                                    ?.product_site_launch_date[0]
                                                    ?.value
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </td>
                                </tr>
                            </table>
                        )}
                    </>
                </Grid>
                <Grid lg={6} mt={4}>
                    <table className="tech-details-container">
                        <tr>
                            <td>Customer Reviews</td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <StarRatings
                                        rating={product?.rating}
                                        starRatedColor="rgb(232, 126, 36)"
                                        numberOfStars={5}
                                        name="rating"
                                        isSelectable={false}
                                        starDimension={"20px"}
                                        starSpacing={"0"}
                                    />
                                    <span
                                        className="ms-2"
                                        style={{ color: "#1270c4" }}
                                    >
                                        {product?.total_review}
                                        {" Ratings"}
                                    </span>
                                </div>

                                <p className="pt-2">
                                    {product?.rating} out of 5 stars
                                </p>
                            </td>
                        </tr>
                    </table>
                    <div className="additional-info-container">
                        <h1>Warranty & Support</h1>
                        <p>
                            SJ Computer will provide normal one-year warranty coverage for laptops and desktops commencing on the purchase date, with a few exclusions listed on the product page. Laptop batteries, Apple goods, tablets, and all displays come with a limited 90-day warranty.  
                        </p>
                        <p>
                            The SJ Computers Warranty includes all costs for parts and labor connected with in-house repair of damaged hardware. Accidental damage isn't covered. This warranty only covers consumers in the United States of America. Any damage resulting from the end user will invalidate the warranty.   
                        </p>
                        <p>
                            We strongly advise you to keep the box and packing materials that came with the item in case you need to return it for warranty purposes. Computers delivered to SJ Computers with inadequate packing are considered possibly damaged and may limit future warranty coverage for that machine. REFURB.io does not offer compensation for unlawful third-party repairs.    
                        </p>
                        <p>
                            Any parts or upgrades added by the client that were not included with the computer when purchased must be uninstalled before returning it to SJ Computers. If any illegal third-party parts are shipped back with the machine for warranty servicing, SJ Computers will not be liable for replacement or repair of them if they become lost, damaged, or malfunctioning.  
                        </p>
                        <p>
                            SJ Computers assumes no responsibility for any user data on any machine returned for warranty servicing. If user data is destroyed, SJ Computers will not be held accountable in any manner. It is the user's obligation to create frequent backups of vital data. The SJ Computers Warranty will only cover machines bought for use by you and cannot be forwarded.   
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default TechDetails;
