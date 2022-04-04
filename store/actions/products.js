export const DELETE_PRODUCT= 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (pid) => {
    return {
        type: DELETE_PRODUCT,
        pid: pid,
    };
};

export const addProduct = (title, description, price, imageUrl) => {
    return {
        type: ADD_PRODUCT,
        data: {
            title,
            description,
            price,
            imageUrl,
        }
    };
};

export const updateProduct = (pid, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pid,
        data: {
            title,
            description,
            imageUrl,
        }
    };
};