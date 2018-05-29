import React from "react";

const Home = () => (
  <div className="container">
    <section className="hero is-primary">
      <div className="hero-body">
        <h1 className="title">EPH-Viz Assistant</h1>
        <h2 className="subtitle">
          Easily generate and embed visualizations with data from CDC's
          Environmental Public Health Tracking Network.
        </h2>
      </div>
    </section>
    <hr />
    <div className="content">
      <p>
        This web app allows you to preview and generate options for the
        ephtracking-viz library. The ephtracking-viz library helps you to embed
        visualizations with data from the EPH Portal<sup><a rel="noopener noreferrer" href="https://ephtracking.cdc.gov/" target="_blank">[1]</a></sup>:
      </p>
      <blockquote>
        The National Environmental Public Health Tracking Network (Tracking
        Network) brings together health data and environment data from national,
        state, and city sources and provides supporting information to make the
        data easier to understand. The Tracking Network has data and information
        on environments and hazards, health effects, and population health.
      </blockquote>
    </div>
  </div>
);

export default Home;
