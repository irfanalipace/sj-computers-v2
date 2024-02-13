import { Link } from "react-router-dom";
import "./MobileSingleItem.css"
const MobileSingleItem = ({ items, featuredItems, title }) => {
    return (
        <div>
            <div className="conainer-all-images-sections-data">
                <div className="title-data-sedctions">
                    {" "}
                    <h5>{title}</h5>
                </div>
                <div className="images-dev-sections-featured-images">
                    <div className="images-sections-montring">
                        <Link
                            to="/category/bto"
                            className="category-item text-decoration-none"
                        >
                            <img
                                src={items[0]}
                                alt="Image 1"
                                className="dynamic-image-images-mobile-data-single-item"
                            />
                          
                        </Link>
                    </div>
                   
                </div>
             
                <div className="see-more-button-data-single-item">
                    <Link to="/category">Shop Now</Link>
                </div>
            </div>
        </div>
    );
};

export default MobileSingleItem;
