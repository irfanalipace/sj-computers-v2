import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_SEARCH_STRING,
  SET_SELECTED_CATEGORY,
} from '@store/products/productsSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loader from '@common/Spinner/Spinner';
import './Header.css';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ name: 'ALL', id: null });
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchString = useSelector(state => state.products.searchString);
  const selectedCategory = useSelector(
    state => state.products.selectedCategory,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(state => state.category.categories);
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleItemClick = category => {
    setSelectedItem(category);
    dispatch(SET_SEARCH_STRING(category?.name));

    setDropdownOpen(false);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (search) {
      dispatch(SET_SEARCH_STRING(search));
      navigate('/products/search?s=' + search);
    }
  };

  useEffect(() => {
    setSearch(searchString || '');
    
  }, [searchString]);

  useEffect(() => {
    if (selectedCategory === null) setSelectedItem({ name: 'ALL', id: null });
  }, [selectedCategory]);

  let renderedCategories = categories.map(category => (
    <Link
      to='javascript:void(0)'
      key={category.id}
      onClick={() => handleItemClick(category)}
      className='dropdown-item ul-liste-items-all-buttons'>
      <span
        className='text-decoration-none div-link-category-search'
        style={{ fontSize: '13px' }}>
        {category.name}
      </span>
    </Link>
  ));

  const dropdownRef = useRef(null);
  const handleDocumentClick = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  return (
    <form className='input-group search-inputgroup' onSubmit={handleSearch}>
      <div ref={dropdownRef} className='input-group-btn search-panel'>
        <div className='dropdown my-drop-down-data-seachbar-icon'>
          <button
            type='button'
            className='btn btn-primary dropdown-toggle all-button'
            style={{ fontSize: '13px', border: '1px solid black' }}
            onClick={toggleDropdown}
            disabled={location.pathname.includes('category')}>
            {selectedItem.name}
          </button>
          <div
            className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
            style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <Link
              to='javascript:void(0)'
              onClick={() => handleItemClick({ name: 'ALL', id: null })}
              className='dropdown-item ul-liste-items-all-buttons'>
              <span
                className='text-decoration-none'
                style={{ fontSize: '13px' }}>
                All Category
              </span>
            </Link>
            {renderedCategories}
          </div>
        </div>
      </div>

      <input
        type='hidden'
        name='search_param'
        value={search}
        id='search_param'
      />
      <input
        type='search'
        className='form-control search-input-type'
        name='x'
        id='search'
        placeholder='Search'
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          border: '1px solid black',
        }}
      />
      <span className='input-group-btn'>
        <button
          type='button'
          className='btn btn-success search-logo'
          onClick={handleSearch}>
          <FontAwesomeIcon
            icon={faSearch}
            size='1x'
            className='search-button-header-icon'
          />
        </button>
      </span>
    </form>
  );
}

export default Search;
