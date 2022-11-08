import { useState, useEffect, useRef } from "react"
import { celesupApi, CELESUP_BASE_URL } from "../../../axiosInstances"
import useAxiosRequest from "../../../hooks/useAxiosRequest"
import PendingSpinner from "../../../features/Spinner"
import { useNavigate } from "react-router-dom"

function SearchBar() {
    const [isFocus, setIsFocus] = useState(false)
    const [response, pending, error, sendAxiosRequest] = useAxiosRequest()
    const [searchResponse, setSearchResponse] = useState([])

    const inputField = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        if (!response) return
        setSearchResponse(response)
    }, [response])

    useEffect(() => {
        inputField.current.addEventListener("focus", () => setIsFocus(true))
        inputField.current.addEventListener("focusout", () => setIsFocus(false))
        inputField.current.addEventListener("input", handleQueryChanged)
        // eslint-disable-next-line
    }, [])

    function visitResultProfile(username = "") {
        console.log("clicked")
        navigate("/" + username.toLowerCase())
    }

    function handleQueryChanged({ target }) {
        const query = target.value.toLowerCase().trim()

        if (query !== "") {
            const form = new FormData()

            form.append("query", query)
            sendAxiosRequest({
                axiosInstance: celesupApi,
                method: "POST",
                form: form,
                url: "/search_query",
            })
        } else {
            setSearchResponse([])
        }
    }

    function toggleSearchBar() {
        const isMobile = window.outerWidth < 481

        if (isMobile) {
            inputField.current
                .closest("nav")
                .querySelector(".nav-brand")
                .classList.toggle("hide")
            inputField.current
                .closest("nav")
                .querySelector(".nav-profile")
                .classList.toggle("hide")
            inputField.current.classList.toggle("active")

            if (inputField.current.classList.contains("active")) {
                inputField.current.focus()
            }
        }
    }

    return (
        <div className="nav-search search-wrapper">
            <input
                ref={inputField}
                id="navSearchQuery"
                type="text"
                name="query"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="search"
                aria-label="Search Celesup"
                className="br-md search-bar"
                placeholder="Search Celesup"
                onBlur={toggleSearchBar}
            />
            <span className="search-bar-toggler" onClick={toggleSearchBar}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                </svg>
            </span>

            <div className={isFocus ? `search-modal active` : "search-modal"}>
                <div className="search-results pos-relative">
                    {!pending && searchResponse?.length < 1 && (
                        <span data-hint-text>
                            Try searching for people, topics, or keywords
                        </span>
                    )}
                    {searchResponse?.map((result, idx) => {
                        return (
                            <div
                                key={idx}
                                onClick={() => visitResultProfile(result.text)}
                            >
                                <span className="">
                                    <div className="d-flex align-items-center gap-7-px cursor-pointer width-fit-content">
                                        {result.object === "hashtag" && (
                                            <>
                                                <img
                                                    src={require("../assets/hashtags.png")}
                                                    alt="hashtag"
                                                    className="profile-img width-30-px height-30-px br-full border"
                                                />
                                                <span>{result.text}</span>
                                            </>
                                        )}
                                        {result.object === "user" && (
                                            <>
                                                <img
                                                    src={
                                                        CELESUP_BASE_URL +
                                                        result.avatar
                                                    }
                                                    alt="hashtag"
                                                    className="profile-img width-30-px height-30-px br-full border"
                                                />
                                                <span>{result.text}</span>
                                            </>
                                        )}
                                    </div>
                                </span>

                                {searchResponse[idx + 1] && (
                                    <div className="divider"></div>
                                )}
                            </div>
                        )
                    })}
                    {pending && (
                        <div
                            className="pos-absolute width-100 height-100 d-flex justify-content-center align-items-center"
                            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
                        >
                            <span className="small spinner">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.1,16c-0.3-0.5-0.9-0.6-1.4-0.4c-0.5,0.3-0.6,0.9-0.4,1.4c0.3,0.5,0.9,0.6,1.4,0.4C5.2,17.1,5.3,16.5,5.1,16C5.1,16,5.1,16,5.1,16z M4.7,6.6C4.2,6.4,3.6,6.5,3.3,7C3.1,7.5,3.2,8.1,3.7,8.4C4.2,8.6,4.8,8.5,5.1,8C5.3,7.5,5.2,6.9,4.7,6.6z M20.3,8.4c0.5-0.3,0.6-0.9,0.4-1.4c-0.3-0.5-0.9-0.6-1.4-0.4c-0.5,0.3-0.6,0.9-0.4,1.4C19.2,8.5,19.8,8.6,20.3,8.4z M4,12c0-0.6-0.4-1-1-1s-1,0.4-1,1s0.4,1,1,1S4,12.6,4,12z M7.2,18.8c-0.5,0.1-0.9,0.7-0.7,1.2c0.1,0.5,0.7,0.9,1.2,0.7c0.5-0.1,0.9-0.7,0.7-1.2C8.3,19,7.8,18.7,7.2,18.8z M21,11c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S21.6,11,21,11z M20.3,15.6c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4c0.5,0.3,1.1,0.1,1.4-0.4c0,0,0,0,0,0C20.9,16.5,20.8,15.9,20.3,15.6z M17,3.3c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4c0.5,0.3,1.1,0.1,1.4-0.4c0,0,0,0,0,0C17.6,4.2,17.5,3.6,17,3.3z M16.8,18.8c-0.5-0.1-1.1,0.2-1.2,0.7c-0.1,0.5,0.2,1.1,0.7,1.2c0.5,0.1,1.1-0.2,1.2-0.7C17.6,19.5,17.3,19,16.8,18.8z M12,20c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S12.6,20,12,20z M12,2c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S12.6,2,12,2z" />
                                </svg>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <template data-result-template>
                <div className="result">
                    <div data-query-match>
                        <b>Deluxe</b>
                    </div>
                    <span className="text-muted"></span>
                </div>
            </template>
        </div>
    )
}

export default SearchBar
