import React from 'react';

const ThemeContext = React.createContext();

export function ThemeContextProvider({ children }) {
    const [mode, setMode] = React.useState('light');

    const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

    const value = React.useMemo(() => ({ mode, toggleMode }), [mode]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
    return React.useContext(ThemeContext);
}
