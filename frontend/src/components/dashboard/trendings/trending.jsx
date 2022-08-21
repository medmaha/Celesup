import React from 'react'
import Trend from './trend'
import'./style.css'
const Trending = () => {
  return (
      <div className="trending br-md">
        <div className='card mb-1 br-lg d-flex flex-column align-items-center cursor-pointer'>
            <h4>Try premium for free</h4>
            <p className='' style={{fontSize:'.9rem'}}>
              Lorem ipsum dolor, sit amet ctetur adipisicing ipsum elit A aliquam! ctetur.
            </p>
        </div>
        <div className="suggestions mb-1 pb-__">
          <Trend hint={'Technology'} instance={'#opensourse'} stats={'5,741 streams'} first={true}/>
          <Trend hint={'Alpha Dem - trending'} instance={'@alpha123dem'} stats={'7,041 followers'}/>
          <Trend hint={'Technology - trending'} instance={'#opensourse'} stats={'5,741 streams'}/>
          <Trend hint={'Technology - trending'} instance={'#opensourse'} stats={'5,741 streams'} last={true}/>

        </div>

        <div className="suggestions">
          <Trend first={true}/>
          <Trend/>
          <Trend/>
          <Trend/>
          <Trend last={true}/>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button className="btn-primary px-2 py-2 font-md br-md">
              Request Premium
          </button>
        </div>
    </div>
  )
}

export default Trending
