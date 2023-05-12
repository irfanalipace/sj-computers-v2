// import React, { useState } from 'react';
// import styled from 'styled-components';
// import './MobileSearch.css'
// import MobileScreenModel from './MobileScreenModel/MobileScreenModel'

// const MobileSearch = () => {
//   const [searchValue, setSearchValue] = useState('');

//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value);
//   }

//   return (
//     <div >
//       <div>

//       </div>
//  <Container className='search-dev'>
//       <Input
//       className='search-section'
//         type="text"
//         placeholder="Search..."
//         value={searchValue}
//         onChange={handleInputChange}
//       />

//     <span className="input-group-text red lighten-3 search-icon-on-mobile-screen" id="basic-text1"><i className="fas fa-search text-grey"
//         aria-hidden="true"></i></span>
//       <div>

//       </div>
//     </Container>
//     <div className='mobile-box-model'>

//    <MobileScreenModel />
//     </div>
//     </div>

//   );
// };

// const Container = styled.div`
//   display: flex;
//   align-items: center;

// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   margin-left: 10px;
//   border-radius: 5px;
//   background-color: #0077c2;
//   color: #fff;
//   font-size: 16px;
// `;

// export default MobileSearch;
import React, { useState } from "react";
import styled from "styled-components";
import { useCollapse } from "react-collapsed";
import "./MobileSearch.css";
import MobileScreenModel from "./MobileScreenModel/MobileScreenModel";
import mobileheaderlogo from "@images/header-logo.png";
import ModelBox from "./MobileScreenModel/ModelBox";
const MobileSearch = () => {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const { getCollapseProps, getToggleProps, isOpen } = useCollapse();

    const [searchValue, setSearchValue] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);

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
                    <Image
                        src={mobileheaderlogo}
                        alt="Left Image"
                        className="mobile-imagelogo"
                    />
                </>
                <RightContent>
                    <SearchIconContainer {...getToggleProps()}>
                        {!showSearchBar && (
                            <SearchIcon
                                // onClick={handleSearchIconClick}
                                className="fas fa-search"
                                style={{ color: "white" }}
                            />
                        )}
                    </SearchIconContainer>
                </RightContent>
            </Container>

            <CollapseContainer {...getCollapseProps()}>
                <div className="search-hide-section-body">
                    <SearchBar>
                        <Input
                            className="search-section"
                            value={searchValue}
                            type="text"
                            placeholder="Search"
                        />
                        <span
                            className="input-group-text red lighten-3 search-icon-on-mobile-screen"
                            id="basic-text1"
                        >
                            <i
                                className="fas fa-search text-grey set"
                                aria-hidden="true"
                            ></i>
                        </span>
                    </SearchBar>
                </div>
            </CollapseContainer>

            <div className="mobile-box-model">
                <MobileScreenModel onClick={handleButtonClick} />
                {showModal && <ModelBox closeModal={closeModal} />}
            </div>
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
