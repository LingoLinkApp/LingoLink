import UserRegisterDTO from "@/LingoLink/src/types/userRegister";
import UserLoginDTO from "@/LingoLink/src/types/userLogin";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const registerUser = async (userInformation: UserRegisterDTO) => {
  const response = await fetch(
      'http://localhost:3333/api/v1/auth/register',
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

export const loginUser = async (userInformation: UserLoginDTO) => {
  const response = await fetch(
      'http://localhost:3333/api/v1/auth/login',
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
