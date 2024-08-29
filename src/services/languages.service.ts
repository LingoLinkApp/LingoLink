import { config } from '@/src/services/context.service';
import { ApiRoutesEnum } from '@/src/constants/routing';
import { ErrorMessagesEnum } from '@/src/constants/errors';

export abstract class LanguagesService {
	public static async getLanguages() {
		const response = await fetch(`${config.apiUrl}${ApiRoutesEnum.COUNTRIES_ROUTE}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			console.log(response);
			throw new Error(ErrorMessagesEnum.FETCH_ERROR);
		}

		return await response.json();
	}
}
