import { createContext, useContext, useState, useEffect } from "react";

const WardrobeContext = createContext();

export function WardrobeProvider({ children }) {
  const [wardrobeItems, setWardrobeItems] = useState(() => {
    const storedItems = localStorage.getItem("wardrobeItems");
    if (storedItems) {
      try {
        return JSON.parse(storedItems);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const addItem = (item) => {
    setWardrobeItems((prev) => {
      const newItems = [...prev, item];
      localStorage.setItem("wardrobeItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeItem = (id) => {
    setWardrobeItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      localStorage.setItem("wardrobeItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateItem = (id, updates) => {
    setWardrobeItems((prev) => {
      const newItems = prev.map((item) => (item.id === id ? { ...item, ...updates } : item));
      localStorage.setItem("wardrobeItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <WardrobeContext.Provider value={{ wardrobeItems, addItem, removeItem, updateItem }}>
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  return useContext(WardrobeContext);
}
