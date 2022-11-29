import React from "react"

export default function ThemeExample({ theme }) {
    return (
        <div className={`m-__ px-__ ${theme.class}`}>
            <div
                className={`minheight-150-px overflow-hidden br-sm width-100 border ${theme.bg}`}
            >
                <div className="d-flex gap-1-rem p-__ card br-none">
                    <div className="width-30-px height-5-px card-secondary p-0 br-md"></div>
                    <div className="width-30-px height-5-px card-secondary p-0 br-md"></div>
                    <div className="width-30-px height-5-px card-secondary p-0 br-md"></div>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-1-rem p-__ mt-__ mx-1">
                    <div className="width-4-rem height-8-px card-secondary p-0 br-md"></div>
                    <div className="d-flex align-items-center gap-2-px">
                        <div className="width-10-px height-10-px p-0 br-none success-bg"></div>
                        <div className="width-10-px height-10-px p-0 br-none invalid-bg"></div>
                    </div>
                </div>
                <div className="d-flex justify-content-between gap-5-px p-__ mt-__ mx-1">
                    <div className="width-9-rem height-4-rem card p-0 br-sm">
                        <div
                            className=" d-flex width-9-rem"
                            style={{
                                padding: "5px",
                                backgroundColor: "rgba(0,255,0, .3)",
                            }}
                        >
                            <div className="success-bg br-sm height-7-px width-3-rem"></div>
                        </div>

                        <div className="d-flex gap-1-rem justify-content-evenly br-sm mt-1">
                            <div className="width-3-rem height-10-px bg-primary br-md"></div>
                            <div className="width-3-rem height-10-px bg-secondary br-md"></div>
                        </div>
                    </div>
                    <div className="width-2-rem height-2-rem card p-0 br-none"></div>
                </div>
                <span
                    className="divider"
                    style={{ margin: "0", padding: "0" }}
                ></span>
                <div
                    className="d-flex align-items-center gap-1-rem font-sm"
                    style={{
                        padding: "10px",
                        color: theme.text,
                    }}
                >
                    <div className="cursor-pointer">
                        <input type="radio" />
                    </div>
                    <div className="">
                        <strong>{theme.label.split(" ")[0]} default</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}
