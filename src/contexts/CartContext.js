import React from 'react';

const CartContext = React.createContext();

const ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    SET_QTY: 'SET_QTY',
    CLEAR: 'CLEAR'
};

function cartReducer(state, action) {
    const { id, count } = action.payload;
    switch (action.type) {
        case ACTIONS.ADD: {
            const index = state.findIndex(([itemId]) => itemId === id);
            if (index > -1) {
                return state.map(([itemId, prevCount]) =>
                    itemId === id ? [itemId, prevCount + count] : [itemId, prevCount]
                );
            } else {
                return [...state, [id, count]];
            }
        }

        case ACTIONS.REMOVE:
            return state.filter(([itemId]) => itemId !== id);

        case ACTIONS.SET_QTY:
            return state.map(([itemId, prevCount]) =>
                itemId === id ? [itemId, count] : [itemId, prevCount]
            )

        case ACTIONS.CLEAR:
            return [];

        default:
            return state;
    }
}

export function CartContextProvider({ children }) {
    const [cart, dispatch] = React.useReducer(cartReducer, [], () => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (id, count) => dispatch({ type: ACTIONS.ADD, payload: { id, count } });
    const removeFromCart = (id) => dispatch({ type: ACTIONS.REMOVE, payload: { id } });
    const setCartItemQty = (id, count) => dispatch({ type: ACTIONS.SET_QTY, payload: { id, count } });
    const clearCart = () => dispatch({ type: ACTIONS.CLEAR });

    const value = React.useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        setCartItemQty,
        clearCart
    }), [cart]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartContextProvider');
    }
    return context;
}