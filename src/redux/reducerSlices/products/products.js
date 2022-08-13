import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        ID: '1', 
        Name: 'Oculus Quest 2',
        Price: 1329,
        Quantity: 50
    },
    {
        ID: '2', 
        Name: 'iPad Air',
        Price: 2629,
        Quantity: 10
    }
]

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdd(state, action){
            return state.concat(action.payload)
        },
        productUpdate(state, action){
            let a = [...state]
            a = a.map(b=>{
                if(Number(b.ID)===Number(action.payload.ID))
                    return action.payload
                else return b
            })
            return a
        },
        productQuantityUpdate(state, action){
            let products = [...state]
            products = products.map(product=>{
                if(action.payload === product.ID)
                    return {...product,
                        Quantity: product.Quantity - 1    
                    }
                else return product
            })
            return products
        },
        productDelete(state, action){
            const start = [...state.slice(0,action.payload-1)]
            const a =  [...state.slice(action.payload )]

            return start.concat(a)
        }
    }
})

export const { productAdd, productDelete, productUpdate, productQuantityUpdate } = products.actions

export default products.reducer