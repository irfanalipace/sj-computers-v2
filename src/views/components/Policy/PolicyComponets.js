import React from "react";
import { Link } from "react-router-dom";
import './PolicyComponets.css'
const PolicyComponets = () => {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <header className="topBar px-3">
                        <div className="topBar-inner">
                            <div className="menuBar">
                            

                                <ul className="text-decoration-none policy-menu-item-list">
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                            Today's Deal
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                            Laptop
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                            Desktop
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                            Monitors
                                        </Link>
                                    </li>
                                    <li className="policy-listitem">
                                        <Link
                                            to="/"
                                            className="text-decoration-none text-color hover-effect-sets-topbar"
                                        >
                                            BTO
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-4">image</div>
                    <div className="col-8">text-size</div>
                </div>
            </div>
        </div>
    );
};

export default PolicyComponets;
