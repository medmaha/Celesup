import {useEffect, useState, createContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import Navbar from "./layouts/navbar/navbar";
import MobileNavbarLinks from "./layouts/navbar/mobileNavbarLinks";

// hooks

// route elements 
import Login from './routes/auth/signin/login';
import Register from './routes/auth/register/register';

// VIEWS
import Index from './routes';
import Dashboard from "./routes/dashboard";
import UserProfile from './routes/userProfile';
import ExplorePosts from './routes/explorePosts';
import PageNotFound from './routes/pageNotFound';
import CreateNewPost from './components/dashboard/posts/create/createPost';

export const GlobalContext = createContext({})

function App() {
    const accessToken = localStorage.getItem('access')
    const refreshToken = localStorage.getItem('refresh')

    const [user, setUser] = useState(null)
    const [focusState, setFocusState] = useState(null)
    const [tokens, updateTokens] = useState({access: accessToken, refresh: refreshToken})
 
    useEffect(()=>{
        if (!accessToken || !refreshToken) {   
            setUser(null)
            updateTokens(null)
        }
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if (tokens?.access && tokens?.refresh){
            localStorage.setItem('refresh', tokens.refresh)
            localStorage.setItem('access', tokens.access)
            const client = jwtDecode(tokens.access)
            setUser(client)
        }
        if (!tokens?.access && !tokens?.refresh){
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            setUser(null)
        }
        // eslint-disable-next-line
    },[tokens])

    const contextValues =  {
        user, tokens, state:focusState,
        setUser, updateTokens, setFocusState,
    }
   
    return (
        <div className='App'>
            <GlobalContext.Provider value={contextValues}>
                {/* <Navbar /> */}
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route exact  path='/' element={<Index />}/>
                        <Route path={`/:username`} element={<Dashboard/>}/>
                        <Route path={`/:username/explore`} element={<ExplorePosts/>}/>
                        
                        <Route path={`/profile/:username`} element={<UserProfile/>}/>
                        
                        <Route path='/login' element={<Login setUser={setUser}/>}/>
                        <Route path='/signup' element={<Register/>}/>
                        <Route path='*' element={<PageNotFound/>}/>
                    </Routes>
                    {focusState?.createPost && <CreateNewPost/>}
                    <MobileNavbarLinks/>
                </BrowserRouter>
            </GlobalContext.Provider>
        </div>
   );
} 

export default App;
