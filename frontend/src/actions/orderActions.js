import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
} from "../constatants/orderConstants";
import Axios from "axios";
import { CARD_EMPTY } from "../constatants/CartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        // get state returns the all redux store
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.post("/api/orders", order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CARD_EMPTY });
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
};

export const payOrder =
    (order, paymentResult) => async (dispatch, getState) => {
        dispatch({
            type: ORDER_PAY_REQUEST,
            payload: { order, paymentResult },
        });
        const {
            userSignin: { userInfo },
        } = getState();
        try {
            const { data } = Axios.put(
                `/api/orders/${order._id}/pay`,
                paymentResult,
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({ type: ORDER_PAY_FAIL, payload: message });
        }
    };
