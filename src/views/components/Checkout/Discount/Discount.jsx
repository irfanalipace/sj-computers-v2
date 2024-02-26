import "./Discount.css";
import { Link } from "react-router-dom";

const Discount = () => {
    return (
        <div className="summary-card discount-card-data-checkout">
            <div className="summary-wrapper">
                <div className="discount-data-heading">
                    <h3>Get Discount & Benefits</h3>

                    <p>
                        Get track history, sales & discounts benefits only by
                        placing an order from your SJ account.
                    </p>
                    <hr />
                </div>
                <div className="discount-data-address-div-data-count">
                    <Link className="text-decoration-none" to={"/login"}>
                        Login to continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Discount;
