# EPH Tracking Viz Assistant

[![Build Status](https://travis-ci.org/stfnh/ephtracking-viz-assistant.svg?branch=master)](https://travis-ci.org/stfnh/ephtracking-api-assistant) 

Hosted on github pages: https://stfnh.github.io/ephtracking-viz-assistant

This web app allows you to preview and generate options for the [ephtracking-viz library](https://github.com/stfnh/ephtracking-viz). The ephtracking-viz library helps you to embed visualizations with data from the EPH Portal:

```
The National Environmental Public Health Tracking Network (Tracking Network) brings together health data and environment data from national, state, and city sources and provides supporting information to make the data easier to understand. The Tracking Network has data and information on environments and hazards, health effects, and population health.

The Tracking Network Data Application Program Interface (API) is an alternate way for developers to query data from the Environmental Public Health Tracking Network. The Tracking API provides a standard Uniform Resource Locator (URL) interface with a JavaScript Object Notation (JSON) formatted response.
```

[National Environmental Public Health Tracking Network](https://ephtracking.cdc.gov)

[Tracking Network Data Application Program Interface (API)](https://ephtracking.cdc.gov/apihelp)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Install the dependencies:
```
yarn
```

Start the development server:
```
yarn start
```

Run tests in watch mode:
```
yarn test
```

Test coverage:
```
yarn test --coverage
```

Build for production:
```
yarn build
```

## Conintuous deployment

Each push will trigger a buld on [TravisCI](https://travis-ci.org/stfnh/ephtracking-api-assistant). If build and tests are successful, the web application will be deployed to github pages.


## License

 Released under the [MIT license](https://github.com/jgthms/bulma/blob/master/LICENSE).