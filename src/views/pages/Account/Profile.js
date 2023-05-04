import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { updateProfile } from "@store/auth/authThunks";
import { CLEAR_API_ERRORS } from "@store/auth/authSlice";
import Button from "@common/Button/Button";
import Breadcrumb from "@common/Breadrumb/Breadcrumb";

import userDefault from "@images/common/user-default-avatar.png";
// import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [nameEditable, setNameEditable] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState("");

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const apiError = useSelector((state) => state.auth.apiError);
    const isLoading = useSelector((state) => state.auth.isLoading);

    const handleFileChange = (event) => {
        event.preventDefault();
        let files = event.target.files;
        if (files.length > 0) {
            setSelectedFile(files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);

            // Set the image URL when the file is loaded
            reader.onload = () => {
                setImageUrl(reader.result);
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile_pic", selectedFile);
        formData.append("name", name);
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        setName(user.name);
        setImageUrl(user.profile_pic);
    }, [user]);

    useEffect(() => {
        return function () {
            dispatch(CLEAR_API_ERRORS());
        };
    }, []);

    const handleDeleteImage = () => {
        setSelectedFile(null);
        setImageUrl(null);
    };
    return (
        <div className="account-page">
            <div className="container-xl">
                <Breadcrumb />
                <h3 className="account-heading">Profile</h3>
                <div className="profile-container">
                    <div className="profile-photo-container">
                        <div className="row mx-0">
                            <div className="col-sm-4 col-12">
                                <div className="user-image-container">
                                    {/* <p>Profile Photo</p> */}
                                    <div className="image-wrapper">
                                        <img
                                            src={
                                                imageUrl
                                                    ? imageUrl
                                                    : userDefault
                                            }
                                        />
                                    </div>
                                </div>
                                {apiError && (
                                    <p className="fs-6 mt-1 text-danger">
                                        {apiError.profile_pic}
                                    </p>
                                )}
                                <p className="text-center">
                                    Your Profile photo should be 256x256
                                </p>
                            </div>
                            <div className="col-sm-4 col-12 mt-sm-0 mt-4">
                                <div className="change-profile-buttons">
                                    <div className="file-input-button-container">
                                        <label
                                            htmlFor="file-input"
                                            className="change-photo-btn account-btn"
                                        >
                                            Change Photo
                                        </label>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept="image/jpeg, image/jpg, image/png"
                                            value={""}
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <button
                                        className="mt-3 delete-image-btn account-btn"
                                        onClick={handleDeleteImage}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="me-2"
                                        />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-info-container">
                        <form
                            className="user-info-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="input-wrapper">
                                <label htmlFor="full_name">Your Name</label>
                                <input
                                    type="text"
                                    readOnly={!nameEditable}
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
                            {apiError && (
                                <p className="fs-6 mt-1 text-danger">
                                    {apiError.name}
                                </p>
                            )}
                            <div className="input-wrapper">
                                <label htmlFor="email">Your Email</label>
                                <input
                                    id="emal"
                                    type="email"
                                    value={user.email}
                                    readOnly
                                />
                            </div>
                            {apiError && (
                                <p className="fs-6 mt-1 text-danger">
                                    {apiError.email}
                                </p>
                            )}
                            {/* <div className="input-wrapper">
                                <label htmlFor="dob">Date of birth</label>
                                <DatePicker
                                    id="dob"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div> */}

                            <Button
                                className={"account-btn update-btn"}
                                onClick={handleSubmit}
                                isLoading={isLoading}
                            >
                                Update
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
