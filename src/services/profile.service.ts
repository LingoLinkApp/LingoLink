import { config } from '@/src/services/context.service';
import { AuthService } from '@/src/services/auth.service';
import { ApiRoutesEnum } from '@/src/constants/routing';
import { ErrorMessagesEnum } from '@/src/constants/errors';

// TODO: use DTO for models
export abstract class ProfileService {
	public static async creationUserProfile(profileInformation: any) {
		const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.PROFILE_ROUTE}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${await AuthService.getBearerToken()}`,
			},
			body: JSON.stringify(profileInformation),
		});

		if (!response.ok) {
			console.error(response);
			throw new Error(ErrorMessagesEnum.REGISTER_ERROR);
		}

		return await response.json();
	}

	public static async getProfile() {
		// Get the current user's uuid
		const uuid = await AuthService.getUuid();
		const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.PROFILE_ROUTE}/${uuid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${await AuthService.getBearerToken()}`,
			},
		});
		return await response.json();
	}

	public static async setCompletedProfile(uuid: string) {
		const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.PROFILE_ROUTE}/${uuid}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${await AuthService.getBearerToken()}`,
			},
			body: JSON.stringify({ isCompleted: true }),
		});
		return await response.json();
	}

	public static async updateProfile(profile: any, uuid: string) {
		const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.PROFILE_ROUTE}/${uuid}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${await AuthService.getBearerToken()}`,
			},
			body: JSON.stringify(profile),
		});
		return await response.json();
	}
}
