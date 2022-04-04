import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ProductReducer from './store/reducers/products';
import CartReducer from './store/reducers/cart';
import OrderReducer from './store/reducers/order';
import ProductsNavigator from './navigation/ShopNavigator';

const App = () => {
    const rootReducer = combineReducers({
        products: ProductReducer,
        cart: CartReducer,
        orders: OrderReducer,
    });

    const store = createStore(rootReducer);

    return (
        <Provider store={store}>
            <ProductsNavigator />
        </Provider>
    );
};

export default App;
