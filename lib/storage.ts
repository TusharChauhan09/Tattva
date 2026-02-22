import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage adapter for general use
export const asyncStorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },
};

// Onboarding flag
const ONBOARDED_KEY = "hasOnboarded";

export async function setOnboarded(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDED_KEY, "true");
}

export async function getOnboarded(): Promise<boolean> {
  const value = await AsyncStorage.getItem(ONBOARDED_KEY);
  return value === "true";
}

export async function clearOnboarded(): Promise<void> {
  await AsyncStorage.removeItem(ONBOARDED_KEY);
}
