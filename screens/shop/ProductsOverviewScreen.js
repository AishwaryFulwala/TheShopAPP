import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/AntDesign';

import ProductItem from '../../components/shop/ProductItem';
import *  as cartAction from '../../store/actions/cart';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = (props) => {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            title: 'All Products',
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Cart'
                            iconName='shopping-cart'
                            IconComponent={IconM}
                            onPress={() => {
                                props.navigation.navigate('Cart')
                            }}
                        />
                    </HeaderButtons>
                );                
            },
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Menu'
                            iconName='menu-fold'
                            IconComponent={IconA}
                            onPress={() => {
                                props.navigation.toggleDrawer();
                            }}
                        />
                    </HeaderButtons>
                );
            },
        });
    }, []); 

    const item = (data) => {
        return (
            <ProductItem
                image={data.item.imageUrl}
                title={data.item.title}
                price={data.item.price}
                onView={() => {
                    props.navigation.navigate('ProductsDetail',{
                        prodID: data.item.id,
                    });
                }}
                cart
                onCart={() => {
                    dispatch(cartAction.addToCart(data.item))
                }}
            />
        );
    };

    return (
        
        <FlatList
            data={products}
            renderItem={item}
        />
    );
};

export default ProductsOverviewScreen;