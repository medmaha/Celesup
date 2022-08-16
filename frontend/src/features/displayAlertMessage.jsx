import { useRef } from 'react';
import'./alertStyle.css';

export default function DisplayAlertMessage ({asError, asSuccess, message, timer=3}) {

    const alertWrapper = useRef()


    if (asError) return (
        <div ref={alertWrapper} className={`alert-msg my-__`}>
            <p className="p-__ text-center red-lighten-4 light-text br-md mx-1">
                {message}
            </p>
        </div>
    )

    if (asSuccess) return (
        <div ref={alertWrapper} className={`alert-msg my-__`}>
            <p className="p-__ text-center lime-darken-4 light-text br-md mx-1">
                {message}
            </p>
        </div>
    )
}
