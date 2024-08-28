import { UserRegisterDTO } from '@/src/types/register/userRegisterDTO';
import { UserLoginDTO } from '@/src/types/login/userLoginDTO';
import { StorageService } from '@/src/services/storage.service';
import { config } from '@/src/services/context.service';
import { router } from 'expo-router';
import { ApiRoutesEnum, RoutesEnum } from '@/src/constants/routing';
import { StorageKeysEnum } from '@/src/constants/storage';
import { ErrorMessagesEnum } from '@/src/constants/errors';

export abstract class AuthService {
	public static registerUser = async (userInformation: UserRegisterDTO) => {
		const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.REGISTER_ROUTE}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInformation),
		});

		if (!response.ok) {
			console.log(response);
			throw new Error(ErrorMessagesEnum.REGISTER_ERROR);
		}

		return await response.json();
	};

	public static loginUser = async (userInformation: UserLoginDTO) => {
		const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.LOGIN_ROUTE}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInformation),
		});

		if (!response.ok) {
			throw new Error(ErrorMessagesEnum.LOGIN_ERROR);
		}

		return await response.json();
	};

	public static logoutUser = async () => {
		try {
			await StorageService.deleteFromSecureStorage(StorageKeysEnum.BEARER_TOKEN);
			router.push(RoutesEnum.LOGIN_ROUTE);
		} catch (e) {
			return false;
		}
	};

	public static getBearerToken = async () => {
		return await StorageService.getFromSecureStorage(StorageKeysEnum.BEARER_TOKEN);
	};

	public static hasCompletedProfile = async () => {
		try {
			const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.PROFILE_ROUTE}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${await this.getBearerToken()}`,
				},
			});

			if (!response.ok) {
				return false;
			} else {
				const profile = await response.json();
				return profile.data.completed;
			}
		} catch (e) {
			return false;
		}
	};

	public static logout = async () => {
		await StorageService.deleteFromSecureStorage(StorageKeysEnum.BEARER_TOKEN);
		router.push(RoutesEnum.LOGIN_ROUTE);
	};
}
