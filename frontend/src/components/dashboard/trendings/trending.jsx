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
        <div className="box-shadow overflow-hidden br-md p-0 suggestions">
          <Trend/>
          <Trend/>
          <Trend/>
          <Trend/>
        </div>

        <div className="box-shadow overflow-hidden br-md mt-2  p-0 suggestions">
          <Trend/>
          <Trend/>
          <Trend/>
          <Trend/>
          <Trend/>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <span className="btn-outline-teal br-md teal-text text-hover-white">
              Request Premium
          </span>
        </div>
    </div>
  )
}

export default Trending
