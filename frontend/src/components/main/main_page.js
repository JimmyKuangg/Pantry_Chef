import React from "react";
import Search from '../search/search_container';
import logo from './logo.png';
import "./main.css";
import "../../index.css"
import navlogo from "../nav/navlogo.png";
import Sidemenu from "../sidemenu/sidemenu";


class MainPage extends React.Component {
  render() {
    return (
      <div id='content-body'>
        <div className="main-content">
          
          

          <div className="main-head">
            <div className='logo-wrapper'>
              <p id='title-text'>PANTRY</p>
              <img className="home-logo" src={navlogo} alt="Pantry Chef logo" />
              <p id='title-text'>CHEF</p>
            </div>
            <div className='tooltip-wrapper'>
              <div className='main-tooltip'>
                <div className='tooltip-mark'>?</div>              
                <div className='main-instructions'>
                  Search for all ingredients in your pantry to find recipes you can make. 
                  Recipes will only show if at least 50% of its ingredients are searched for.
                  Try adding 'egg' as a search term to find another recipe!
                </div>
              </div>
            </div>
            <Search />
          </div>

        </div>
        {/* <Sidemenu/> */}
      </div>
    );
  }
}

export default MainPage;
