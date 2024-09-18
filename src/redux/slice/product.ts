import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log(state)

            return action.payload
        },
        clear: () => initialState,
    },
})

export const { setProducts } = productSlice.actions
export const { reducer: productReducer } = productSlice
