import { CART_ADD_ITEM } from '../constatants/CartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      //check product allready exists
      const existItem = state.cartItems.find((x) => x.product === item.product)
      // replace new item in to a exists item...becase its new one
      if (existItem) {
        return {
          ...state, // means no gon a be change other propertie in cart
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    default:
      return state
  }
}
