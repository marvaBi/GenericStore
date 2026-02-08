import React from 'react';

const CartContext = React.createContext();

export function CartContextProvider({ children }) {
    const [cart, setCart] = React.useState([]);

    const value = React.useMemo(() => ({ cart, setCart }), [cart]);

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