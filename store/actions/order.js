export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItem, totAmt) => {
    return {
        type: ADD_ORDER,
        data: {
            items: cartItem,
            amount: totAmt
        }
    };
};