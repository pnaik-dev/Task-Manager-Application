import React, { createContext, useState, useEffect } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// Create the ThemeProvider
export const ThemeProvider = ({ children }) => {
    // State to store the current theme
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Update the document body class based on the theme
    useEffect(() => {
        localStorage.setItem('theme', theme); // Store the theme in local storage
        document.documentElement.classList.toggle('dark', theme === 'dark'); // Toggle dark class
    }, [theme]);

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light'); // Toggle between light and dark
    };

    // Render the ThemeContext.Provider
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
