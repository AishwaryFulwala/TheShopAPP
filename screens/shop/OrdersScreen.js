import React, { useEffect } from "react";
import { FlatList } from 'react-native';

import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import IconA from 'react-native-vector-icons/AntDesign';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = (props) => {
    const orders = useSelector((state) => state.orders.orders)

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Your Orders',
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

    const renderItem = (data) => {
        return (
            <OrderItem 
                amount={data.item.totAmt}
                date={data.item.date}
                item={data.item.items}
            />
        );
    }

    return (
        <FlatList 
            data={orders}
            renderItem={renderItem}
        />
    );
};

export default OrdersScreen;