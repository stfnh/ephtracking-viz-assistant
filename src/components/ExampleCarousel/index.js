import React, { Component } from 'react'
import Slider from 'react-slick';

import BubbleVizPreview from '../BubbleVizPreview';
import VizPreview from '../VizPreview';

import './ExampleCarousel.css';


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#6abfb0" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#6abfb0" }}
      onClick={onClick}
    />
  );
}

export default class ExampleCarousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: 'preview',
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <Slider {...settings}>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <VizPreview
            type="line-chart"
            title="NYC's five Boroughs: Annual average ambient concentrations of PM 2.5 in micrograms per cubic meter"
            measureId="296"
            temporal="2001-2014"
            stratificationLevelId="2"
            geographicTypeIdFilter="2"
            geographicItemsFilter={['36005', '36061', '36047', '36081', '36085']}
            isSmoothed="0"
            width={1000}
            height={600}
          />
        </div>
        <div>
          <VizPreview
            type="choropleth"
            title="Age-adjusted death rate  from COPD among persons 25 and over per 100,000 population"
            showLegend
            breakGroups={9}
            colorScheme="schemeGnBu"
            measureId="706"
            temporal={['2000','2005','2010','2015']}
            stratificationLevelId="2"
            isSmoothed="1"
          />
        </div>
        <div>          
        <VizPreview
            type="line-chart"
            title="Florida: Age-adjusted rate of emergency department visits for heat stress per 100,000 population"
            measureId="440"
            temporal="2001-2014"
            stratificationLevelId="4"
            geographicTypeIdFilter="1"
            geographicItemsFilter={['12']}
            isSmoothed="0"
            queryParams="GenderId=1,2"
            width={1000}
            height={600}
          />
        </div>
      </Slider>
    );
  }
}
