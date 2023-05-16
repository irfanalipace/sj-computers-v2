import { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { SET_SEARCH_STRING } from "@store/products/productsSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";
function Search() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("All");
    const [search, setSearch] = useState("");
    const searchString = useSelector((state) => state.products.searchString);
    const dispatch = useDispatch();

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const handleItemClick = (e) => {
        e.preventDefault();
        const item = e.target.text;
        setSelectedItem(item);
        if (item === "Automotive Accessories") {
            console.log("You selected Automotive Accessories");
        } else if (item === "Cell Phone Accessories") {
            console.log("You selected Cell Phone Accessories");
        }
        setDropdownOpen(false); // Close the dropdown after item is selected
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(SET_SEARCH_STRING(search));
    };

    useEffect(() => {
        setSearch(searchString || "");
    }, [searchString]);

    return (
        <form className="input-group search-inputgroup" onSubmit={handleSearch}>
            <div className="input-group-btn search-panel">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret className="all-button">
                        {selectedItem}
                    </DropdownToggle>
                    <DropdownMenu className="">
                        <DropdownItem
                            onClick={handleItemClick}
                            className="ul-liste-items-all-buttons"
                        >
                            Automotive Accessories
                        </DropdownItem>
                        <DropdownItem
                            onClick={handleItemClick}
                            className="ul-liste-items-all-buttons"
                        >
                            Cell Phone Accessories
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <input
                type="hidden"
                name="search_param"
                value="all"
                id="search_param"
            />
            <input
                type="search"
                className="form-control search-input-type"
                name="x"
                id="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <span className="input-group-btn">
                <button
                    type="button"
                    className="btn btn-success search-logo"
                    onClick={handleSearch}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size="1x"
                        className="search-button-header-icon"
                    />
                </button>
            </span>
        </form>
    );
}
export default Search;
