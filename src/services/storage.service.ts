import * as SecureStore from 'expo-secure-store';

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
}
