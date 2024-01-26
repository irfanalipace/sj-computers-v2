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
                        <Grid lg={9}>
                            <h3 className="tech-details-heading">
                                Technical Details
                            </h3>
                        </Grid>
                        <Grid lg={3}>
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
                            sjcomputer.com Return Policy: You may return any new
                            computer purchased that is "dead on arrival,"
                            arrives in damaged condition, or is still in
                            unopened boxes, for a full refund within 30 days of
                            purchase. sjcomputers.com reserves the right to test
                            "dead on arrival" returns and impose a customer fee
                            equal to 15 percent of the product sales price if
                            the customer misrepresents the condition of the
                            product. Any returned computer that is damaged
                            through customer misuse, is missing parts, or is in
                            unsellable condition due to customer tampering will
                            result in the customer being charged a higher
                            restocking fee based on the condition of the
                            product. Amazon.com will not accept returns of any
                            desktop or notebook computer more than 30 days after
                            you receive the shipment. New, used, and refurbished
                            products purchased from Marketplace vendors are
                            subject to the returns policy of the individual
                            vendor.
                        </p>
                        <p>
                            Manufacturer’s warranty can be requested from
                            customer service. <Link>Click here </Link> to make a
                            request to customer services.
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default TechDetails;
