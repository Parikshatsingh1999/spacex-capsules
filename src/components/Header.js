import React from 'react'
import logo from '../banner.jpg'
export default function Header() {
    return (
        <div>
            <header>
                <div className='main-header'>
                    <div className='image-box'>
                        <img src={logo} alt="SpaceX Banner" />
                        <div className='overflow-text'>
                            <div className='wrapper'>
                                <h4> Recent Launch </h4>
                                <h2> STARLINK MISSION </h2>
                            </div>
                        </div>
                    </div>
                    <div className='description-text'>
                        <h1> “You want to wake up in the morning and think the future is going to be great - and that’s what being a spacefaring civilization is all about. It’s about believing in the future and thinking that the future will be better than the past. And I can’t think of anything more exciting than going out there and being among the stars.”
                        </h1>
                        <h2> -Elon Musk</h2>
                    </div>
                </div>
            </header>
        </div>
    )
}
