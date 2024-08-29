import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import DropDownPicker from 'react-native-dropdown-picker';
import { StorageService } from '@/src/services/storage.service';
import { StorageKeysEnum } from '@/src/constants/storage';

interface StepTwoComponentProps {
	onNext: () => void;
	onBack: () => void;
	setCountry: (country: any) => void;
}

export const StepTwoComponent = ({ setCountry, onNext, onBack }: StepTwoComponentProps) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState<any[]>([]);

	const fetchCountries = async () => {
		const countries = await StorageService.getFromLocalStorage(StorageKeysEnum.COUNTRIES);

		if (countries) {
			return JSON.parse(countries);
		}

		return [];
	};
	fetchCountries();

	useEffect(() => {
		const updateItems = async () => {
			const countries = await fetchCountries();
			if (countries && Array.isArray(countries)) {
				// Map countries data to the desired format
				const countryItems = countries.map((country: any) => ({
					label: country.name.common,
					value: country.cca2,
				}));
				setItems(countryItems);
			}
		};

		updateItems();
	}, []);

	return (
		<ThemedView>
			<Text variant="displayLarge">Profile Step Two</Text>
			<Text variant="displayMedium">Step Two Content</Text>
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				searchable={true}
				onSelectItem={(country) => setCountry(country)}
				placeholder={'Select a country'}
			/>
			<Button mode="contained" onPress={onNext} style={{ margin: 16 }}>
				Next
			</Button>
			<Button mode="contained" onPress={onBack} style={{ margin: 16 }}>
				Back
			</Button>
		</ThemedView>
	);
};
