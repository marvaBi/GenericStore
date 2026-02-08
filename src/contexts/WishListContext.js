import React from 'react';

const WishListContext = React.createContext();

const ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR'
};

function wishListReducer(state, action) {
    const { id } = action.payload;
    switch (action.type) {
        case ACTIONS.ADD: {
            if (state.includes(id)) {
                return state;
            } else {
                return [...state, id];
            }
        }
        case ACTIONS.REMOVE:
            return state.filter(itemId => itemId != id);
        case ACTIONS.CLEAR:
            return [];
        default:
            return state;
    }
}

export function WishListContextProvider({ children }) {
    const [wishList, dispatch] = React.useReducer(wishListReducer, []);

    const addToWishList = (id) => dispatch({ type: ACTIONS.ADD, payload: { id } });
    const removeFromWishList = (id) => dispatch({ type: ACTIONS.REMOVE, payload: { id } });
    const clearWishList = () => dispatch({ type: ACTIONS.CLEAR });

    const value = React.useMemo(() => ({
        wishList,
        addToWishList,
        removeFromWishList,
        clearWishList
    }), [wishList]);

    return (
        <WishListContext.Provider value={value}>{children}</WishListContext.Provider>
    );
}

export function useWishList() {
    const context = React.useContext(WishListContext);
    if (!context) {
        throw new Error('useWishList must be used within WishListContextProvider');
    }
    return context;
}