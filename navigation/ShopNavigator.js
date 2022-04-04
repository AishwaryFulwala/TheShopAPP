import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/Fontisto';

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import CartScreen from "../screens/shop/CartScreen";

import Colors from "../constants/Colors";

const option = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'EBGaramond-MediumItalic',
        fontSize: 25
    },
    headerTintColor: '#ffffff',
    headerBackTitle: ' ',
};

const productsStack = createStackNavigator();
const ProductsNavigator = () => {
    return (
        <productsStack.Navigator>
            <productsStack.Screen
                name="ProductsOverview"
                component={ProductsOverviewScreen}
                options={option}
            />
            <productsStack.Screen 
                name="ProductsDetail" 
                component={ProductDetailScreen}
                options={option} 
            />
            <productsStack.Screen 
                name="Cart"
                component={CartScreen}
                options={option}
            />
        </productsStack.Navigator>
    );
};

const OrdersStack = createStackNavigator();
const OrdersNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen
                name="Order"
                component={OrdersScreen}
                options={option}
            />
        </OrdersStack.Navigator>
    );
};

const AdminStack = createStackNavigator();
const AdminNavigator = () => {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="UserProduct"
                component={UserProductsScreen}
                options={option}
            />
            <AdminStack.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={option}
            />
            <AdminStack.Screen
                name="ProductsDetail"
                component={ProductDetailScreen}
                options={option}
            />
        </AdminStack.Navigator>
    );
};

const Shopdrawer = createDrawerNavigator();
const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <Shopdrawer.Navigator
                screenOptions={{
                    drawerActiveTintColor: '#440e59',
                    drawerInactiveTintColor: '#696969',
                    drawerLabelStyle: {
                        fontFamily: 'EBGaramond-SemiBold',
                        fontSize: 18,
                        marginVertical: 10,
                    },
                    drawerStyle: {
                        backgroundColor: '#f5dfe7',
                    },
                    headerShown: false,
                }}
            >
                <Shopdrawer.Screen
                    name="Product"
                    component={ProductsNavigator}
                    options={{
                        drawerIcon: ({color}) => {
                            return (
                                <IconM name="basket-check" size={25} color={color} />
                            );
                        }
                    }}
                />
                <Shopdrawer.Screen
                    name="Orders"
                    component={OrdersNavigator}
                    options={{
                        drawerIcon: ({ color }) => {
                            return (
                                <IconF name="shopping-bag-1" size={25} color={color} />
                            );
                        },
                    }}
                />
                <Shopdrawer.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        drawerIcon: ({ color }) => {
                            return (
                                <IconF name="user-secret" size={25} color={color} />
                            );
                        },
                    }}
                />
            </Shopdrawer.Navigator>
        </NavigationContainer>
    );
};

export default ShopNavigator;