import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation } from '@tanstack/react-query';
import { CountriesService } from '@/src/services/countries.service';
import { ErrorMessagesEnum } from '@/src/constants/errors';

interface StepTwoComponentProps {
	onNext: () => void;
	onBack: () => void;
	setCountry: (country: any) => void;
}

export const StepTwoComponent = ({ setCountry, onNext, onBack }: StepTwoComponentProps) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState<any[]>([]);

	const getCountriesMutation = useMutation({
		mutationFn: CountriesService.getCountries,
		onSuccess: async (data) => {
			try {
				if (data.success === false) {
					return;
				}
				const countryItems = data.data.map((country: any) => ({
					label: country.name.common,
					value: country.cca2,
				}));
				setItems(countryItems);
			} catch (error) {
				if (error instanceof Error) {
					console.error(error);
					throw new Error(ErrorMessagesEnum.FETCH_ERROR, error);
				}
			}
		},
		onError: (error) => {
			if (error instanceof Error) {
				console.error(error);
				throw new Error(ErrorMessagesEnum.COULD_NOT_CREATE_PROFILE, error);
			}
		},
	});

	useEffect(() => {
		getCountriesMutation.mutate();
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
