import { createContext, useState, useEffect } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <ItemContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

//context to pass user logged-in status across App.
export const OwnerContext = createContext(null);

export const OwnerProvider = ({ children }) => {
  const [owner, setOwner] = usePersistedState("owner", null);
  const [markerNewItem, setMarkerNewItem] = useState({
    longitude: -73.577551,
    latitude: 45.463839,
  });

  return (
    <OwnerContext.Provider
      value={{ owner, setOwner, markerNewItem, setMarkerNewItem }}
    >
      {children}
    </OwnerContext.Provider>
  );
};

//custom hook for keeping track of the user that is logged in
const usePersistedState = (localStorageName, initialValue) => {
  const [state, setState] = useState(() => {
    const storedValue = window.localStorage.getItem(localStorageName);

    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageName, JSON.stringify(state));
  }, [localStorageName, state]);

  return [state, setState];
};
