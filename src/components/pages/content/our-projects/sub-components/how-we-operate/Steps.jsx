import React from "react";
import "./steps.css";

let steps = [
  {
    id: 1,
    title: "Explain Your needs",
    description:
      "Builders start by meeting with the client or project owner to understand their requirements, preferences, and budget. They discuss the scope of the project,",
  },
  {
    id: 2,
    title: "Select Package",
    description:
      "If the project requires custom designs or architectural plans, builders collaborate with architects or designers to create detailed blueprints and construction drawings.",
  },
  {
    id: 3,
    title: "Relax and enjoy yourself",
    description:
      "Builders conduct regular inspections to ensure that the construction adheres to high-quality standards and safety regulations. They address any issues that may arise during the construction process.",
  },
  {
    id: 4,
    title: "Get your leads",
    description:
      "Builders start by meeting with the client or project owner to understand their requirements, preferences, and budget. They discuss the scope of the project,",
  },
];

const Steps = () => {
  return (
    <div className="app-steps">
      <div className="text-intro">
        <h1>How We Operate</h1>
        <p>Our work process IN 4 EASY STEPS</p>
      </div>
      <div className="steps-grid">
        {steps.map((step) => (
          <div className="single-step">
            <span className="stepper">{step.id}</span>
            <span className="step-title">{step.title}</span>
            <span className="step-description">{step.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
