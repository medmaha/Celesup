import'./userProfile.css'
import { useEffect, useContext } from 'react' 
import {GlobalContext} from '../App'
import useAxiosRequest from '../hooks/useAxiosRequest'
import { celesupApi } from '../axiosInstances'
import { useState } from 'react'


// const BASE_URL = ''
const BASE_URL = 'http://localhost:8000'

const UserProfile = () => {
    
    // eslint-disable-next-line
    const [profileData, pendingData, error, sendAxiosRequest] = useAxiosRequest()
    const [readOnly, setReadOnly] = useState(false)
    const context = useContext(GlobalContext)


    useEffect(()=>{
        if (context.user?.first_name && context.user?.last_name){
            document.title = context.user.first_name?.toUpperCase() +' '+ context.user.last_name?.toUpperCase()
        }
        else{
            document.title = 'CELESUP | '+context.user?.username
        }
        requestProfileData('/profile/view', 'POST', new FormData())
        
        if (context.user?.id === localStorage.getItem('pvpk')){
            setReadOnly(true)
        }
        // eslint-disable-next-line 
    },[])

    useEffect(()=>{
        if (!profileData) return

        if (!readOnly){
            context.setUser({...context.user, avatar:BASE_URL+ profileData.avatar})
        }

        // eslint-disable-next-line
    },[profileData])



    function requestProfileData(url, method, form, config={}) {
        const profileID =  localStorage.getItem('pvpk')
        form.append('Profile-Id', profileID)
        
        sendAxiosRequest({
            axiosInstance: celesupApi,
            url: url,
            method: method,
            form: form,
            options: config
        })

    }

    function editProfileImages({currentTarget}) {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.click()

        input.addEventListener('change', ()=>{
            const config = {headers:{'Content-Type':'multipart/form-data'}}
            const form = new FormData()
            form.append(currentTarget.getAttribute('data-field'), input.files[0])
            requestProfileData('/profile/edit', 'PUT', form, config)
        })
    }

    return (
            <div className="user__profile container mt-2">
                <div className='row justify-content-center gap-1'>
                    {profileData &&
                    <>
                            <div className="col-9-lg col-8-md" id='columnOne'>
                                <div className="profile pos-relative">
                                    <div className="cover__image">
                                        <img className='responsive' src={BASE_URL + profileData.cover_img} alt=""/>
                                    </div>
                                    {readOnly ?
                                        <>
                                            <div onClick={editProfileImages} data-field='avatar' className="profile__avatar pos-absolute z-1">
                                                <img src={BASE_URL + profileData.avatar} className='responsive' alt="" />
                                            </div>
                                            <div onClick={editProfileImages} data-field='cover_img' className="edit__cover_image__btn br-full pos-absolute top-5 p-__ grey-lighten-2" style={{right: '2%'}}>
                                                    <span className="icon-wrapper d-flex align-items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                                                </span>
                                            </div>
                                        </>
                                            :
                                        <>
                                            <div data-field='avatar' className="profile__avatar pos-absolute z-1">
                                                <img src={BASE_URL + profileData.avatar} className='responsive' alt="" />
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="profile__information card br-none pt-3 pos-relative pb-1">
                                    <div className="row">
                                        <div className="col-7-md px-2">
                                            <span className="font-lg full_name">
                                                {profileData.full_name}
                                            </span>
                                            <p className="biography test-muted">
                                                {profileData.biography} 
                                            </p>
                                            <div className='d-flex align-items-center justify-content-between font-sm mt-1 mb-1 text-center'>
                                                <div>
                                                    <span>{profileData.city} The Gambia </span>
                                                    <span className='mx-1 teal-text-lighten-3 cursor-pointer text-hover-blue-lighten-3'>Contact Info</span>
                                                
                                                </div>
                                                <div className="friends">
                                                    <button className="btn-outline-teal btn-small teal-text-lighten-3 text-hover-white">
                                                        {profileData.friends} Friends
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='social d-flex justify-content-evenly font-sm'>
                                                <span className="btn-outline-blue blue-text font-md br-md">
                                                    Followers {profileData.followers}
                                                </span>
                                                <span className="btn-outline-blue blue-text font-md br-md">
                                                    Following {profileData.following}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-12-sm col-5-md user__experience">
                                            <div className="d-flex flex-column">
                                                <div className="">
                                                    <h3 className='user__type text-center light-text'>{profileData.user_type.toUpperCase()}</h3>
                                                </div>
                                                <div className="d-flex justify-content-right">
                                                    <p className='py-1'>
                                                        Zoluptatem perspiciatis voluptas, recusandae possimus velit dolores. Officia alias voluptatem ut dolore hic sint asperiores soluta facere. Excepturi, asperiores? Adipisci, natus.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    
                                    <div className="edit__profile__btn pos-absolute top-5 cursor-pointer d-flex align-items-center" style={{right: '1.50%'}}>
                                        <span className="icon-wrapper d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                                        </span>
                                        <small style={{paddingLeft: '.2rem'}}>EDIT</small>
                                    </div>
                                </div>
                                <div className="box-shadow card p-3 mt-2 mb-2 br-md">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero incidunt, ullam vitae aspernatur quae, numquam illo magni neque nisi voluptatum nulla eos hic officia vel veritatis quos adipisci alias quasi amet veniam, saepe necessitatibus ratione. Quae sint libero maiores dolorem provident eveniet consectetur quos voluptatibus optio earum non dignissimos repudiandae maxime nesciunt voluptate minus impedit ab deleniti iure pariatur error natus, corrupti eos! Sequi, inventore molestias aperiam repellat voluptatem doloribus, nulla at et rem quaerat rerum, quos impedit omnis! Nihil maxime, quidem explicabo asperiores maiores molestias consequuntur non incidunt optio harum nesciunt soluta saepe rem ex impedit eligendi officiis! Dolore magni ad voluptatem similique pariatur voluptatibus placeat aut qui error provident illo iste optio laboriosam libero, fugit, non animi velit unde tempora debitis officia sed deleniti suscipit? Atque quam ad consequatur quia nesciunt error, corporis debitis! Voluptates, quos tempora atque nostrum aperiam repellendus enim laudantium omnis tempore totam vel accusamus perferendis commodi error alias consectetur cupiditate! Totam dicta libero labore nulla maiores repellendus recusandae laborum velit architecto magni ullam quas nisi quidem, explicabo beatae quisquam non sunt? Porro eligendi iure quisquam, velit laborum quis placeat facilis in accusantium, non sint fugiat delectus molestias voluptate, officia iste. Quaerat voluptatem voluptates ad blanditiis soluta asperiores itaque iusto libero? Sed, dignissimos quas. Numquam corporis molestias esse rem aperiam in, nam deserunt quidem eius optio ullam nemo cum eos impedit dolor neque dolores sequi ea voluptatum atque adipisci. Animi, possimus. Dolores placeat beatae omnis, molestias, doloremque velit totam voluptates suscipit similique sapiente, harum at dolorem labore? Harum illum, enim sequi neque reiciendis non omnis fuga cum excepturi vitae consequatur at dolor veniam! Vitae dolorem iste fugiat architecto quas, illo obcaecati id dignissimos sit possimus quasi harum ullam saepe iure asperiores optio animi nostrum nulla? Laboriosam saepe assumenda fuga dignissimos exercitationem maxime, placeat voluptate itaque!
                                </div>
                            </div>

                            <div className="activities col-4-md col-3-lg" id='columnTwo'>
                                <div className="card p-3 br-md">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi rerum magni reprehenderit exercitationem animi tempora a fugit et amet necessitatibus nihil, dolores ullam culpa numquam iure pariatur aspernatur ab eum!
                                </div>
                                <div className="card p-3 mt-2 br-md">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, quidem!
                                </div>
                                <div className="card p-3 mt-2 br-md">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In illo hic excepturi vitae placeat, facere repellendus eos consequatur deserunt. Esse consequatur ea veritatis eveniet. Eos deleniti non reprehenderit animi qui temporibus fugiat ratione mollitia, eaque provident odit nobis numquam tempora earum obcaecati excepturi dignissimos, commodi aliquid vitae, repellendus dicta culpa! Sit error tempore corrupti nulla exercitationem dolore consequuntur ut alias molestiae quidem voluptates dolor distinctio vel eius similique, saepe minima ex reiciendis aspernatur necessitatibus veritatis incidunt mollitia. Aliquam non ab provident, quam dolorem praesentium laboriosam quaerat nam incidunt error inventore veniam officia quod velit cupiditate eveniet saepe ipsam cum sequi!
                                </div>
                            </div>
                    </>}
                    {pendingData && <h1>Loading...</h1>}
                </div>
            </div>
    )
}

export default UserProfile
