import React, { useState } from "react";
import "./TechDetails.css";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { formatDate } from "../../../core/utils/helpers";

const TechDetails = ({ product }) => {
    const [collapseAll, setCollapseAll] = useState(true);
    const [summary, setSummary] = useState(true);
    const [other, setOther] = useState(true);
    const theme = useTheme();

    const isUpSmall = useMediaQuery(theme.breakpoints.up("md"));
    // console.log(product, "product");
    return (
        <div className="tech-details-container">
            <Grid container mt={3}>
                <Grid lg={6}>
                    <Grid container>
                        <Grid>
                            <h3
                                className="tech-details-heading"
                                style={{
                                    fontSize: !isUpSmall ? "16px" : "18px",
                                }}
                            >
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
                                {isUpSmall && (
                                    <>
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
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid lg={6}>
                    {isUpSmall && (
                        <h3 className="tech-details-heading">
                            Additional Information
                        </h3>
                    )}
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
                                                    ?.value,
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
                    {!isUpSmall && (
                        <h3
                            className="tech-details-heading"
                            style={{ fontSize: "16px" }}
                        >
                            Additional Information
                        </h3>
                    )}
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
                        <h1 style={{ fontSize: !isUpSmall && "16px" }}>
                            Warranty & Support
                        </h1>
                        <p>
                            SJ Computer offers a standard one-year warranty for
                            both laptops and desktops, beginning from the date
                            of purchase, subject to certain exclusions outlined
                            on the product page. Additionally, laptop batteries,
                            Apple products, tablets, and displays are covered by
                            a limited 90-day warranty.
                        </p>
                        <p>
                            Our warranty encompasses all expenses related to
                            parts and labor for in-house repairs of hardware
                            damage. However, it is important to note that
                            accidental damage is not covered. This warranty is
                            applicable only to consumers within the United
                            States of America, and any damage caused by the end
                            user will void the warranty.
                        </p>
                        <p>
                            We strongly recommend retaining the original box and
                            packing materials for potential warranty returns.
                            Computers returned to SJ Computers without proper
                            packaging may be considered potentially damaged,
                            potentially impacting future warranty coverage. SJ
                            Computers does not provide compensation for
                            unauthorized third-party repairs.
                        </p>
                        <p>
                            Clients are advised to uninstall any additional
                            parts or upgrades not included with the original
                            purchase before returning the computer to SJ
                            Computers. SJ Computers will not be responsible for
                            the replacement or repair of any illegal third-party
                            parts shipped with the machine for warranty service
                            if they are lost, damaged, or malfunctioning.
                        </p>
                        <p>
                            It's important to note that SJ Computers assumes no
                            responsibility for user data on machines returned
                            for warranty servicing. In the event of data
                            destruction, SJ Computers cannot be held
                            accountable. Users are encouraged to regularly back
                            up essential data. The SJ Computers Warranty
                            exclusively applies to machines purchased for
                            personal use and is non-transferable.
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default TechDetails;
