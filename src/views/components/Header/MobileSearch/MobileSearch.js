import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./MobileSearch.css";
import mobileheaderlogo from "@images/header-logo.png";
import ModalBox from "./MobileScreenModal/ModalBox";
import { SET_SEARCH_STRING } from "@store/products/productsSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "@components/Sidebar/Sidebar.js";
const MobileScreenModal = lazy(() =>
    import("./MobileScreenModal/MobileScreenModal")
);

const MobileSearch = () => {
    //search state here

    const [searchValue, setSearchValue] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const searchString = useSelector((state) => state.products.searchString);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isSideMenu, setSideMenu] = useState(false);
    const toggleSidebar = () => {
        return setSideMenu((state) => !state);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search) {
            dispatch(SET_SEARCH_STRING(search));
            navigate("/products/search");
        }
    };

    useEffect(() => {
        setSearch(searchString || "");
    }, [searchString]);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchIconClick = () => {
        setShowSearchBar(!showSearchBar);
    };

    const handleSearchBarClose = () => {
        setShowSearchBar(false);
        setSearchValue("");
    };

    return (
        <div>
            <Container className="search-dev">
                <>
                    <Link to="/">
                        <Image
                            src={mobileheaderlogo}
                            alt="Left Image"
                            className="mobile-imagelogo"
                        />
                    </Link>
                </>
                <RightContent>
                    <SearchIconContainer>
                        <FontAwesomeIcon
                            icon={faBars}
                            size="xl"
                            onClick={() => {
                                toggleSidebar();
                            }}
                            // onClick={handleOpen}
                            style={{ color: "#ffffff" }}
                        />

                        {/* <SearchIcon
                           
                            className="fas fa-search"
                            style={{ color: "white" }}
                        /> */}
                    </SearchIconContainer>
                </RightContent>
            </Container>
            <CollapseContainer>
                <form onSubmit={handleSearch}>
                    <div className="search-hide-section-body">
                        <SearchBar>
                            <Input
                                className="search-section"
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span
                                className="input-group-text red lighten-3 search-icon-on-mobile-screen"
                                id="basic-text1"
                            >
                                <i
                                    className="fas fa-search text-grey set"
                                    aria-hidden="true"
                                    onClick={handleSearch}
                                ></i>
                            </span>
                        </SearchBar>
                    </div>
                </form>
            </CollapseContainer>
            <Sidebar openState={isSideMenu} toggleSidebar={toggleSidebar} />
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <SearchAccordian />
            </Modal> */}
            <Suspense>
                <div className="mobile-box-model">
                    <MobileScreenModal onClick={handleButtonClick} />
                    {showModal && <ModalBox closeModal={closeModal} />}
                </div>
            </Suspense>
        </div>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LeftContent = styled.div`
    flex: 1;
`;

const RightContent = styled.div`
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
`;

const SearchIconContainer = styled.div`
    padding: 10px;
    cursor: pointer;
`;

const SearchIcon = styled.i`
    font-size: 20px;
    color: #0077c2;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
`;

const CollapseContainer = styled.div``;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
`;

export default MobileSearch;
