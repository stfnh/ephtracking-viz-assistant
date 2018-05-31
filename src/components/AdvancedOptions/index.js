import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @class AdvancedOptions
 * @extends {Component}
 *
 */
class AdvancedOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLegend: true,
      breakGroups: 8,
      colorScheme: 'schemeYlGn'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.handleChange(this.state); // default values
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => this.props.handleChange(this.state));
  }

  render() {
    return (
      <Fragment>
        <div className="field">
          <label className="label">Number of break groups</label>
          <div className="control">
            <input
              style={{maxWidth: 50}}
              className="input"
              min={3}
              type="number"
              name="breakGroups"
              value={this.state.breakGroups}
              onChange={this.handleInputChange}/>
            </div>
        </div>

        <div className="field">
          <label className="label">Color scheme</label>
          <div className="control">
            <div className="select">
              <select name="colorScheme" value={this.state.colorScheme} onChange={this.handleInputChange}>
                <option value="schemeYlGn">Yellow to Green</option>
                <option value="schemeBuGn">Green</option>
                <option value="schemeBuPu">Blue</option>
                <option value="schemeOrRd">Red</option>
                <option value="schemeGnBu">Green to Blue</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="checkbox">
            <input
              type="checkbox"
              name="showLegend"
              checked={this.state.showLegend}
              onChange={this.handleInputChange}/> Show legend
          </label>
        </div>
      </Fragment>
    );
  }
}

AdvancedOptions.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default AdvancedOptions;
