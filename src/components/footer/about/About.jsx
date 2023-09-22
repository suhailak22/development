import React from "react";
import "./about.css";

let aboutData = [
  {
    title: "About Albion",
    description:
      "Albion portal is designed to make eAuction easy and convenient for buyers, bidders and bank users alike We have been in the market for several years and built up trust over the years by setting up a hassle-free eAuction process which is legally safe and user-friendly.",
  },
  {
    title: "Bank Auctions Simplified",
    description:
      "Albion is a super convenient portal designed and developed to help private and public banks to auction their NPAs in the most effective and easiest approach. Participating in auction is no more burdensome. ",
  },
  {
    title: "Albion Property",
    description:
      "Albion portal is designed to make eAuction easy and convenient for buyers, bidders and bank users alike.",
  },
  {
    title: "ALBION Investments & Holdings Pvt Ltd",
    description:
      "ALBION Investments & Holdings Pvt Ltd is a nidhi company registered under the RBI Nidhi rules section 406 of the companies ACT 2013, (section 620A of the companies ACT 1956) and is duly approved by the GOVT of India. ",
  },
];

const About = () => {
  return (
    <div className="about-section">
      <div className="about-grid">
        {
            aboutData.map((item) => <div className="itemDiv">
                <h5 className="title">{item.title}</h5>
                <span className="description">{item.description}</span>
            </div>)
        }
      </div>
    </div>
  );
};

export default About;
