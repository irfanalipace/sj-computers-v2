import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Filters from "./Filters";
import "./Careers.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobile } from "@fortawesome/free-solid-svg-icons";
import { getAllJobs } from "../../../core/api/careers";
import { convertDateToLongFormat } from "@utils/helpers";
function Careers() {
    const [careers, setCareers] = useState([]);

    const getCareers = async () => {
        let response = await getAllJobs();
        setCareers(response.data);
    };

    useEffect(() => {
        getCareers();
    }, []);

    return (
        <div className="career-container">
            <div className="career-header">
                <div className="my-career-menu">
                    <nav className="navbar navbar-expand-sm nav-career-background-color">
                        <div className="container-lg">
                            <div className="navbar-collapse">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-career-menu link-no-hover on-focus-colo-career"
                                            to="/careers"
                                        >
                                            <span>Careers</span>
                                        </Link>
                                    </li>
                                    <span className="nav-item-career"></span>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-aligin-career-menu link-no-hover email-career-hr-line on-focus-colo-career"
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="navbar-collapse justify-content-end ">
                                <ul className="navbar-nav">
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-career-menu link-no-hover on-focus-colo-career "
                                            to="mailto: cs@sjcomputersmn.com"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />{" "}
                                            cs@sjcomputersmn.com
                                        </Link>
                                    </li>
                                    <span className="nav-item-career"></span>
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-career-menu link-no-hover email-career-hr-line on-focus-colo-career"
                                            to="tel: 952-452-8884"
                                        >
                                            <FontAwesomeIcon icon={faMobile} />{" "}
                                            952-452-8884
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="home-text-paragraph-career">
                    <div className="container-lg py-3">
                        <div className="row py-sm-5">
                            <div className="col-12 col-sm-6 col-md-9">
                                <div className="p-tages-text-career px-sm-0 px-2">
                                    <h4 className="career-text-home">
                                        Careers
                                    </h4>
                                    <h6 className="career-text-home2">
                                        What could you be working on?
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="careers-page-listing bg-light">
                    <div className="container-lg py-4 ">
                        <div className="pb-3 w-75 mx-auto">
                            {careers?.map((career) => (
                                <Link
                                    key={career.id}
                                    to={"/careers/" + career?.id}
                                    className="text-decoration-none"
                                >
                                    <div className="card ">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <p className="job-title mb-0 fs-5 fw-semibold">
                                                    {career?.job_title}
                                                </p>
                                                <div className="fs-6 fw-light">
                                                    Posted{" "}
                                                    {convertDateToLongFormat(
                                                        career?.created_at
                                                    )}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between py-3">
                                                <div className="">
                                                    <span className="text-success border-end pe-2 fs-6 fw-light">
                                                        Open Position
                                                    </span>
                                                    <span className="ps-2 fs-6 fw-light">
                                                        Minnesota, USA
                                                    </span>
                                                </div>
                                                <div className="text-muted fs-6 fw-light">
                                                    Updated{" "}
                                                    {convertDateToLongFormat(
                                                        career?.updated_at
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="fs-6 mb-0 fw-medium">
                                                    {career?.job_description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Careers;
