import { ADD_ORDER } from "../actions/order";
import Order from "../../models/order";

const initState = {
    orders: [],
};

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.data.items,
                action.data.amount,
                new Date(),
            );   

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
    
        default:
            return state;
    }
};

export default OrderReducer;