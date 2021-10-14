import React from 'react'
import './meet_the_team.css'
const MeetTheTeam = () => {
    return (
        <div id='meet-the-team-wrapper'>
            <h1>Meet the Team</h1>
            <div id='team-members'>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/P0TZHXH.jpg' alt-text='Darrick'/>
                    <h2>Darrick Shin</h2>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/darrick-shin/'><i class="fab fa-linkedin"/></a>
                        <a href='https://github.com/GIT-DS'><i class="fab fa-github"/></a>
                    </div>
                </div>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/gMg63j8.png' alt-text='Jimmy'/>
                    <h2>Jimmy Kuang</h2>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/jimmy-kuang-789967183/'><i class="fab fa-linkedin"/></a>
                        <a href='https://github.com/JimmyKuangg'><i class="fab fa-github"/></a>
                    </div>
                </div>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/dbzMmPo.jpg' alt-text='David'/>
                    <h2>David Oh</h2>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/david-oh-790071123/'><i class="fab fa-linkedin"/></a>
                        <a href='https://github.com/davidoh14'><i class="fab fa-github"/></a>
                    </div>
                </div>
                <div className='team-wrapper'>
                    <img src='https://i.imgur.com/4jdbq0k.png' alt-text='Jimmy'/>
                    <h2>Vincent Hsu</h2>
                    <div className='socials'>
                        <a href='https://www.linkedin.com/in/vincent-hsu-45a6a1220/'><i class="fab fa-linkedin"/></a>
                        <a href='https://github.com/imvincenth'><i class="fab fa-github"/></a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MeetTheTeam