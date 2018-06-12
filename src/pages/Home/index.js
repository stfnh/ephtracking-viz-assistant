import React from "react";
import Layout from '../../components/Layout';
import ExampleCarousel from '../../components/ExampleCarousel';

const Home = () => (
    <Layout title="EPH-Viz Assistant" subtitle="Easily generate and embed visualizations with data from CDC's Environmental Public Health Tracking Network">
      <div className="content">
        <p>
          This web app allows you to preview and generate options for the
          ephtracking-viz library. The ephtracking-viz library helps you to embed
          visualizations with data from the EPH Portal.<sup><a rel="noopener noreferrer" href="https://ephtracking.cdc.gov/" target="_blank">[1]</a></sup>
        </p>
        <h1 className="title is-5">Examples</h1>
        <ExampleCarousel />
      </div>
    </Layout>
);

export default Home;
