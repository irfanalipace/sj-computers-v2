import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";
import StarRatings from "react-star-ratings";

const ProtectionPopup = ({ open, handleClose, plan }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth={130}>
            <DialogTitle id="alert-dialog-title">
                {"Add to your order"}
            </DialogTitle>
            {/* <DialogContent> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div className="accordion-content">
                    <h3>{plan} Equippment Protection Plan</h3>
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
                        https://sjcomputers.us or by phone. Most claims approved
                        within <br />
                        minutes. If we can’t repair it, we’ll send you an
                        Amazon.com Gift Card <br /> for the purchase price of
                        your covered product or replace it. <br />
                        EXPERT TECH HELP: Real experts are available 24/7 to
                        help with set- <br />
                        up, connectivity issues, troubleshooting and much more.{" "}
                        <br />
                        TERMS & DETAILS: More information about this protection
                        plan is <br />
                        available within the “Product guides and documents”
                        section. Simply <br /> click “User Guide” for more info.
                        Asurion will also email your plan <br />
                        confirmation with Terms & Conditions to the address
                        associated with <br /> your Amazon account within 24
                        hours of purchase (if you do not see <br />
                        this email, please check your spam folder). Contact us
                        if you cannot <br />
                        locate your plan confirmation and Terms & Conditions via
                        email at <br />
                        cs@sjcomputersmn.com.
                        <br />
                    </p>
                </div>
                <div className="btn-protection-model">
                    <button>Add Protection</button>
                    <button>No Thanks</button>
                </div>
            </div>
        </Dialog>
    );
};

export default ProtectionPopup;
