import React, { useEffect, useState } from 'react';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useMutation } from '@tanstack/react-query';
import { CountriesService } from '@/src/services/countries.service';
import { LanguagesService } from '@/src/services/languages.service';
import { languageLevels } from '@/src/constants/languages';

interface StepTwoComponentProps {
	onNext: () => void;
	onBack: () => void;
	setCountry: (country: any) => void;
	setNativeLanguage: (nativeLanguage: any) => void;
	setNativeLanguageLevel: (nativeLanguageLevel: any) => void;
}

export const StepTwoComponent = ({
	setCountry,
	setNativeLanguage,
	setNativeLanguageLevel,
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

	const [nativeLanguageLevelOpen, setNativeLanguageLevelOpen] = useState(false);
	const [nativeLanguageLevelValue, setNativeLanguageLevelValue] = useState<string | null>(null);
	const [nativeLanguageLevelItems, setNativeLanguageLevelItems] = useState(languageLevels);

	const showLanguageModal = () => setLanguageModalVisible(true);
	const hideLanguageModal = () => setLanguageModalVisible(false);

	const getCountriesMutation = useMutation({
		mutationFn: CountriesService.getCountries,
		onSuccess: async (data) => {
			if (!data.success) return;
			const countryItems = data.data.map((country: any) => ({
				label: country.name.common,
				value: country.cca2,
			}));
			setCountryItems(countryItems);
		},
		onError: (error) => console.error(error),
	});

	const getLanguagesMutation = useMutation({
		mutationFn: LanguagesService.getLanguages,
		onSuccess: async (data) => {
			if (!data.success) return;
			const languageItems = data.data.map((language: any) => ({
				label: language.name,
				value: language.name,
			}));
			setNativeLanguageItems(languageItems);
		},
		onError: (error) => console.error(error),
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
					contentContainerStyle={{ padding: 20, backgroundColor: theme.colors.onBackground }}
				>
					<ScrollView>
						<View>
							<ThemedText style={{ color: theme.colors.onSecondary }}>
								Select your native language
							</ThemedText>
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
								listMode="MODAL"
								dropDownDirection="TOP"
							/>
						</View>
						<View style={{ paddingTop: 32 }}>
							<ThemedText style={{ color: theme.colors.onSecondary }}>Select your level</ThemedText>
							<DropDownPicker
								open={nativeLanguageLevelOpen}
								value={nativeLanguageLevelValue}
								setValue={setNativeLanguageLevel}
								items={nativeLanguageLevelItems.map((item) => ({
									label: item.name,
									value: item.value,
									description: item.description,
								}))}
								setOpen={setNativeLanguageLevelOpen}
								setItems={setNativeLanguageLevelItems}
								searchable={true}
								placeholder={'Select your level'}
								listMode="MODAL"
								dropDownDirection="TOP"
								renderListItem={({ item }) => (
									<View style={{ padding: 10 }}>
										<Text style={{ fontWeight: 'bold', color: '#333', paddingBottom: 8 }}>
											{item.label}
										</Text>
										<Text style={{ color: '#666' }}>{item.description}</Text>
									</View>
								)}
							/>
						</View>
					</ScrollView>
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
