import React, { useEffect, useReducer } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import IconF from 'react-native-vector-icons/FontAwesome5';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as ProductActions from '../../store/actions/products';
import Input from '../../components/UI/input';

const formReducer = (state, action) => {
    if (action.type === 'UPDATE') {
        const updateValues = {
            ...state.inputValues,
            [action.input]: action.value
        };

        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };

        let updateFormIsValid = true;
        for (const i in updateValidities) {
            updateFormIsValid = updateFormIsValid && updateValidities[i];
        }

        return {
            inputValues: updateValues,
            inputValidities: updateValidities,
            formIsValid: updateFormIsValid
        };
    }

    return state;
};

const EditProductScreen = (props) => {
    const id = props.route.params?.prodID;
    const editProducts = useSelector((state) => state.products.userProducts.find((prod) => prod.id === id));

    const [formState, dispatchFormState ] = useReducer(formReducer, {
        inputValues: {
            title: editProducts ? editProducts.title : '',
            imageUrl: editProducts ? editProducts.imageUrl : '',
            price: '', 
            description: editProducts ? editProducts.description : '',
        },
        inputValidities: {
            title: editProducts ? true : false,
            imageUrl: editProducts ? true : false,
            price: editProducts ? true : false,
            description: editProducts ? true : false,
        },
        formIsValid: editProducts ? true : false,
    })

    const dispatch = useDispatch();

    const inputHandler = (input, value, isValid) => {
        dispatchFormState({
            type: 'UPDATE',
            value: value,
            isValid,
            input,
        });
    };

    useEffect(() => {
        props.navigation.setOptions({
            title: id ? 'Edit Product' : 'Add Product',
        });
    }, []); 

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Cart'
                            iconName='clipboard-check'
                            IconComponent={IconF}
                            onPress={() => {
                                if (!formState.formIsValid) {
                                    Alert.alert('Wrong Input!', 'Please check errors.', [{text: 'Ok'}])
                                    return;
                                }

                                if (editProducts) {
                                    dispatch(
                                        ProductActions.updateProduct(
                                            id,
                                            formState.inputValues.title,
                                            formState.inputValues.description,
                                            formState.inputValues.imageUrl
                                        )
                                    );
                                } else {
                                    dispatch(
                                        ProductActions.addProduct(
                                            formState.inputValues.title,
                                            formState.inputValues.description,
                                            +formState.inputValues.price,
                                            formState.inputValues.imageUrl
                                        )
                                    );
                                }

                                props.navigation.goBack();
                            }}
                        />
                    </HeaderButtons>
                );
            },
        });
    }, [dispatch, id, formState ]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    autoCapitalize='words'
                    autoCorrect={false}
                    label='Title'
                    error='Please Enter Valid Title.'
                    onInputChange={inputHandler}
                    initValue={editProducts ? editProducts.title : '' }
                    initValid={!!editProducts}
                    required
                />
                <Input
                    id='imageUrl'
                    autoCorrect={false}
                    keyboardType='url'
                    label='Image URL'
                    error='Please enter valid Image URL.'
                    onInputChange={inputHandler}
                    initValue={editProducts ? editProducts.imageUrl : ''}
                    initValid={!!editProducts}
                    required
                />
                {
                    !editProducts &&
                    <Input
                        id='price'
                        keyboardType='decimal-pad'
                        label='Price'
                        error='Please enter valid Price.'
                        onInputChange={inputHandler}
                        initValue={editProducts ? editProducts.price : ''}
                        initValid={!!editProducts}
                        required
                        min={0}
                    />
                }
                <Input
                    id='description'
                    autoCapitalize='sentences'
                    autoCorrect={false}
                    numberOfLines={3}
                    multiline
                    label='Description'
                    error='Please Enter Valid Description.'
                    onInputChange={inputHandler}
                    initValue={editProducts ? editProducts.description : ''}
                    initValid={!!editProducts}
                    required
                    minLength={5}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
});

export default EditProductScreen;