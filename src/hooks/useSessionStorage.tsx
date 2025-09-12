import { useEffect, useState } from "react";


function getSessionStorageOrDefault(key: string, defaultValue: any) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing sessionStorage value:", error);
    return defaultValue;
  }
}

export function useSessionStorage(key: string, defaultValue: any) {
  const [value, setValue] = useState(() => getSessionStorageOrDefault(key, defaultValue));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Optional: Listen for storage events for cross-tab or external updates
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Error parsing sessionStorage value from event:", error);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [value, setValue];
}