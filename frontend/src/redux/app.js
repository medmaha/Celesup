import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"
import { UseCookie } from "../hooks/useCookie"

const cookies = UseCookie()

export const appSlice = createSlice({
    name: "app",
    initialState: {
        tokens: {
            access: localStorage.getItem("ata"),
            refresh: localStorage.getItem("atr"),
        },
        user: localStorage.getItem("ata")
            ? jwtDecode(localStorage.getItem("ata")).data
            : {},

        moods: {
            createPost: false,
            loadingRequest: null,
            errorMessage: null,
            successMessage: null,
            verification: cookies.get("acid") !== null,
            playingAudio: false,
        },

        dummy: cookies.get("dusr") ? JSON.parse(cookies.get("dusr")) : null,
    },
    reducers: {
        updateAuthTokens: (state, action) => {
            if (action.payload.dispatch) {
                state.tokens = {}
                state.user = {}
            } else {
                if (action.payload.access) {
                    state.tokens = action.payload
                    localStorage.setItem("ata", action.payload.access)
                    localStorage.setItem("atr", action.payload.refresh)
                    // ? update the user as well
                    state.user = jwtDecode(action.payload.access).data
                }
            }
        },

        updateModes(state, action) {
            if (action.payload.dispatch) {
                return (state.moods = {})
            }
            state.moods = {
                ...state.moods,
                ...action.payload,
            }
        },
    },
})

export const { updateAuthTokens, updateModes } = appSlice.actions
export default appSlice.reducer
