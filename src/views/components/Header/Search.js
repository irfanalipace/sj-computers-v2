import { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    SET_SEARCH_STRING,
    SET_SELECTED_CATEGORY,
} from "@store/products/productsSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "@common/Spinner/Spinner";
import "./Header.css";

function Search() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ name: "ALL", id: null });
    const [search, setSearch] = useState("");
    const { searchString, selectedCategory } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.category.categories);
    const location = useLocation();

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const handleItemClick = (category) => {
        setSelectedItem(category);
        dispatch(SET_SELECTED_CATEGORY(category?.id));
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

    useEffect(() => {
        if (selectedCategory === null)
            setSelectedItem({ name: "ALL", id: null });
    }, [selectedCategory]);

    let renderedCategories = categories.map((category) => (
        <DropdownItem
            key={category.id}
            onClick={() => handleItemClick(category)}
            className="ul-liste-items-all-buttons"
        >
            <span className="text-decoration-none div-link-category-search" style={{fontSize:'13px'}}>
                {category.name}
            </span>
        </DropdownItem>
    ));
    // .slice(0, visibleCategories);

    // const [visibleCategories, setVisibleCategories] = useState(8);
    // const handleShowMore = () => {
    //     setVisibleCategories((prevVisibleCategories) => prevVisibleCategories + 8);
    // };

    return (
        <form className="input-group search-inputgroup" onSubmit={handleSearch}>
            <div className="input-group-btn search-panel">
                <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    disabled={location.pathname.includes("category")}
                >
                    <DropdownToggle caret className="all-button" style={{fontSize:'13px'}}>
                        {selectedItem.name}
                    </DropdownToggle>
                    <DropdownMenu className="">
                        <DropdownItem
                            onClick={() =>
                                handleItemClick({ name: "ALL", id: null })
                            }
                            className="ul-liste-items-all-buttons "
                        >
                            <span className="text-decoration-none" style={{fontSize:'13px'}}>
                                All Category
                            </span>
                        </DropdownItem>
                        {renderedCategories}
                        {/* {categories.length > visibleCategories && (
                            <DropdownItem onClick={handleShowMore} className="ul-liste-items-all-buttons">
                              categories
                            </DropdownItem>
                        )} */}
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
