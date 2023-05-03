import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "@common/Button/Button";
import Breadcrumb from "@common/Breadrumb/Breadcrumb";
import { breadcrumbRoutes } from "./BreadcrumbRoutes";

import userDefault from "@images/common/user-default-avatar.png";
import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [nameEditable, setNameEditable] = useState(false);
    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const isLoading = useSelector((state) => state.auth.isLoading);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            // const response = await ApiService.post("/api/upload", formData);
            setImageURL(response.data.imageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setName(user.name);
    }, [user]);

    const handleDeleteImage = () => {
        setSelectedFile(null);
        setImageURL(null);
    };
    return (
        <div className="account-page">
            <div className="container-xl">
                <Breadcrumb routes={breadcrumbRoutes} />
                <h3 className="account-heading">Profile</h3>
                <div className="profile-container">
                    <div className="profile-photo-container">
                        <div className="row mx-0">
                            <div className="col-6">
                                <div className="user-image-container">
                                    <p>Profile Photo</p>
                                    <div className="image-wrapper">
                                        <img
                                            src={
                                                imageURL
                                                    ? imageURL
                                                    : userDefault
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="change-profile-buttons">
                                    <input
                                        type="file"
                                        value={imageURL}
                                        onChange={handleFileChange}
                                        className="change-photo-btn account-btn"
                                    />
                                    <button
                                        className="mt-3"
                                        onClick={handleDeleteImage}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="me-2"
                                        />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p> Your Profile photo shoulb be 256x256</p>
                    </div>
                </div>
                <div className="user-info-container">
                    <form className="user-info-form" onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="full_name">Your Name</label>
                            <input
                                type="text"
                                readOnly={nameEditable}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="full_name"
                                id="full_name"
                            />
                            {!nameEditable && (
                                <button
                                    className="edit-btn"
                                    onClick={() => setNameEditable(true)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" value={user.email} readOnly />
                        </div>
                        <div className="input-wrapper">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>

                        <Button onClick={handleSubmit} isLoading={isLoading}>
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
