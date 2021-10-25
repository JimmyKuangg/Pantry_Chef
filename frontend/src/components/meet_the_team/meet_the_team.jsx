import React from 'react'
import './meet_the_team.css'
const MeetTheTeam = () => {
    return (
        <div id='meet-the-team-wrapper'>
            <h1 id='meet-the-team-header'>Meet the Team</h1>
            <div id='team-members'>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/P0TZHXH.jpg' alt-text='Darrick'/>
                    <h2 id='name'>Darrick Shin</h2>
                    <h3 id='role'>Flex / Backend</h3>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/darrick-shin/'><i className="fab fa-linkedin"/></a>
                        <a href='https://angel.co/u/darrick-shin'><i className="fab fa-angellist"/></a>
                        <a href='https://github.com/GIT-DS'><i className="fab fa-github"/></a>
                    </div>
                </div>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/gMg63j8.png' alt-text='Jimmy'/>
                    <h2 id='name'>Jimmy Kuang</h2>
                    <h3 id='role'>Backend Lead</h3>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/jimmy-kuang-789967183/'><i className="fab fa-linkedin"/></a>
                        <a href='https://angel.co/u/jimmy-kuang'><i className="fab fa-angellist"/></a>
                        <a href='https://github.com/JimmyKuangg'><i className="fab fa-github"/></a>
                    </div>
                </div>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/dbzMmPo.jpg' alt-text='David'/>
                    <h2 id='name'>David Oh</h2>
                    <h3 id='role'>Frontend</h3>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/david-oh-790071123/'><i className="fab fa-linkedin"/></a>
                        <a href='https://angel.co/u/david-oh-9'><i className="fab fa-angellist"/></a>
                        <a href='https://github.com/davidoh14'><i className="fab fa-github"/></a>

                    </div>
                </div>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/4jdbq0k.png' alt-text='Jimmy'/>
                    <h2 id='name'>Vincent Hsu</h2>
                    <h3 id='role'>Frontend Lead</h3>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/vincent-hsu-45a6a1220/'><i className="fab fa-linkedin"/></a>
                        <a href='https://angel.co/u/vincent-hsu-7'><i className="fab fa-angellist"/></a>
                        <a href='https://github.com/imvincenth'><i className="fab fa-github"/></a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MeetTheTeam