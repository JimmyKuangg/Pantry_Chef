import React from "react";
import Search from '../search/search_container';
import logo from './logo.png';
import "./main.css";
import "../../index.css"

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <div className="main-content">
          
          

          <div className="main-head">
            <img className="home-logo" src={logo} alt="Pantry Chef logo" />

            <div className='main-instructions'>
              Search for all ingredients in your pantry to find recipes you can make. Save these ingredients in 'My Pantry' (upper right) to quickly search next time.
            </div>
            <Search />
          </div>

        </div>
      </div>
    );
  }
}

export default MainPage;
