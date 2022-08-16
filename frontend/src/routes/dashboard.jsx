import'../cssStyles/dashboard.css'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';

import Activity from '../components/dashboard/activities/activity';
import PostsContainer from '../components/dashboard/posts/postsContainer';
import Trending from '../components/dashboard/trendings/trending';



const Dashboard = () => {    

     return (
            <div className="dashboard container">
                <div className="feeds__wrapper row justify-content-around mt-1">
                    <div className="activity col-3-lg" id='activity'>
                        <Activity />
                    </div>
        
                    <div className="posts col-12-xs col-8-sm col-8-md col-6-lg px-1">
                        <PostsContainer/>
                    </div>
            
                    <div className="trending col-4-sm col-4-md col-3-lg" id='trending'>
                        <Trending/>
                    </div>
                </div>
            </div>
        )
}

export default Dashboard;
