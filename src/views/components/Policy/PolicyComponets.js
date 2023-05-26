import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PolicyComponets.css";
import {} from "../../../core/api/system-pages";
import policyimage from "@images/Policy/polict-cart-comp.png";
import { getSystemPagesApi } from "../../../core/api/system-pages";
import { useLocation } from "react-router-dom";
import Loader from "@common/LoaderComponent/LoaderComponent";
import Header from "@components/Header/Header";
import { useNavigate } from "react-router-dom";

const HeadereLinks = [
    { path: "/", title: "About Us" },
    { path: "/", title: "What We Do?" },
    { path: "/term_services", title: "Return & Refund" },
    { path: "/term_services", title: "Shipping Policy" },
    { path: "/term_services", title: "Terms of Services" },
    { path: "/term_services", title: "Privacy Policy" },
    { path: "/", title: "Subscribe" },
];

const PolicyComponets = () => {
    const [pageContent, setPageContent] = useState({});
    const [pTagValue, setPTagValue] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const [PageTitle, setpageTitle] = useState("");

    // const pageName = {
    //     key : "shipping_policy"
    // }'

    const location = useLocation();
    const pageName = location.pathname.substring(1);

    let PageTitle;

    if (pageName === "term_services") {
        PageTitle = "Terms of Services";
    } else if (pageName === "return_refund_policy") {
        PageTitle = "Return and Refund Policy";
    } else if (pageName === "privacy_policy") {
        PageTitle = "Privacy Policy";
    } else if (pageName === "shipping_policy") {
        PageTitle = "Shipping Policy";
    } else {
        pageName = pageName;
    }

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                setIsLoading(true);
                const responsePage = await getSystemPagesApi(pageName);
                console.log(responsePage.data.value, "page Content 1");
                setPageContent(responsePage);
                console.log(pageContent, "page Content 2");
                setPTagValue(responsePage?.data?.value);
                setHtmlContent(responsePage?.data?.value);
                console.log(pTagValue, "page Content 3");
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching page content:", error);
                setIsLoading(false);
            }
        };

        fetchPageContent();
    }, [location.pathname]);

    return (
        <div>
            {/* <Header /> */}
            <div className="policy-background-color">
                <div className="row">
                    <div>
                        <header className="topBar px-3 policy-header-topbar">
                            <div className="topBar-inner-policy">
                                <div className="menuBar-policy">
                                    <ul className="text-decoration-none policy-menu-item-list">
                                        {HeadereLinks.map((link, index) => (
                                            <li
                                                className="policy-listitem"
                                                key={index}
                                            >
                                                <Link
                                                    to={link.path}
                                                    className="text-decoration-none text-color hover-effect-sets-topbar hover-text-color-policy-comp"
                                                >
                                                    {link.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </header>
                    </div>
                </div>
                <div className="policyset-container-dev">
                    <div className="">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-8 text-color-all-text">
                                <span className="privacy-policy-text-dev">
                                    {PageTitle}
                                </span>
                                <div className="cart-dev-policy-section">
                                    <div className="card-policy-coponents">
                                        <img src={policyimage} alt="" />
                                        <div className="text-span-policy-dev">
                                            <span className="text-color-all-text-span">
                                                {" "}
                                                Want to check the status of your
                                                order? Go to Your Orders to find
                                                tracking information and order
                                                details
                                            </span>
                                            <div className="order-button-policy">
                                                <button Onclick={() => navigate('/account/orders')} className="policy-card-order-button">
                                                    <Link
                                                        to={"/account/orders"}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            color: "#ffffff",
                                                        }}
                                                    >
                                                        Order
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-8 col-md-10 col-sm-12 text-color-all-text text-dev-section-dev "
                                style={{ marginBottom: "44px" }}
                            >
                                <div>
                                    <p className="" style={{ color: "white" }}>
                                        {isLoading ? (
                                            <>
                                                <Loader />
                                            </>
                                        ) : (
                                            
                                            <div style={{lineHeight: '16px'}}dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                        )}
                                    </p>
                                    {/* <ul className="policy-item-data">
                              
                       
                            <li>
                            For more information about returning to third-party sellers. For products purchased from the SJ Computers Global Store,aken Returns. 
                            </li>
                            <li>
                            For more information about returning. For products purchased from the SJ Computers Global Store, see SJ Computers Returns. For more information on refund timing and amounts (including partial refunds and restocking fees), see Refunds. If you have returned an item to Amazon by mistake or included something not intended for Amazon in a return, see Mistaken Returns. 
                            </li>
                            <li>
                          For products purchased from the SJ Computers Global Store, see SJ Computers Returns. For more information on refund timing and amounts (including partial refunds and restocking fees), see Refunds. If you have returned an item to Amazon by mistake or included something not intended for Amazon in a return, see Mistaken Returns. 
                            </li>
                            </ul> */}
                                    <div className="">
                                        {/* <span className="conditional-granti">Unconditional Satisfaction Guarantee</span> */}
                                        <div style={{}}>
                                            {/* <span className="conditional-granti-text">If you're not completely satisfied with these brands at any time, we are happy to give you a full refund: Buttoned Down Core 10 Moon and Back Obsidian</span> */}
                                        </div>
                                        <div>
                                            {/* <ul className="policy-items-cart-sction2-dev">
                                        <li className="line-height-dev-ul">Buttoned Down</li>
                                        <li className="line-height-dev-ul">Core 10</li>
                                        <li className="line-height-dev-ul">Moon and Back</li>
                                        <li className="line-height-dev-ul">Obsidian</li>
                                        </ul> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyComponets;
