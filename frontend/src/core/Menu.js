import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth/helper";
const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#ffc107" };
    } else {
      return { color: "#fff" };
    }
  };
const Menu = ({history,path})=> {
  return (
    <div>
      <ul className="nav nav-tabs border bg-info">
      {isAuthenticated() && (isAuthenticated().user.user_type==="user") &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/")}
            className="nav-link"
            to="/"
          >
            Home
          </Link>
        </li>)}
        {isAuthenticated() && (isAuthenticated().user.user_type==="admin") &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin")}
            className="nav-link"
            to="/admin"
          >
            AdminHome
          </Link>
        </li>)}
        
        
        {!isAuthenticated() &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/")}
            className="nav-link"
            to="/"
          >
            Home
          </Link>
        </li>)}
        {isAuthenticated() && (isAuthenticated().user.user_type==="user") &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link "
            to="/cart"
          >
            Bookings
          </Link>
        </li>)}
        {isAuthenticated() && (isAuthenticated().user.user_type==="user") &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/orders")}
            className="nav-link "
            to="/userorders"
          >
            Booked Flights
          </Link>
        </li>)}
       
        {isAuthenticated() && (isAuthenticated().user.user_type==="admin") &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/addflight")}
            className="nav-link "
            to="/addflight"
          >
            Add Flight
          </Link>
        </li>)}
        
        {isAuthenticated() && (isAuthenticated().user.user_type==="admin") &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/removeorder")}
            className="nav-link "
            to="/removeorder"
          >
            Flight booked
          </Link>
        </li>)}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              dashboard
            </Link>
          </li>
        )}
         
        <li className="nav-item">
          <Link
            style={currentTab(history, "/search")}
            className="nav-link"
            to="/search"
          >
            Search
          </Link>
        </li>
        {isAuthenticated() &&(
        <li className="nav-item">
          <Link
            style={currentTab(history, "/profile")}
            className="nav-link "
            to="/profile"
          >
            Profile
          </Link>
        </li>)}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Signin
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
              className="nav-link text-white"
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
