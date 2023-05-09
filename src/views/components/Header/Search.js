import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Header.css'
function Search() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  const toggle = () => setDropdownOpen(prevState => !prevState);

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

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret className="all-button">
        {selectedItem}
      </DropdownToggle>
      <DropdownMenu className="">
        <DropdownItem onClick={handleItemClick} className="ul-liste-items-all-buttons">Automotive Accessories</DropdownItem>
        <DropdownItem onClick={handleItemClick} className="ul-liste-items-all-buttons">Cell Phone Accessories</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
export default Search 