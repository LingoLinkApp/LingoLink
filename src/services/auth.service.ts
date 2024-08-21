import {API_URL} from "@/constants/constants";
import {UserRegisterDTO} from "@/src/types/register/userRegisterDTO";
import {UserLoginDTO} from "@/src/types/login/userLoginDTO";
import {StorageService} from "@/src/services/storage.service";
import {router} from "expo-router";

export abstract class AuthService {

  public static registerUser = async (userInformation: UserRegisterDTO) => {
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

  public static loginUser = async (userInformation: UserLoginDTO) => {
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
      throw new Error("An error occurred while logging in. Please try again.");
    }

    return await response.json()
  }

  public static logoutUser = async () => {
    try {
      await StorageService.deleteFromSecureStorage("bearer");
      router.push("/login");
    } catch (e) {
      return false;
    }
  }

  public static getBearerToken = async () => {
    return await StorageService.getFromSecureStorage("bearer");
  }

  public static hasProfile = async () => {
    try {
      const response = await fetch(
        `${API_URL}/profile`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${await this.getBearerToken()}`,
          },
        }
      )

      return response.ok;


    } catch (e) {
      return false;
    }
  }
}
