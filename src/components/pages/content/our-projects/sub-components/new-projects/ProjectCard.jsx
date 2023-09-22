import React from "react";
import "./new-projects.css";
import locationImg from "../../../../../../assets/map.png";
import bedImg from "../../../../../../assets/bed.png";
import bathImg from "../../../../../../assets/shower.png";
import plotImg from "../../../../../../assets/plots.png";
import { newProjectsStyles, styles } from "../../../../../../common/styles";

const ProjectCard = ({ item }) => {
  return (
    <div className="new_project_card">
      <div className="project_image">
        <img
          src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <section className="project_description">
        <span style={newProjectsStyles.projectName}>Rishi Coral Wood Bungalows</span>
        <span className='textWithIcon'>
          <img src={locationImg} alt="" />
          <span style={newProjectsStyles.projectAmenities}>Bangalore, city</span>
        </span>
        <div className="more-details">
          <span className='textWithIcon'>
            <img src={bedImg} alt="" />
            <span style={newProjectsStyles.projectAmenities}>2 Beds</span>
          </span>
          <span className='textWithIcon'>
            <img src={bathImg} alt="" />
            <span style={newProjectsStyles.projectAmenities}>3 Bath</span>
          </span>
          <span className='textWithIcon'>
            <img src={plotImg} alt="" />
            <span style={newProjectsStyles.projectAmenities}>Plot</span>
          </span>
        </div>
        <span>₹ <span style={newProjectsStyles.projectPrice}>1.39 Cr </span> onwards</span>
        <span style={newProjectsStyles.byWhom}>Marketed by Valmark Estates LLP</span>
      </section>
    </div>
  );
};

export default ProjectCard;
