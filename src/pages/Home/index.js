import React from "react";
import Layout from '../../components/Layout';
import ExampleScroll from '../../components/ExampleScroll';

const Home = () => (
    <Layout title="ephtracking-viz" subtitle="Easily Generate and Embed Visualizations with Data from CDC's Environmental Public Health Tracking Network">
      <div className="content">
        <p>
          This web app allows you to preview and generate options for the
          ephtracking-viz library. The ephtracking-viz library helps you to embed
          visualizations with data from the EPH Portal.<sup><a rel="noopener noreferrer" href="https://ephtracking.cdc.gov/" target="_blank">[1]</a></sup>
        </p>
        <h1 className="title is-5">Examples</h1>
        <ExampleScroll />
      </div>
    </Layout>
);

export default Home;
