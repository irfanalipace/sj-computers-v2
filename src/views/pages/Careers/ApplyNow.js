import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobile } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFormValidation } from "@hooks/useFormValidation";
import { contactUsApi } from "@api/contact-us";
import Button from "@common/Button/Button";
import contact from "@images/footer/footer-links/contact-image.png";
import "../../components/Footer/FooterMenu/Contact.css";
const ApplyNow = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const postMessage = async (formValue) => {
        setIsLoading(true);
        const params = {
            subject_name: formValue.name,
            email: formValue.email,
            message: formValue.message,
        };
        try {
            let response = await contactUsApi(params);
            setMessage(response.data);
            values.subject_name = "";
            values.email = "";
            values.message = "";
        } catch (error) {
            setError(error.data.errors);
        }
        setIsLoading(false);
    };

    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            name: "",
            email: "",
            message: "",
        },
        {
            fieldLengths: {
                name: { min: 3, max: 50 },
                email: { min: 5, max: 100 },
                message: { min: 5, max: 1000 },
            },
        },
        postMessage
    );

    useEffect(() => {
        setError({ ...errors });
    }, [errors]);

    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="my-contact-menu">
                    <nav className="navbar navbar-expand-lg nav-contact-background-color">
                        <div className="container">
                            <div className="navbar-collapse">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover on-focus-colo-contact"
                                            to="/contact"
                                        >
                                            <span>Career</span>
                                        </Link>
                                    </li>
                                    <span className="nav-item-contact"></span>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line on-focus-colo-contact"
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
                                            className="nav-link text-aligin-contact-menu link-no-hover on-focus-colo-contact "
                                            to="mailto: cs@sjcomputersmn.com"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />{" "}
                                            cs@sjcomputersmn.com
                                        </Link>
                                    </li>
                                    <span className="nav-item-contact"></span>
                                    <li className="nav-item ">
                                        <Link
                                            className="nav-link text-aligin-contact-menu link-no-hover email-contact-hr-line on-focus-colo-contact"
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
                <div className="home-text-paragraph-contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <div className="p-tages-text-contact">
                                    <h4 className="contact-text-home">
                                        Bussiness System Analaytic
                                        {/* {user?.name} */}
                                    </h4>
                                    <h6 className="contact-text-home2">
                                      Job Application
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>

                <div className="container image-cotact-container">
                    <h4 className="contact-heading-text-with-image">
            Application Form 
                    </h4>
                    <div className="row">
                       
                        <div className="col-lg-8">
                  <form>
                    fsfre
                  </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyNow;
