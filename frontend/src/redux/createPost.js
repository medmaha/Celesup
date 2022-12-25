import { createSlice } from "@reduxjs/toolkit"

export const postStore = createSlice({
    name: "createPost",
    initialState: {
        pages: {
            prev: { form: null, value: null },
            current: { form: null, value: null },
            next: { form: null, value: null },
        },
        form: {},
    },
    reducers: {
        updateForm: (state, action) => {
            if (action.payload.dispatch) {
                state.form = {}
            } else {
                state.form = {
                    ...state.form,
                    ...action.payload,
                }
            }
        },
        updatePages: (state, action) => {
            if (action.payload.dispatch) {
                state.pages = { prev: {}, current: {}, next: {} }
            } else {
                state.pages = {
                    ...state.pages,
                    ...action.payload,
                }
            }
        },
    },
})

export const { updateForm, updatePages } = postStore.actions
export default postStore.reducer

export function checkValid(field, lookup = "L") {
    switch (lookup) {
        case "L":
            if (field?.length > 4) return true
            return false
        case "F":
            if (!!field?.type) return true
            return false
        case "T":
            if (!!field) return true
            return false
        default:
            return false
    }
}
