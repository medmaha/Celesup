import { useEffect, useState } from 'react'
import'./postPlaceholder.css'

const PostPlaceholder = ({amount=10}) => {
    const [count, setCount] = useState([])

    useEffect(()=>{
        const total = []
        for (let idx = 0; idx < amount; idx++) {
            let placeHolder = {id:idx.toString()}
            total.push(placeHolder)
        }
        if (total.length > 0){
            setCount(total)
        }

        // eslint-disable-next-line
    },[])
    return (
        <>
            {count?.map(placeholder=>{
                return(
                <div key={placeholder.id} className="overflow-hidden pos-relative card p-3 mb-3 br-md placeholder">
                    <div className="post__author">
                        <span className="avatar"></span>
                        <span className="username_and_time">
                            <span className="username"></span>
                            <span className="time"></span>
                        </span>
                    </div>
                    <div className="post__caption"></div>
                    <div className="post__excerpt">
                        <span className="excerpt"></span>
                        <span className="excerpt"></span>
                        <span className="excerpt"></span>
                    </div>
                    <div className="post__image">
                        {/* <img className='animate responsive' src={require('./default-thumbnail.png')} alt=""/> */}
                    </div>
                    <div className="post__interactions"></div>
                    <div className="animate"></div>
                </div>
                )
            })}
        </> 
    )
}

export default PostPlaceholder
