import { Link } from "react-router-dom";
import "./Mobilefeaturedproduct.css";
import { useState } from "react";
import gamingimg1 from "../../../../assets/images/MobileImage/HomeCategory/featured/gaming1.png";
const MobileFeaturedProducts = ({ items, featuredItems, title }) => {
    const [showMore, setShowMore] = useState(false);

    const handleSeeMoreClick = () => {
        setShowMore(!showMore); // Toggle the state
    };

    const totalItems = items.length;
    const itemsToShow = showMore ? totalItems : 4;

    return (
        <div>
            <div className="conainer-all-images-sections-data">
                <div className="title-data-sedctions">
                    <h5>{title}</h5>
                </div>
                <div className="images-dev-sections-featured-images">
                    <div className="top-images">
                        {[0, 1].map((index) => (
                            <div
                                className="images-sections-montring"
                                key={index}
                                style={{ width: "100%" }}
                            >
                                <Link
                                    to="/category/bto"
                                    className="category-item text-decoration-none"
                                >
                                    <img
                                        src={items[index]}
                                        alt={`Image ${index + 1}`}
                                        className="dynamic-image-images-mobile-data"
                                    />
                                    <div className="category-name-dev-mobile text">
                                        <p>
                                            {featuredItems[index].categoryName}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="bottom-images">
                        {[2, 3].map((index) => (
                            <div
                                className="images-sections-montring"
                                key={index}
                                style={{ width: "100%" }}
                            >
                                <Link
                                    to="/category/bto"
                                    className="category-item text-decoration-none"
                                >
                                    <img
                                        src={items[index]}
                                        alt={`Image ${index + 1}`}
                                        className="dynamic-image-images-mobile-data"
                                    />
                                    <div className="category-name-dev-mobile text">
                                        <p>
                                            {featuredItems[index]?.categoryName}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {showMore && (
                    <>
                        <div className="images-dev-sections-featured-images">
                            <div className="top-images">
                                {[4, 5].map((index) => (
                                    <div
                                        className="images-sections-montring"
                                        key={index}
                                    >
                                        <Link
                                            to="/category/bto"
                                            className="category-item text-decoration-none"
                                        >
                                            <img
                                                src={items[index]}
                                                alt={`Image ${index + 1}`}
                                                className="dynamic-image-images-mobile-data"
                                            />
                                            <div className="category-name-dev-mobile text">
                                                <p>
                                                    {
                                                        featuredItems[index]
                                                            ?.categoryName
                                                    }
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="bottom-images">
                                {[6, 7].map((index) => (
                                    <div
                                        className="images-sections-montring"
                                        key={index}
                                    >
                                        <Link
                                            to="/category/bto"
                                            className="category-item text-decoration-none"
                                        >
                                            <img
                                                src={items[index]}
                                                alt={`Image ${index + 1}`}
                                                className="dynamic-image-images-mobile-data"
                                            />
                                            <div className="category-name-dev-mobile text">
                                                <p>
                                                    {
                                                        featuredItems[index]
                                                            ?.categoryName
                                                    }
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {totalItems > itemsToShow && (
                    <div className="see-more-button-data">
                        {/* <button onClick={handleSeeMoreClick}>
              {showMore ? "See less" : "See more"}
            </button> */}
                        <Link
                            style={{ textDecoration: "none", color: "#007185" }}
                            to={"/category"}
                        >
                            See more
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileFeaturedProducts;
