import {config} from "@/src/services/context.service";
import {AuthService} from "@/src/services/auth.service";
import {ApiRoutesEnum} from "@/src/constants/routesEnum";

export abstract class ProfileService {

  public static creationUserProfile = async (profileInformation: any) => {
    console.log(await AuthService.getBearerToken());
    const response = await fetch(
      `${config.apiUrl}${ApiRoutesEnum.PROFILE_ROUTE}`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await AuthService.getBearerToken()}`,
        },
        body: JSON.stringify(profileInformation),
      }
    )

    if (response.status !== 201) {
      console.error(response);
      throw new Error("An error occurred while registering. Please try again.");
    }

    return await response.json()
  }

  public static getProfile = async () => {
    const response = await fetch(
      `${config.apiUrl}${ApiRoutesEnum.PROFILE_ROUTE}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await AuthService.getBearerToken()}`,
        },
      });
    return await response.json();
  }
}
