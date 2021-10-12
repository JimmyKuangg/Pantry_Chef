import React, { Component } from 'react'
import "./search.css";

export default class Search extends Component {
  render() {
    return (
      <div>
        <div className="search-wrapper">

          <div className="search-input-wrapper">
            <div>toggle</div>
            <input type="text" className="search-bar" />
            <div>search button</div>
          </div>

          <div className="selected-ingredients">
            Ingredients
          </div>
    
        </div>
      </div>
    )
  }
}
