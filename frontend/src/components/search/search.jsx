import React, { Component } from 'react'
import "./search.css";

export default class Search extends Component {
  render() {
    return (
      <div>
        <div className="search-wrapper">

          <div className="search-input-wrapper">
            <input type="text" className="search-bar" placeholder="Enter an ingredient..." />
            
            <div className="search-icon"></div>
          </div>

          <div className="selected-ingredients">
            Ingredients
          </div>
    
        </div>
      </div>
    )
  }
}
