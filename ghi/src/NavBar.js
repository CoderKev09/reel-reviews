import "./index.css";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import TokenContext from "./TokenContext";
import SearchBar from "./searchBar";

function Nav() {
  const [Hidelogin, setHidelogin] = useContext(TokenContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const url = "http://localhost:8000/token";
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await fetch(url, fetchConfig);
      const tokenData = await response.json();
      setUser(tokenData.account);

      if (tokenData === null) {
        setHidelogin(true);
      } else {
        setHidelogin(false);
      }
    };
    fetchToken();
  }, []);

  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark">
      <NavLink className="navbar-brand" to="/">
        <div className="logo">ReelReviews </div>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-start"
        id="navbarSupportedContent"
      >
        <ul className="navbar-genres list-unstyled">
          <li className="navbar-item-genres">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-genres">
                Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/genres/action">
                  Action
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/adventure">
                  Adventure
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/animation">
                  Animation
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/comedy">
                  Comedy
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/crime">
                  Crime
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/documentary">
                  Documentary
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/drama">
                  Drama
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/family">
                  Family
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/fantasy">
                  Fantasy
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/history">
                  History
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/horror">
                  Horror
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/music">
                  Music
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/mystery">
                  Mystery
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/romance">
                  Romance
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/sciencefiction">
                  Science Fiction
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/tvmovie">
                  TV Movie
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/thriller">
                  Thriller
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/war">
                  War
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/genres/western">
                  Western
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
      <div>
        <SearchBar />
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="navbar-item1">
              {Hidelogin && (
                <NavLink to="/signup" className="btn btn-primary">
                  Signup
                </NavLink>
              )}
            </li>
            <li className="navbar-item2">
              {Hidelogin && (
                <NavLink to="/login" className="btn btn-info">
                  Login
                </NavLink>
              )}
            </li>
            <li className="navbar-item1">
              {!Hidelogin && (
                <NavLink to="/logout" className="btn btn-danger">
                  Logout
                </NavLink>
              )}
            </li>
            <li className="navbar-item2">
              {!Hidelogin && (
                <NavLink to={`/${user.username}`} className="btn btn-warning">
                  Profile
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}

export default Nav;
