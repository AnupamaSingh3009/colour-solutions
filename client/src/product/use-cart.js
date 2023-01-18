import {useCallback, useEffect, useMemo, useState} from "react";

export const useCart = () => {
    const [cartItems, setCartItems] = useState(JSON.parse(window.sessionStorage.getItem("cart"))|| []);

    const onUpdateCart  = useCallback((event) => {
        const cartItem = event.detail;
        const cartItemDraft = [...cartItems];
        console.log(cartItem);
        const cartItemIndex = cartItemDraft.findIndex( (item)  => item.product.id === cartItem.product.id);
        if(cartItemIndex !== -1) {
            if(cartItem.quantity !== undefined) {
                if(cartItem.quantity === 0) {
                    cartItemDraft.splice(cartItemIndex, 1);
                } else {
                    cartItemDraft[cartItemIndex].quantity = cartItem.quantity;
                }
            } else {
                cartItemDraft[cartItemIndex].quantity++;
            }
        } else {
            cartItemDraft.push({...cartItem, quantity: 1})
        }
        setCartItems(cartItemDraft);
        window.sessionStorage.setItem('cart', JSON.stringify(cartItemDraft));
    }, [cartItems]);

    const onClearCart = useCallback((event) => {
        setCartItems([]);
        window.sessionStorage.removeItem('cart');
    }, []);

    useEffect(() => {
        document.addEventListener('UPDATE_CART', onUpdateCart);
        return () => {
            document.removeEventListener('UPDATE_CART', onUpdateCart, false);
        }
    }, [onUpdateCart]);


    useEffect(() => {
        document.addEventListener('CLEAR_CART', onClearCart);
        return () => {
            document.removeEventListener('CLEAR_CART', onClearCart, false);
        }
    }, [onClearCart]);



    return {
        cartItems,
        count: cartItems.length,
        openCart: document.dispatchEvent(new Event('OPEN_CART')),
        updateCart: (options) => document.dispatchEvent(
            new CustomEvent('UPDATE_CART', {
                detail: options
            })
        ),
        clearCart: () => document.dispatchEvent(new Event('CLEAR_CART')),
    }
}
