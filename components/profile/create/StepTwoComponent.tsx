import React, { useEffect, useState } from 'react';
import { Button, IconButton, MD3Colors, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation } from '@tanstack/react-query';
import { CountriesService } from '@/src/services/countries.service';
import { ErrorMessagesEnum } from '@/src/constants/errors';
import { LanguagesService } from '@/src/services/languages.service';
import { ThemedText } from '@/components/ThemedText';

interface StepTwoComponentProps {
	onNext: () => void;
	onBack: () => void;
	setCountry: (country: any) => void;
	setNativeLanguage: (nativeLanguage: any) => void;
}

export const StepTwoComponent = ({
	setCountry,
	setNativeLanguage,
	onNext,
	onBack,
}: StepTwoComponentProps) => {
	const theme = useTheme();

	const [countryOpen, setCountryOpen] = useState(false);
	const [countryValue, setCountryValue] = useState(null);
	const [countryItems, setCountryItems] = useState<any[]>([]);

	const [nativeLanguageOpen, setNativeLanguageOpen] = useState(false);
	const [nativeLanguageValue, setNativeLanguageValue] = useState(null);
	const [nativeLanguageItems, setNativeLanguageItems] = useState<any[]>([]);
	const [languageModalVisible, setLanguageModalVisible] = useState<boolean>(false);

	const showLanguageModal = () => setLanguageModalVisible(true);
	const hideLanguageModal = () => setLanguageModalVisible(false);
	const containerStyle = { padding: 20 };

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

				setCountryItems(countryItems);
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

	const getLanguagesMutation = useMutation({
		mutationFn: LanguagesService.getLanguages,
		onSuccess: async (data) => {
			try {
				if (data.success === false) {
					return;
				}

				const languageItems = data.data.map((language: any) => ({
					label: language.name,
					value: language.name,
				}));

				setNativeLanguageItems(languageItems);
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
		getLanguagesMutation.mutate();
	}, []);

	return (
		<ThemedView style={{ margin: 16 }}>
			<Text variant="displayLarge">Profile Step Two</Text>
			<Text variant="displayMedium">Step Two Content</Text>
			<DropDownPicker
				open={countryOpen}
				value={countryValue}
				items={countryItems}
				setOpen={setCountryOpen}
				setValue={setCountryValue}
				setItems={setCountryItems}
				searchable={true}
				onSelectItem={(country) => setCountry(country)}
				placeholder={'Select your country'}
			/>
			<ThemedText style={{ margin: 16, marginTop: 32 }}>Native Language</ThemedText>
			<Button
				icon="plus-circle"
				buttonColor={theme.colors.primary}
				mode={'contained'}
				onPress={showLanguageModal}
			>
				Add Language
			</Button>
			<Portal>
				<Modal
					visible={languageModalVisible}
					onDismiss={hideLanguageModal}
					contentContainerStyle={containerStyle}
				>
					<ThemedText>Example Modal. Click outside this area to dismiss.</ThemedText>
					<DropDownPicker
						open={nativeLanguageOpen}
						value={nativeLanguageValue}
						items={nativeLanguageItems}
						setOpen={setNativeLanguageOpen}
						setValue={setNativeLanguageValue}
						setItems={setNativeLanguageItems}
						searchable={true}
						onSelectItem={(nativeLanguage) => setNativeLanguage(nativeLanguage)}
						placeholder={'Select your native language'}
					/>
				</Modal>
			</Portal>
			<Button mode="contained" onPress={onNext} style={{ margin: 16 }}>
				Next
			</Button>
			<Button mode="contained" onPress={onBack} style={{ margin: 16 }}>
				Back
			</Button>
		</ThemedView>
	);
};
