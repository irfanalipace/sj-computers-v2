import React from "react";
import "./LandingPage.css";
import blackimage from "../../../assets/images/BLACK_FRIDAY_SPLASH_BANNER.png";
import frame1 from "../../../assets/images/security-illustration.png";
import LoadMore from "../common/Button/LoadMore";
import { Link } from "react-router-dom";
const LayoutPage = () => {
    const [visibleCards, setVisibleCards] = React.useState(12);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const handleShowMoreClick = () => {
        // Simulating an asynchronous data fetch
        setLoading(true);
        setTimeout(() => {
            setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
            setLoading(false);
            // Set error to true to simulate an error (set it to false in a real scenario)
            // setError(true);
        }, 1000);
    };
    return (
        <div className="layout-page-landing-data">
            <div className="container">
                <div className="top-section-image-view">
                    <img src={blackimage} alt="Top Display" />
                </div>
                <div className="filter-section">
                    {/* Filter Buttons: Open, News, Near Me, Category */}
                    <Link className="text-decoration-none All-button-layout-filter">
                        ALL
                    </Link>
                    <Link className="text-decoration-none All-button-layout-filter-hp">
                        HP
                    </Link>
                    <Link className="text-decoration-none All-button-layout-filter-hp">
                        DELL
                    </Link>
                    <Link className="text-decoration-none All-button-layout-filter-lenovo">
                        LENOVO
                    </Link>
                </div>
                <div className="card-section">
                    {/* New Row with 4 Cards */}
                    <div className="row">
                        {[
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                            16, 17, 18, 19, 20,
                        ]
                            .slice(0, visibleCards)
                            .map((index) => (
                                <div className="col-md-3" key={index}>
                                    {/* Card Component */}
                                    <Link className="text-decoration-none text-black">
                                        <div className="layout-page-secetion-card">
                                            {/* Card Top Image */}
                                            <img
                                                src={frame1}
                                                alt={`Card ${index} Top`}
                                                className="img-fluid"
                                            />

                                            <p className="pagarph-data-layout-page">
                                                HP 800 G2 Gaming RGB Desktop
                                                Computer PC - Intel Core i7 6th
                                                Gen, 32GB DDR4 Ram, 1TB SSD,
                                                GeForce GTX HP 800 G2 Gaming RGB
                                                Desktop Computer PC HP 800 G2
                                                Gaming RGB Desktop Computer PC -
                                                Intel Core i7 6th Gen, 32GB DDR4
                                                Ram, 1TB SSD, GeForce GTX HP 800
                                                G2 Gaming RGB Desktop Computer
                                                PC HP 800 G2 Gaming RGB Desktop
                                                Computer PC - Intel Core i7 6th
                                                Gen, 32GB DDR4 Ram, 1TB SSD,
                                                GeForce GTX HP 800 G2 Gaming RGB
                                                Desktop Computer PC HP 800 G2
                                                Gaming RGB Desktop Computer PC -
                                                Intel Core i7 6th Gen, 32GB DDR4
                                                Ram, 1TB SSD, GeForce GTX HP 800
                                                G2 Gaming RGB Desktop Computer
                                                PC
                                            </p>
                                            <div className="data-start-dollar-ratin-dev">
                                                <div className="right-side-pric-sub-price-item">
                                                    <span className="sub-value-price-list-value-data">
                                                        $4335
                                                    </span>
                                                    <span className="div-red-value-items">
                                                        /
                                                    </span>
                                                    <span className="sub-value-price-list">
                                                        $32342
                                                    </span>
                                                </div>

                                                <div className="layout-page-filter-card-bottom">
                                                    <div className="rating-star-value-card">
                                                        <p>
                                                            ★★★★★
                                                            <sub
                                                                style={{
                                                                    color: "#1270C4",
                                                                }}
                                                            >
                                                                1243.2
                                                            </sub>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>

                    <LoadMore
                        handleClick={handleShowMoreClick}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

export default LayoutPage;
