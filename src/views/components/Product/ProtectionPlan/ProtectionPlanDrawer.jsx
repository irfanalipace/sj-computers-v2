import React, { useState } from "react";
import bulletpoint1 from "../../../../assets/images/bulletpoint1.png";
import bulletpoint2 from "../../../../assets/images/bulletpoint2.png";
import bulletpoint3 from "../../../../assets/images/bulletpoint3.png";
import "../../ProductCard/ProductCard.css";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarRatings from "react-star-ratings";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PLAN_ENUM } from "../../../../core/utils/constants";
import { Link } from "react-router-dom";

import "./ProtectionPlanDrawer.css"

const ProtectionPlanDrawer = ({
    plan = {},
    handleAddingProtec,
    closeDrawer,
}) => {
    const [protectionPlan, setProtectionPlan] = useState(plan);
    const [learnMore, setLearnMore] = useState(plan);
    function handleCheckboxClick(_plan) {
        setProtectionPlan((prev) => {
            if (prev?.value === _plan.value) return null;
            else return _plan;
        });
    }

    return (
        <div style={{ padding: "20px" }} className="protection-plan-drawer">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 className="heading-protection-plan mb-3">
                    Add to your order
                </h1>
                <IconButton
                    style={{ marginTop: "-10px" }}
                    onClick={closeDrawer}
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="info mb-3">
                <img src={bulletpoint1} />
                <p>
                Full coverage for refurb-specific malfunctions.
                </p>
            </div>
            <div className="info mb-3">
                <img src={bulletpoint2} />
                <p>24/7 immediate support.</p>
            </div>
            <div className="info mb-3">
                <img src={bulletpoint3} />
                <p>Simple, quick claim process.</p>
            </div>
            <div className="info">
                <p>Cover This Product</p>
            </div>
            <div className="protc-paln-option">
                <div>
                    <Checkbox
                        checked={
                            protectionPlan?.value === PLAN_ENUM.THREE_YEAR.value
                        }
                        onClick={() =>
                            handleCheckboxClick(PLAN_ENUM.THREE_YEAR)
                        }
                        className="mb-4"
                        style={{ color: "#318243" }}
                    />
                    <p className="mt-4">
                    2-Year Extended Warranty {" "}
                        <span style={{ color: "red" }}> $23.99</span>
                        <p
                            onClick={() => {
                                learnMore?.value === PLAN_ENUM.THREE_YEAR.value
                                    ? setLearnMore({})
                                    : setLearnMore(PLAN_ENUM.THREE_YEAR);
                            }}
                            style={{
                                color: "rgb(18, 112, 196)",
                                cursor: "pointer",
                            }}
                        >
                            <KeyboardArrowDownIcon
                                style={{ marginTop: "-2px" }}
                            />
                            Learn More
                        </p>
                    </p>{" "}
                </div>
                {learnMore?.value === PLAN_ENUM.THREE_YEAR.value && (
                    <div className="accordion-content">
                        <h3>3 Year Equippment Warranty Plan</h3>
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
                        NO ADDITIONAL COST: You pay $0 for repairs – parts, labor and shipping included.   <br />
                        COVERAGE: Plan starts on the date of purchase. Malfunctions covered after the manufacturer's warranty. Power surges covered from day one.   <br /> 
                        EASY CLAIMS PROCESS: File a claim anytime online at <Link>www.cs@sjcomputersmn.com</Link> or by phone at 952-452-8884. Most claims are approved within minutes.  <br />
                        EXPERT TECH HELP: Real experts are available 24/7 to help with set-up, connectivity issues, troubleshooting and much more.  <br />
                        TERMS & DETAILS: SJ Computers will also email your plan confirmation with Terms & Conditions to the address associated with your SJ Computers account within 24 hours of purchase (if you do not see this email, please check your spam folder). Contact us if you cannot locate your plan confirmation and Terms & Conditions via email at <Link>cs@sjcomputersmn.com</Link> <br />
                            More info :{" "}
                            <small style={{ color: "#1270c4" }}>
                                2-Year Warranty
                            </small>
                        </p>
                        <h6 style={{color: "#3bc4f1"}}>SJ Computers covers the following malfunctions in its products</h6>
                        <ul>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Battery Life Issues: </span> Because the battery is not new, it may not keep a charge as well as a fresh one, resulting in shorter use durations between charges. </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Hard Drive Failures: </span> Refurbished machines may still have original hard drives, which may be nearing the end of their lives and hence more likely to fail.  </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Overheating: </span> Because of prior usage, the cooling system (fans, heat sinks) may be less effective, leading the computer to overheat more frequently.   </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Cosmetic flaws: </span> While not a defect, refurbished computers might display more scars or wear and tear than new models.   </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Keyboard or Touchpad Issues: </span>  Previous use might cause less reactive keys or touchpad difficulties.    </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Port malfunctions: </span>  HDMI, USB, and various other ports could have loose connections or damages from past use, resulting in connectivity difficulties.    </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Display Issues: </span>   Screen difficulties, including dead pixels or backlight issues, are prevalent, particularly if the display was not changed throughout the refurbishing process.    </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Software Stability: </span>  There may be outstanding software issues or obsolete drivers that were not entirely resolved throughout the refurbishing process.    </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="protc-paln-option">
                <div>
                    <Checkbox
                        checked={
                            protectionPlan?.value === PLAN_ENUM.FOUR_YEAR.value
                        }
                        onClick={() => handleCheckboxClick(PLAN_ENUM.FOUR_YEAR)}
                        className="mb-4"
                        style={{ color: "#318243" }}
                    />
                    <p className="mt-4">
                    3-Year Extended Warranty  {" "}
                        <span style={{ color: "red" }}> $32.99</span>
                        <p
                            onClick={() => {
                                learnMore?.value === PLAN_ENUM.FOUR_YEAR.value
                                    ? setLearnMore({})
                                    : setLearnMore(PLAN_ENUM.FOUR_YEAR);
                            }}
                            style={{
                                color: "rgb(18, 112, 196)",
                                cursor: "pointer",
                            }}
                        >
                            <KeyboardArrowDownIcon
                                style={{ marginTop: "-2px" }}
                            />{" "}
                            Learn More
                        </p>
                    </p>{" "}
                </div>
                {learnMore?.value === PLAN_ENUM.FOUR_YEAR.value && (
                    <div className="accordion-content">
                        <h3>4 Year Equippment Warranty Plan</h3>
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
                        NO ADDITIONAL COST: You pay $0 for repairs – parts, labor and shipping included.   <br />
                        COVERAGE: Plan starts on the date of purchase. Malfunctions covered after the manufacturer's warranty. Power surges covered from day one.   <br /> 
                        EASY CLAIMS PROCESS: File a claim anytime online at <Link>www.cs@sjcomputersmn.com</Link> or by phone at 952-452-8884. Most claims are approved within minutes.  <br />
                        EXPERT TECH HELP: Real experts are available 24/7 to help with set-up, connectivity issues, troubleshooting and much more.  <br />
                        TERMS & DETAILS: SJ Computers will also email your plan confirmation with Terms & Conditions to the address associated with your SJ Computers account within 24 hours of purchase (if you do not see this email, please check your spam folder). Contact us if you cannot locate your plan confirmation and Terms & Conditions via email at <Link>cs@sjcomputersmn.com</Link> <br />
                            More info :{" "}
                            <small style={{ color: "#1270c4" }}>
                                3-Year Warranty
                            </small>
                        </p>
                        <h6 style={{color: "#3bc4f1"}}>SJ Computers covers the following malfunctions in its products</h6>
                        <ul>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Battery Life Issues: </span> Because the battery is not new, it may not keep a charge as well as a fresh one, resulting in shorter use durations between charges. </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Hard Drive Failures: </span> Refurbished machines may still have original hard drives, which may be nearing the end of their lives and hence more likely to fail.  </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Overheating: </span> Because of prior usage, the cooling system (fans, heat sinks) may be less effective, leading the computer to overheat more frequently.   </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Cosmetic flaws: </span> While not a defect, refurbished computers might display more scars or wear and tear than new models.   </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Keyboard or Touchpad Issues: </span>  Previous use might cause less reactive keys or touchpad difficulties.    </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Port malfunctions: </span>  HDMI, USB, and various other ports could have loose connections or damages from past use, resulting in connectivity difficulties.    </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Display Issues: </span>   Screen difficulties, including dead pixels or backlight issues, are prevalent, particularly if the display was not changed throughout the refurbishing process.    </li>
                            <li style={{fontSize: "small", padding: "10px 2px"}}><span style={{fontWeight: 500}}>Software Stability: </span>  There may be outstanding software issues or obsolete drivers that were not entirely resolved throughout the refurbishing process.    </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="info mt-5">
                <p>Cover all of your eligible devices:</p>
            </div>
            {/* <div className="protc-paln-option">
                <div>
                    <Checkbox
                        checked={
                            protectionPlan?.value === PLAN_ENUM.DEFAULT.value
                        }
                        onClick={() => handleCheckboxClick(PLAN_ENUM.DEFAULT)}
                        className="mb-5"
                        style={{ color: "#318243" }}
                    />
                    <p className="mt-2">
                        Tech Unlimited – Protect Eligible Past and Future
                        Purchases <br />
                        with 1 Plan (Renews Monthly Until Cancelled){" "}
                        <span style={{ color: "red" }}> $16.99/month</span>
                        <br />
                        <p
                            onClick={() => {
                                learnMore?.value === PLAN_ENUM.DEFAULT.value
                                    ? setLearnMore({})
                                    : setLearnMore(PLAN_ENUM.DEFAULT);
                            }}
                            style={{
                                color: "rgb(18, 112, 196)",
                                cursor: "pointer",
                            }}
                        >
                            <KeyboardArrowDownIcon
                                style={{ marginTop: "-2px" }}
                            />{" "}
                            Learn More
                        </p>
                    </p>{" "}
                </div>
                {learnMore.value === PLAN_ENUM.DEFAULT.value && (
                    <div className="accordion-content">
                        <h3>Unlimited Equippment Warranty Plan</h3>
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
                            SJComputers.com Gift Card <br /> for the purchase price
                            of your covered product or replace it. <br />
                            EXPERT TECH HELP: Real experts are available 24/7 to
                            help with set- <br />
                            up, connectivity issues, troubleshooting and much
                            more. <br />
                            TERMS & DETAILS: More information about this
                            warranty plan is <br />
                            available within the “Product guides and documents”
                            section. Simply <br /> click “User Guide” for more
                            info. Asurion will also email your plan <br />
                            confirmation with Terms & Conditions to the address
                            associated with <br /> your SJComputers account within 24
                            hours of purchase (if you do not see <br />
                            this email, please check your spam folder). Contact
                            us if you cannot <br />
                            locate your plan confirmation and Terms & Conditions
                            via email at <br />
                            cs@sjcomputersmn.com.
                            <br />
                            More info :{" "}
                            <small style={{ color: "#1270c4" }}>
                                Tech Unlimited
                            </small>
                        </p>
                    </div>
                )}
            </div> */}
            <div className="btn-grp mt-3">
                <button
                    className="add-prot-btn"
                    onClick={() => handleAddingProtec(protectionPlan)}
                >
                    Add Warranty
                </button>
                <button onClick={() => closeDrawer()}>No Thanks</button>
            </div>
        </div>
    );
};

export default ProtectionPlanDrawer;
