import React from "react";
import "./albion-page-end.css";
import mainLogo from "../../../assets/footlogo.png";
import faceBook from "../../../assets/facebook.png";
import linkedin from "../../../assets/linkedin.png";
import youtube from "../../../assets/youtube.png";
import instagram from "../../../assets/instagram.png";
import twitter from "../../../assets/twitter.png";

let prop = [
  "Buy",
  "Sell",
  "Rent",
  "Property Sell",
  "PG",
  "Support",
  "Feedback",
];

let socialLogos = [
    faceBook , 
    twitter,
    instagram,
    youtube,
    linkedin
]

let otherServices = [
  "   Help",
  "Privacy Policy",
  "Careers",
  "Support",
  "Blog",
  "Testimonials",
  "Buy Our Services",
  "Customer Care",
];

const AlbionPageEnd = () => {
  return (
    <div className="albion-page-end_section">
      <div className="links-albion">
        <div className="prop-links">
          <img src={mainLogo} />
          <div>
            {prop.map((item, index) => (
              <span className="prop-link"> {item} |</span>
            ))}
          </div>
        </div>
        <div className="social-links">
          <h4>Social Links</h4>
          <div className="social-links-flex">
            {
                socialLogos.map(logo => <img src={logo}/>)
            }
          </div>
        </div>
      </div>
      <div className="other-services">
        <div className="services">
          {otherServices.map((service) => (
            <p key={service} className="service">
              {service}
            </p>
          ))}
        </div>
      </div>
      <div className="copyrights">
        <div className="copyrightsText">
          <span className="leftside">
            Copyright 2023 Albion - All rights reserved.
          </span>
          <span className="rightside">Design - AVANEXA</span>
        </div>
      </div>
    </div>
  );
};

export default AlbionPageEnd;
