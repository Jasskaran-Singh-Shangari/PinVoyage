import React, { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeContextProvider=({children})=>{
    const [theme, setTheme]=useState(localStorage.getItem("theme") || "mapbox://styles/rebel-osuda/cm9vdpp4y002h01r13j8i9l95")

    useEffect(()=>{
        localStorage.setItem("theme", theme)
    }, [theme])
    
    localStorage.setItem("theme", theme )
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>

    )
}

export default ThemeContextProvider;