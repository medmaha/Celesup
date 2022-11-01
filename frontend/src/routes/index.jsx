// import './index.css'
import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../App"
import Dashboard from "./feed/dashboard"

const Index = () => {
    const { user, tokens } = useContext(GlobalContext)

    if (!user && !tokens) {
        return (
            <>
                <main className="landing__page container_ row justify-content-center align-items-center">
                    <div className="py-2 mt-1 col-12-sm d-flex justify-content-center gap-2-em width-750-px flex-wrap-wrap align-items-center">
                        <section className="width-350-px">
                            <header className="">
                                <h2 className="">
                                    Never Miss Out From Your Favorites Stars
                                </h2>
                                <div className="pt-__">
                                    <p className="typography">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Culpa sapiente nihil
                                        porro assumenda, natus sunt quae magnam
                                        quos aspernatur optio ulpa sapiente
                                        nihil porro assumenda, natus sunt quae
                                        magnam quos aspernatur optio!
                                    </p>
                                </div>
                            </header>
                        </section>
                        <section className="width-350-px">
                            <header className="">
                                <h2 className="">
                                    Never Miss Out From Your Favorites Stars
                                </h2>
                                <div className="pt-__">
                                    <p className="typography">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Culpa sapiente nihil
                                        porro assumenda, natus sunt quae magnam
                                        quos aspernatur optio!
                                    </p>
                                </div>
                            </header>
                        </section>
                        <section className="my-__ row gap-5-px justify-content-evenly">
                            <div className="col-12-sm d-flex justify-content-center">
                                <img
                                    className="responsive width-600-px br-md"
                                    src={require("../assets/img/cs-social-images-index-background.jpeg")}
                                    alt=""
                                />
                            </div>
                            {/* <div className='col-12-sm col-6-md d-flex justify-content-center'>
                            <img className='responsive width-600-px' src={require('../assets/img/cs-social-image-interact-with-friends.png')} alt='' />
                        </div> */}
                        </section>
                    </div>
                </main>

                <footer className="theme-primary height-2-rem p-2">
                    <div className="footer-header theme">Celesup</div>
                </footer>
            </>
        )
    }

    return <Dashboard />
}

export default Index
