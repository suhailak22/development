import React from "react";
import "./featured-projects.css";
import FeaturedImageSlider from "./image-slider/FeaturedImageSlider";
import TopProjects from "../albion-top-projects/TopProjects";

const FeaturedProjects = () => {
  return (
    <>
      <div className="featured-projects">
        <div className="text-intro">
          <h1>Featured Projects</h1>
          <p>Featured Residential projects across Bangalore</p>
        </div>
        <div>
          <FeaturedImageSlider />
        </div>
      </div>
    </>
  );
};

export default FeaturedProjects;
