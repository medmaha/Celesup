import "./styles.css"
import { useEffect } from "react"
import ProgressBar from "../../features/ProgressBar"
import useComplexAxiosRequests from "../../hooks/useComplexRefresh"
import { celesupApi, CELESUP_BASE_URL } from "../../axiosInstances"

export default function ComposeMessage({ setCompose, setActiveThread }) {
    const [peoples, pending, error, sendRequest] = useComplexAxiosRequests()

    useEffect(() => {
        if (!peoples) return
    }, [peoples])

    function searchPeople(ev) {
        const query = ev.target.value.trim().toLowerCase()

        if (!query) return

        sendRequest({
            url: `/profile/all?q=${query}`,
            method: "GET",
        })
    }

    function getThread(user) {
        celesupApi
            .get(`threads/retrieve?id=${user.id}`)
            .then((res) => {
                setCompose((prev) => !prev)
                setActiveThread(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="mt-__">
            <form action="width-100 d-flex justify-content-center">
                <div className=" d-flex justify-content-center pr-__">
                    <span className="icon-wrapper_ ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </span>
                    <input
                        onKeyUp={searchPeople}
                        type="search"
                        placeholder="search people"
                        className="br-none"
                    />
                </div>
            </form>
            <span className="pos-relative width-100">
                <span className="divider"></span>
                {!!pending && <ProgressBar />}

                {!!peoples && (
                    <div className=" pb-1">
                        <div className="d-flex gap-3-px flex-column">
                            {peoples?.map((people, idx) => {
                                return (
                                    <div
                                        className="cursor-pointer people d-flex align-items-center gap-2 p-__"
                                        key={people.id}
                                        onClick={() => getThread(people)}
                                    >
                                        <span className="profile-img">
                                            <img
                                                crossOrigin="anonymous"
                                                src={
                                                    CELESUP_BASE_URL +
                                                    people.avatar
                                                }
                                                alt="peple"
                                            />
                                        </span>
                                        <span className="d-flex flex-column gap-5px">
                                            <span>
                                                {people.full_name ||
                                                    people.username}
                                            </span>
                                            <span className="typography">
                                                {!!people.full_name && (
                                                    <>@{people.username}</>
                                                )}
                                            </span>
                                            <span className="truncate typography maxwidth-250-px">
                                                <small>
                                                    {people.biography}
                                                </small>
                                            </span>
                                        </span>
                                    </div>
                                )

                                {
                                    !idx === peoples.length - 1 && (
                                        <>
                                            <span className="divider"></span>
                                        </>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )}
            </span>
        </div>
    )
}
