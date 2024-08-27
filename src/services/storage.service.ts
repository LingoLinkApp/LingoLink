import * as SecureStore from 'expo-secure-store';
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";

export abstract class StorageService {
  public static async storeToSecureStorage(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  public static async getFromSecureStorage(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  public static async deleteFromSecureStorage(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  public static async storeToLocalStorage(key: string, value: string | object): Promise<void> {
    try {
      if (typeof value === 'object') {
        await AsyncStorageNative.setItem(key, JSON.stringify(value));
      } else {
        await AsyncStorageNative.setItem(key, value);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Could not store key ${key} to local storage: ${error.message}`);
        throw new Error(`Could not store key ${key} to local storage: ${error.message}`);
      }
    }
  }

  public static async getFromLocalStorage(key: string): Promise<string | null | undefined> {
    try {
      return await AsyncStorageNative.getItem(key);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Could not get key ${key} from local storage: ${error.message}`);
        throw new Error(`Could not get key ${key} from local storage: ${error.message}`);
      }
    }
  }
}
