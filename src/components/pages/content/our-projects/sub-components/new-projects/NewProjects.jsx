import React from "react";
import "./new-projects.css";
import { images } from "../../../../../../common/styles";
import ProjectCard from "./ProjectCard";

const NewProjects = () => {
  return (
    <>
      <div className="new-projects">
        <div className="text-intro">
          <h1>New Projects</h1>
          <p>Featured Residential projects across Bangalore</p>
        </div>
        <div className="new-projects-grid">
          {images.map((item) => (
              <ProjectCard key={item.id} item={item}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewProjects;
