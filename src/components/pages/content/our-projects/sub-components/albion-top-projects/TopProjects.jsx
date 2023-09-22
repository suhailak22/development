import React from "react";
import "./top-projects.css";
import {SwapRightOutlined} from '@ant-design/icons'
import ProjectsImageSlider from "./image-slider/ProjectsImageSlider";

function TopProjects() {
  return (
    <div className="top-projects-section">
      <div className="header-sec">
        <div className="text-intro">
          <h1>Albion Top Projects</h1>
          <p>Featured Residential projects across Bangalore</p>
        </div>
        <div className="allPropBtn">
            <span>See all property</span>
            <SwapRightOutlined/>
        </div>
      </div>
      <ProjectsImageSlider/>
    </div>
  );
}

export default TopProjects;
