// import React, { createContext, useState, useContext } from "react";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [windSpeed, setWindSpeed] = useState();
//   return (
//     <AppContext.Provider value={{ windSpeed }}>{children}</AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within the AppProvider");
//   }
//   return context;
// };

import React, { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within the AppProvider");
  }
  return context;
};
