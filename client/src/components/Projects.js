import React from "react";

const Projects = props => {
  return props.projects.map((project, index) => {
    return (
      <div className="projects-wrapper" key={index}>
        <h4> Name: {project.name} </h4>
        <p> Description: {project.description} </p>
      </div>
    );
  });
};
export default Projects;
