import UserRegisterDTO from "@/LingoLink/src/types/userRegister";
import UserLoginDTO from "@/LingoLink/src/types/userLogin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@/constants/constants";

export const registerUser = async (userInformation: UserRegisterDTO) => {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInformation),
    }
  )

  if (!response.ok) {
    console.log(response);
    throw new Error("An error occurred while registering. Please try again.");
  }

  return await response.json()
}

export const loginUser = async (userInformation: UserLoginDTO) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInformation),
    }
  )

  if (!response.ok) {
    throw new Error("error");
  }

  return await response.json()
}

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("bearer");
  } catch (e) {
    return false;
  }
}


export abstract class AuthService {
  public static async login(email: string, password: string) {
    // Login logic
  }

  public static async register(email: string, username: string, password: string, passwordConfirm: string) {

  }

  public static async logout() {
    // Logout logic
  }
}
