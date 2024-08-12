import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mapUpdateTrigger, setMapUpdateTrigger] = useState(Math.random());

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    setMapUpdateTrigger((a) => a * Math.random());
  };

  return (
    <AppContext.Provider
      value={{
        isCollapsed,
        mapUpdateTrigger,
        handleCollapse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
