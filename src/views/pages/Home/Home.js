import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <header className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact</a>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="bi bi-cart-fill"></i></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="bi bi-person-fill"></i></a>
        </li>
      </ul>
    </div>
  </div>
</header>

        </div>
    );
};

export default Home;
