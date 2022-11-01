import "./progressBar.css"

const ProgressBar = ({ className }) => {
    return (
        <div className={`loader-wrapper ${className}`}>
            <span className="loader"></span>
        </div>
    )
}

export default ProgressBar
