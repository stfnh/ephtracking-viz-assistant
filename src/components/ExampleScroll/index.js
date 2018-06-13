import React, { Component } from "react";
import {
  Link,
  Element,
  animateScroll as scroll,
} from "react-scroll";

import "./ExampleScroll.css";

import BubbleVizPreview from "../BubbleVizPreview";
import VizPreview from "../VizPreview";

export default class ExampleScroll extends Component {
  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    return (
      <div className="examplescroll">
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz1"
          spy
          smooth
          duration={500}
        >
          Example 1: Smoking and COPD (Bubble Chart)
        </Link>
        <Link
          className="examplescroll__link"
          to="viz2"
          spy
          smooth
          duration={500}
        >
          Example 2: Obesity (Choropleth Map)
        </Link>
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz3"
          spy
          smooth
          duration={500}
        >
          Example 3: Air Quality in NYC (Time-Series Chart)
        </Link>
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz4"
          spy
          smooth
          duration={500}
        >
          Example 4: COPD (Choropleth Map)
        </Link>
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz5"
          spy
          smooth
          duration={500}
        >
          Example 5: Heat Stress in Florida (Time-Series Chart)
        </Link>
        <hr />
        <Element name="viz1" className="element examplescroll__element">
          <BubbleVizPreview
            title="Smoking and COPD"
            xMeasureId="561"
            xLabel="Percent of current adult smokers"
            yMeasureId="648"
            yLabel="Crude rate of hospitalizations for COPD among persons 25 and over per 10,000 population"
            temporal="2011-2014"
            width={1000}
            height={600}
          />
        </Element>
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz2"
          spy
          smooth
          duration={500}
        >
          Next Example 2: Obesity (Choropleth Map)
        </Link>
        <a className="examplescroll__link" onClick={this.scrollToTop}>Scroll to Top</a>

        <hr />
        <Element name="viz2" className="element examplescroll__element">
          <VizPreview
            type="choropleth"
            title="Percent of adults aged 18 years and over who were obese (BMI>=30.0)"
            showLegend
            breakGroups={9}
            colorScheme="schemeOrRd"
            measureId="564"
            temporal="2011-2016"
            stratificationLevelId="1"
            isSmoothed="0"
          />
        </Element>
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz3"
          spy
          smooth
          duration={500}
        >
          Next Example 3: Air Quality in NYC (Time-Series Chart)
        </Link>
        <a className="examplescroll__link" onClick={this.scrollToTop}>Scroll to Top</a>

        <hr />
        <Element name="viz3" className="element examplescroll__element">
          <VizPreview
            type="line-chart"
            title="NYC's five Boroughs: Annual average ambient concentrations of PM 2.5 in micrograms per cubic meter"
            measureId="296"
            temporal="2001-2014"
            stratificationLevelId="2"
            geographicTypeIdFilter="2"
            geographicItemsFilter={[
              "36005",
              "36061",
              "36047",
              "36081",
              "36085"
            ]}
            isSmoothed="0"
            width={1000}
            height={600}
          />
        </Element>
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz4"
          spy
          smooth
          duration={500}
        >
          Next Example 4: COPD (Choropleth Map)
        </Link>
        <a className="examplescroll__link" onClick={this.scrollToTop}>Scroll to Top</a>

        <hr />
        <Element name="viz4" className="element examplescroll__element">
          <VizPreview
            type="choropleth"
            title="Age-adjusted death rate from COPD among persons 25 and over per 100,000 population"
            showLegend
            breakGroups={9}
            colorScheme="schemeGnBu"
            measureId="706"
            temporal={["2000", "2005", "2010", "2015"]}
            stratificationLevelId="2"
            isSmoothed="1"
          />
        </Element>
        <Link
          className="examplescroll__link"
          activeClass="active"
          to="viz5"
          spy
          smooth
          duration={500}
        >
          Next Example 5: Heat Stress in Florida (Time-Series Chart)
        </Link>
        <a className="examplescroll__link" onClick={this.scrollToTop}>Scroll to Top</a>
        <hr />
        <Element name="viz5" className="element examplescroll__element">
          <VizPreview
            type="line-chart"
            title="Florida: Age-adjusted rate of emergency department visits for heat stress per 100,000 population"
            measureId="440"
            temporal="2001-2014"
            stratificationLevelId="4"
            geographicTypeIdFilter="1"
            geographicItemsFilter={["12"]}
            isSmoothed="0"
            queryParams="GenderId=1,2"
            width={1000}
            height={600}
          />
        </Element>
        <a className="examplescroll__link" onClick={this.scrollToTop}>Scroll to Top</a>
      </div>
    );
  }
}
