import React, { useEffect, useState } from 'react'
import logo from '../close.svg';
import capsule from '../capsules.jpg'

export default function Grid(props) {

    const [showOverlay, setOverlay] = useState(false);

    useEffect(() => {

        showOverlay ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";

    }, [showOverlay])

    const { name, id, description, status, original_launch, missions, resuseCount, landings } = props.gridItem;
    return (<>
        <div className='grid-item' onClick={() => setOverlay(true)}>
            <div className='main-item-wrap'>
                <h4> {id} </h4>
                <h2> {name} </h2>
                <p> {description} </p>
            </div>
        </div>
        <div className={`overlay-item ${showOverlay ? 'active' : ''}`}>
            <div className='overlay-wrapper'>
                <p className='overlay-close' onClick={() => setOverlay(false)}><img src={logo} alt="X" /> </p>
                <div className="overlay-container">
                    <img className='capsule-box' src={capsule} alt='capsule' />
                    {(name && name?.length !== 0) && <div className=' item-batch'> <label>Capsule Detail :</label> <h4> {name} </h4> </div>}
                    {(id && id?.length !== 0) && <div className=' item-batch'> <label>Capsule Id :</label> <h4> {id} </h4> </div>}
                    {(description && description?.length !== 0) && <div className=' item-batch'> <label>Capsule Description :</label>  <h4> {description} </h4> </div>}
                    {(status && status?.length !== 0) && <div className=' item-batch'> <label>Capsule Status :</label> <h4> {status} </h4> </div>}
                    {(original_launch && original_launch?.length !== 0) && <div className=' item-batch'> <label>Capsule Original Launch Time : </label> <h4> {original_launch} </h4> </div>}
                    {
                        missions?.length !== 0 && (
                            <div key={id} className='missions-performed item-batch'>
                                <label> Missions Performed :</label>
                                {<div className='mision-container'> {
                                    missions?.map(item => (<div key={item.name} className='mission-des'>
                                        {item.name?.length && <div className='item-batch'> <label> Mission Name : </label> <h6> {item.name} </h6> </div>}
                                        {item.flight !== 0 && <div className='item-batch'> <label> Flight/s Took : </label> <h6> {item.flight} </h6> </div>}
                                    </div>
                                    ))
                                }
                                </div>}
                            </div>
                        )
                    }
                    {resuseCount !== 0 && <div className=' item-batch'> <label> Number of times Capsule has been reused : </label> <h4 className='number'> {resuseCount} </h4> </div>}
                    {landings !== 0 && <div className=' item-batch'> <label> Number of times Capusle has landed safely :</label> <h4 className='number'> {landings} </h4></div>}
                </div>
            </div>
        </div>
    </>
    )
}
