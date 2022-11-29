export const celesupThemes = {
    system: {
        collections: [
            {
                id: "system-1",
                bg: "white",
                text: "#333",
                class: "light-mode",
                label: "Light Mode",
                bubbles: [
                    {
                        id: "system-bubble-a1",
                        bg: "white",
                        pr: "white",
                        sec: "white",
                        crd: "white",
                        onClick: () => {
                            document.body.classList.replace(
                                "light-mode",
                                "dark-mode",
                            )
                        },
                    },
                    {
                        id: "system-bubble-a2",
                        bg: "#999",
                        pr: "#0c9191",
                        sec: "#0d5db9",
                        crd: "#fff",
                        bc: "1px solid #5399e9bd",
                    },
                    {
                        id: "system-bubble-a3",
                        bg: "#fff",
                        pr: "lightblue",
                        sec: "#dddddd",
                        crd: "#999",
                    },
                    {
                        id: "system-bubble-a4",
                        bg: "#9aa7be",
                        pr: "#fff",
                        sec: "#9af7be",
                        crd: "#0c9191",
                    },
                ],
            },
            {
                id: "system-2",
                bg: "black",
                text: "#ddd",
                class: "dark-mode",
                label: "Dark Mode",
                bubbles: [
                    {
                        id: "system-bubble-b1",
                        bg: "white",
                        pr: "white",
                        sec: "white",
                        crd: "white",
                        onClick: () => {
                            document.body.classList.replace(
                                "dark-mode",
                                "light-mode",
                            )
                        },
                    },
                    {
                        id: "system-bubble-b2",
                        bg: "#4e5053",
                        pr: "#0c9191",
                        sec: "#0d5db9",
                        crd: "#16181c",
                        bc: "1px solid #5399e9bd",
                    },
                    {
                        id: "system-bubble-b3",
                    },
                    {
                        id: "system-bubble-b4",
                    },
                ],
            },
        ],
    },
    custom: {
        collections: [
            {
                id: "custom-1",
                bg: "white",
                text: "#333",
                class: "light-mode",
                label: "Light Mode",
            },
            {
                id: "system-2",
                bg: "blue",
                text: "#333",
                class: "light-mode",
                label: "High Contrast",
            },
            {
                id: "system-3",
                bg: "orange",
                text: "#333",
                class: "light-mode",
                label: "Low Contrast",
            },
            {
                id: "system-4",
                bg: "black",
                text: "#333",
                class: "light-mode",
                label: "Dark Mode",
            },
        ],
    },
}
