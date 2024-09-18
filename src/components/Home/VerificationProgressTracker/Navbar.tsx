import React from "react";
import injiLogo from "../../../assets/inji-logo.svg";
import MOALogo from "../../../assets/moa_logo.svg";
import AgristackLogo from "../../../assets/agri_stack_logo.svg";
import { NavbarContainer } from "./styles";
import Emblem from "../../../assets/emblem-dark.png";
import "./Navbar.css";
function Navbar(props: any) {
  // Logo goes here
  return (
    <NavbarContainer>
      <nav className="navbar">
        <div>
          {/* <a className="navbar-brand"> */}
          <div className="row d-flex logo">
            {/* <div className="col"> */}
            <div className="col col-sm-4 col-md-4 emblem d-flex">
              <img src={Emblem} alt="" className="moa-logo d-inline-block" />
            </div>
            <div className="col col-sm-6 col-md-6">
              <div className="row logo-text">
                <p>
                  Department of Agriculture & Farmers Welfare
                  <br />
                  Ministry of Agriculture & Farmers Welfare
                  <br /> Government of India
                </p>
              </div>
              <div className="row">
                <img src={AgristackLogo} alt="" className="agristack-logo" />
              </div>
            </div>
            {/* <div className="col col-sm-6 col-md-6 logo-text d-flex flex-column">
              <div className="my-auto ml-2">

              </div>
            </div>
            <div className="col col-sm-2 col-md-2">
              <img
                src={AgristackLogo}
                alt=""
                // className="agristack-logo"
              />
            </div>
            </div> */}
          </div>
        </div>
      </nav>
    </NavbarContainer>
  );
}

export default Navbar;
