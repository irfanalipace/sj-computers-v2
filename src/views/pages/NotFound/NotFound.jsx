import React from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Header/Search";
import "./NotFound.css"
export default function NotFound() {
    return (
        <div className="notfound-page-design-set">
            <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '70vh', background: 'white' }}>
      <h1 className="display-1 text-primary">404</h1>
      <h2 className="display-4 text-dark">Oops!</h2>
      <h4 className="mb-4">Page Not Found</h4>
     <div><h5>Browse Products</h5></div>
        <Search />
     
      <Link to="/" className="btn btn-primary btn-sm">
        Go Back To Home Page
      </Link>
    </div>
        </div>
    );
}
