import { createSlice } from '@reduxjs/toolkit'

const initialState={
    cart:[],
    totalItems:0,
    totalPrice:0,
}

export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            const item=action.payload;
            const existingItem=state.cart.find((i)=> i._id===item._id)
            if(existingItem){
                existingItem.quantity+=1
            }else{
                state.cart.push({...item, quantity:1})
            }
        },

        // remove from the cart
        removeToCart:(state, action)=>{
            const _id=action.payload;
            state.cart=state.cart.filter((item)=>item._id!==_id)
        },    

        // decrease quantity 
        decreaseQuantity:(state , action) =>{
            const _id=action.payload;
            const existingItem = state.cart.find((i)=>i._id===_id);
            if(existingItem){
                if(existingItem.quantity>1){
                    existingItem.quantity-=1
                }
            }
        }
    }
})

// export individual reducers to call them in the component
export const {addToCart, removeToCart, decreaseQuantity} = cartSlice.actions;
// export the whole reducer to store in the store
export default cartSlice.reducer;