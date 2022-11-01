import "./modal.css"

export default function Modal({ children }) {
    return (
        <div className="modal__wrapper">
            <div className="modal__content">
                <div className="__modal card p-0 border">{children}</div>
            </div>
        </div>
    )
}
