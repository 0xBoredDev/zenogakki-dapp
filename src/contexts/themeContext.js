// import React, { useContext, createContext, useState, useCallback } from "react";

// const ThemeContext = createContext();

// const ThemeProvider = ({ children }) => {
//   const changeTheme = useCallback((themeTo) => {
//     console.log("changetheme");
//     console.log(themeTo);
//     setTheme(themeTo);
//     const element = document.getElementById("mode");
//     element.className = themeTo;
//   }, []);
//   const [theme, setTheme] = useState("light");

//   return (
//     <ThemeContext.Provider value={{ theme, changeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const useContext = () => useContext(ThemeContext);

// export { ThemeProvider };
