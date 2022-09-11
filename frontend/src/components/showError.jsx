import React from 'react'

const ShowError = (props) => {
    return (
        <div className='error'>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <span className="p-2 red-lighten-4 light-text font-md br-md px-4">
                    {props.message}
                </span>
            </div>
        </div>
    )
}

export default ShowError
