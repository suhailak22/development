import React from "react";
import "./footer.css";
import AlbionApp from '../../assets/albionapp.png'
import playStore from '../../assets/playstore.png'
import appStore from '../../assets/appstore.png'
import About from "./about/About";
import AlbionPageEnd from "./albion-page-end/AlbionPageEnd";

const Footer = () => {
  return (
    <div>
      <div className="footer-banner">
        <div className="footer-left-side">
          <h1 style={{display : "flex" , justifyContent : "center" , alignItems : "center"}}>
            Download <h2 style={{ color: "#8C193F" }}>&nbsp;Albion&nbsp;</h2> Mobile App
          </h1>
          <span>Simply sign into your albion mobile app account and look for the more updates.</span>
          <div className="app-buttons">
            <img src={playStore}/>
            <img src={appStore}/>
          </div>
        </div>
        <div className="app-image">
          <img src={AlbionApp} />
        </div>
      </div>
      <About/>
      <AlbionPageEnd/>
    </div>
  );
};

export default Footer;
