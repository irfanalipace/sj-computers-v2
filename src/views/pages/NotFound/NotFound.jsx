import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../components/Header/Search';
import './NotFound.css';
export default function NotFound() {
  return (
    <div className='notfound-page'>
      <div className='d-flex flex-column align-items-center justify-content-center text-center w-100'>
        <div className='notfound-page-container'>
          <h1 className='display-1 mb-0'>404</h1>
          <h2 className='display-4 text-dark'>Oops!</h2>
          <h4 className='mb-4'>Page Not Found</h4>
          <div>
            <h5 className='text-start'>Browse Products:</h5>
          </div>
          <div className='d-flex justify-content-center'>
            <Search />
          </div>

          <Link to='/' className='btn btn-success btn-sm mt-3 py-2 px-4'>
            Go To Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
