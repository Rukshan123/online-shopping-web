import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../constatants/orderConstants'
import Axios from 'axios'
import { CARD_EMPTY } from '../constatants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
  try {
    // get state returns the all redux store
    const {
      userSignin: { userInfo },
    } = getState()
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
    dispatch({ type: CARD_EMPTY })
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
