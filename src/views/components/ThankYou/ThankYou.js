import "./thankyou.css"; // Import the CSS file for the component
import tickImage from "../../../assets/images/tick1.svg";

export default function ThankYou() {
    return (
        <div
            className="thank-you-page"
            style={{ marginLeft: "10%", marginRight: "10%" }}
        >
            <div className="row margintopBottom">
                <div className="col-12 my-10">
                    <div className="container">
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                backgroundColor: "#318243",
                            }}
                        >
                            <img
                                src={tickImage}
                                alt="Tick Image"
                                // style={{
                                //     position: "",
                                //     zIndex: 2,
                                //     marginLeft: "-3.3%",
                                // }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 my-2">
                    <h3 className="mt-4" style={{ textAlign: "left" }}>
                        Thanks for Applying at SJ Computers
                    </h3>
                </div>
            </div>
        </div>
    );
}
