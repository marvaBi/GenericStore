import React from 'react';

const WishListContext = React.createContext();

export function WishListContextProvider({ children }) {
    const [wishList, setWishList] = React.useState([]);

    const value = React.useMemo(() => ({ wishList, setWishList }), [wishList]);

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