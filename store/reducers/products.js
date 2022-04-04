import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT } from '../actions/products'
import Product from "../../models/product";

const initState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((prod) => prod.ownerID === 'u1'),
};

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((prod) => prod.id !== action.pid),
                availableProducts: state.availableProducts.filter((prod) => prod.id !== action.pid),
            };

        case ADD_PRODUCT:
            const newProduct = new Product(
                action.data.id,
                'u1',
                action.data.title,
                action.data.imageUrl,
                action.data.description,
                action.data.price,
            );

            return {
                ...state,
                userProducts: state.userProducts.concat(newProduct),
                availableProducts: state.availableProducts.concat(newProduct),
            };

        case UPDATE_PRODUCT :
            const uindex = state.userProducts.findIndex((prod) => prod.id === action.pid)

            const updateProduct = new Product(
                action.pid,
                state.userProducts[uindex].ownerID,
                action.data.title,
                action.data.imageUrl,
                action.data.description,
                state.userProducts[uindex].price,
            );

            const uproduct = [...state.userProducts];
            uproduct[uindex] = updateProduct;

            const aindex = state.userProducts.findIndex((prod) => prod.id === action.pid)
            const aproduct = [...state.availableProducts];
            aproduct[aindex] = updateProduct;

            return {
                ...state,
                userProducts: uproduct,
                availableProducts: aproduct,
            };

        default:
            return state;
    }
    
};

export default ProductReducer;