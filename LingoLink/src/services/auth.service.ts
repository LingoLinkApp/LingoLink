import UserRegisterDTO from "@/src/types/userRegister";
import {API_URL} from "@/src/utils/constants";
import UserLoginDTO from "@/src/types/userLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (userLoginInformation: UserRegisterDTO) => {
    const response = await fetch(API_URL + '/auth/register',
      {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(userLoginInformation),
      }
    )

    if (!response.ok) {
        throw new Error("error");
    }

    return await response.json()
}

export const loginUser = async (userRegisterInformation: UserLoginDTO) => {
    const response = await fetch(API_URL + '/auth/login',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userRegisterInformation),
        })

    if (!response.ok) {
        throw new Error("error");
    }

    return await response.json()
}

export const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem("bearer");

        return true;
    } catch (e) {

        return false;
    }
}



export abstract class AuthService {



}
