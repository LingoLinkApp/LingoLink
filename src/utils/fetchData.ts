import { StorageService } from '@/src/services/storage.service';
import { StorageKeysEnum } from '@/src/constants/storage';

export async function fetchCountries() {
	const countries = await StorageService.getFromLocalStorage(StorageKeysEnum.COUNTRIES);

	if (countries) {
		return JSON.parse(countries);
	}

	return [];
}

export async function fetchLanguages() {
	const languages = await StorageService.getFromLocalStorage(StorageKeysEnum.LANGUAGES);

	if (languages) {
		return JSON.parse(languages);
	}

	return [];
}
