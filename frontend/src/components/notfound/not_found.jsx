import React from 'react'
import { Link } from 'react-router-dom';
import notfound from './404.png'
import './not_found.css'
const NotFound = () => {
    return ( 
        <div id='not-found'>
            <div id='left-content'> 
                <h1>Hey you're not supposed to be here!</h1>
                <p>Go Back <Link to='/' id='bold-link'>Home</Link>!!!</p>
            </div>
            <img id='not-found-image' src={notfound}/>
        </div>
     );
}

export default NotFound;