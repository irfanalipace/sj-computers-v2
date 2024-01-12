import React, { useState } from "react";
import bulletpoint1 from "../../../assets/images/bulletpoint1.png";
import bulletpoint2 from "../../../assets/images/bulletpoint2.png";
import bulletpoint3 from "../../../assets/images/bulletpoint3.png";
import "./ProductCard.css";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarRatings from "react-star-ratings";

const ProtectionPlanDrawer = () => {
    const [showThreeYearPlanDetails, setShowThreeYearPlanDetails] =
        useState(false);
    const [showFourYearPlanDetails, setShowFourYearPlanDetails] =
        useState(false);
    const [showTechUnlimitedPlanDetails, setShowTechUnlimitedPlanDetails] =
        useState(false);

    // Function to toggle accordion content
    const toggleAccordion = (plan) => {
        if (plan === "threeYear") {
            setShowThreeYearPlanDetails(!showThreeYearPlanDetails);
        } else if (plan === "fourYear") {
            setShowFourYearPlanDetails(!showFourYearPlanDetails);
        } else if (plan === "techUnlimited") {
            setShowTechUnlimitedPlanDetails(!showTechUnlimitedPlanDetails);
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h1 className="heading-protection-plan mb-3">Add to your order</h1>
            <div className="info mb-3">
                <img src={bulletpoint1} />
                <p>
                    Coverage for accidental damage including drops, spills, and
                    broken parts, as <br />
                    well as breakdowns (plans vary)
                </p>
            </div>
            <div className="info mb-3">
                <img src={bulletpoint2} />
                <p>24/7 support when you need it.</p>
            </div>
            <div className="info mb-3">
                <img src={bulletpoint3} />
                <p>Quick, easy, and frustration-free claims.</p>
            </div>
            <div className="info">
                <p>Cover This Product</p>
            </div>
            <div className="protc-paln-option">
                <div>
                    <Checkbox />
                    <p>3-Year Proection</p>{" "}
                    <p style={{ color: "red" }}>&nbsp;$23.99</p>
                </div>
                <button onClick={() => toggleAccordion("threeYear")}>
                    <KeyboardArrowDownIcon style={{ marginTop: "-2px" }} />{" "}
                    Learn More
                </button>
                {showThreeYearPlanDetails && (
                    <div className="accordion-content">
                        <h3>3 Year Equippment Protection Plan</h3>
                        <p className="title">From Asurion, LLC</p>
                        <div style={{ marginTop: "-15px" }}>
                            <StarRatings
                                rating={258}
                                starRatedColor="rgb(232, 126, 36)"
                                numberOfStars={5}
                                name="rating"
                                isSelectable={false}
                                starDimension={"20px"}
                                starSpacing={"0"}
                            />
                        </div>
                        <p className="details-of-protection">
                            NO ADDITIONAL COST: You pay $0 for repairs – parts,
                            labor and <br />
                            shipping included. <br />
                            COVERAGE: Plan starts on the date of purchase.
                            Malfunctions covered <br /> after the manufacturer's
                            warranty. Power surges covered from day <br /> one.{" "}
                            <br />
                            EASY CLAIMS PROCESS: File a claim anytime online at{" "}
                            <br />
                            https://sjcomputers.us or by phone. Most claims
                            approved within <br />
                            minutes. If we can’t repair it, we’ll send you an
                            Amazon.com Gift Card <br /> for the purchase price
                            of your covered product or replace it. <br />
                            EXPERT TECH HELP: Real experts are available 24/7 to
                            help with set- <br />
                            up, connectivity issues, troubleshooting and much
                            more. <br />
                            TERMS & DETAILS: More information about this
                            protection plan is <br />
                            available within the “Product guides and documents”
                            section. Simply <br /> click “User Guide” for more
                            info. Asurion will also email your plan <br />
                            confirmation with Terms & Conditions to the address
                            associated with <br /> your Amazon account within 24
                            hours of purchase (if you do not see <br />
                            this email, please check your spam folder). Contact
                            us if you cannot <br />
                            locate your plan confirmation and Terms & Conditions
                            via email at <br />
                            cs@sjcomputersmn.com.
                            <br />
                        </p>
                    </div>
                )}
            </div>
            <div className="protc-paln-option">
                <div>
                    <Checkbox />
                    <p>4-Year Proection</p>{" "}
                    <p style={{ color: "red" }}>&nbsp;$32.99</p>
                </div>
                <button onClick={() => toggleAccordion("fourYear")}>
                    <KeyboardArrowDownIcon style={{ marginTop: "-2px" }} />{" "}
                    Learn More
                </button>
                {showFourYearPlanDetails && (
                    <div className="accordion-content">
                        <h3>4 Year Equippment Protection Plan</h3>
                        <p className="title">From Asurion, LLC</p>
                        <div style={{ marginTop: "-15px" }}>
                            <StarRatings
                                rating={258}
                                starRatedColor="rgb(232, 126, 36)"
                                numberOfStars={5}
                                name="rating"
                                isSelectable={false}
                                starDimension={"20px"}
                                starSpacing={"0"}
                            />
                        </div>
                        <p className="details-of-protection">
                            NO ADDITIONAL COST: You pay $0 for repairs – parts,
                            labor and <br />
                            shipping included. <br />
                            COVERAGE: Plan starts on the date of purchase.
                            Malfunctions covered <br /> after the manufacturer's
                            warranty. Power surges covered from day <br /> one.{" "}
                            <br />
                            EASY CLAIMS PROCESS: File a claim anytime online at{" "}
                            <br />
                            https://sjcomputers.us or by phone. Most claims
                            approved within <br />
                            minutes. If we can’t repair it, we’ll send you an
                            Amazon.com Gift Card <br /> for the purchase price
                            of your covered product or replace it. <br />
                            EXPERT TECH HELP: Real experts are available 24/7 to
                            help with set- <br />
                            up, connectivity issues, troubleshooting and much
                            more. <br />
                            TERMS & DETAILS: More information about this
                            protection plan is <br />
                            available within the “Product guides and documents”
                            section. Simply <br /> click “User Guide” for more
                            info. Asurion will also email your plan <br />
                            confirmation with Terms & Conditions to the address
                            associated with <br /> your Amazon account within 24
                            hours of purchase (if you do not see <br />
                            this email, please check your spam folder). Contact
                            us if you cannot <br />
                            locate your plan confirmation and Terms & Conditions
                            via email at <br />
                            cs@sjcomputersmn.com.
                            <br />
                        </p>
                    </div>
                )}
            </div>
            <div className="info mt-5">
                <p>Cover all of your eligible devices:</p>
            </div>
            <div className="protc-paln-option">
                <div>
                    <Checkbox />
                    <p>
                        Tech Unlimited – Protect Eligible Past and Future
                        Purchases <br />
                        with 1 Plan (Renews Monthly Until Cancelled){" "}
                        <p style={{ color: "red" }}>&nbsp;$16.99/month</p>
                    </p>{" "}
                </div>
                <button onClick={() => toggleAccordion("techUnlimited")}>
                    <KeyboardArrowDownIcon style={{ marginTop: "-2px" }} />{" "}
                    Learn More
                </button>
                {showTechUnlimitedPlanDetails && (
                    <div className="accordion-content">
                        <h3>Unlimited Equippment Protection Plan</h3>
                        <p className="title">From Asurion, LLC</p>
                        <div style={{ marginTop: "-15px" }}>
                            <StarRatings
                                rating={258}
                                starRatedColor="rgb(232, 126, 36)"
                                numberOfStars={5}
                                name="rating"
                                isSelectable={false}
                                starDimension={"20px"}
                                starSpacing={"0"}
                            />
                        </div>
                        <p className="details-of-protection">
                            NO ADDITIONAL COST: You pay $0 for repairs – parts,
                            labor and <br />
                            shipping included. <br />
                            COVERAGE: Plan starts on the date of purchase.
                            Malfunctions covered <br /> after the manufacturer's
                            warranty. Power surges covered from day <br /> one.{" "}
                            <br />
                            EASY CLAIMS PROCESS: File a claim anytime online at{" "}
                            <br />
                            https://sjcomputers.us or by phone. Most claims
                            approved within <br />
                            minutes. If we can’t repair it, we’ll send you an
                            Amazon.com Gift Card <br /> for the purchase price
                            of your covered product or replace it. <br />
                            EXPERT TECH HELP: Real experts are available 24/7 to
                            help with set- <br />
                            up, connectivity issues, troubleshooting and much
                            more. <br />
                            TERMS & DETAILS: More information about this
                            protection plan is <br />
                            available within the “Product guides and documents”
                            section. Simply <br /> click “User Guide” for more
                            info. Asurion will also email your plan <br />
                            confirmation with Terms & Conditions to the address
                            associated with <br /> your Amazon account within 24
                            hours of purchase (if you do not see <br />
                            this email, please check your spam folder). Contact
                            us if you cannot <br />
                            locate your plan confirmation and Terms & Conditions
                            via email at <br />
                            cs@sjcomputersmn.com.
                            <br />
                        </p>
                    </div>
                )}
            </div>
            <div className="btn-grp mt-3">
                <button className="add-prot-btn">Add Protection</button>
                <button>No Thanks</button>
            </div>
        </div>
    );
};

export default ProtectionPlanDrawer;
