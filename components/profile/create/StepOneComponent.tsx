import React from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { DatePickerInput } from 'react-native-paper-dates';
import { ThemedView } from '@/components/ThemedView';
import { genders } from '@/src/constants/genders';

interface StepOneComponentProps {
	firstName: string;
	lastName: string;
	birthdate: Date | undefined;
	gender: string | null | undefined;
	setFirstName: (firstName: string) => void;
	setLastName: (lastName: string) => void;
	setBirthdate: (birthdate: Date | undefined) => void;
	setGender: (gender: string) => void;
	onNext: () => void;
	onReset: () => void;
}

export const StepOneComponent = ({
	firstName,
	lastName,
	birthdate,
	gender,
	setFirstName,
	setLastName,
	setBirthdate,
	setGender,
	onNext,
	onReset,
}: StepOneComponentProps) => {
	return (
		<ThemedView>
			<Text variant="displayLarge">Create Profile</Text>
			<Text variant="displayMedium">Tell us more about yourself</Text>
			<TextInput
				mode="outlined"
				textContentType={'name'}
				label={'First name'}
				placeholder={'John'}
				value={firstName}
				onChangeText={setFirstName}
				style={{ margin: 16 }}
			/>
			<TextInput
				mode="outlined"
				textContentType={'familyName'}
				label={'Last name'}
				value={lastName}
				onChangeText={setLastName}
				placeholder={'Doe'}
				style={{ margin: 16 }}
			/>
			<ThemedView
				style={{
					justifyContent: 'center',
					flex: 1,
					alignItems: 'center',
					margin: 16,
					marginTop: 32,
				}}
			>
				<DatePickerInput
					locale="en"
					mode="outlined"
					label="Birthdate"
					value={birthdate}
					onChange={(d) => setBirthdate(d)}
					inputMode="start"
					saveLabel="Save"
					startWeekOnMonday={true}
					presentationStyle={'pageSheet'}
				/>
			</ThemedView>
			<ThemedView style={{ margin: 16, marginTop: 64 }}>
				<Dropdown
					label="Gender"
					placeholder="Select Gender"
					options={genders}
					value={gender!}
					onSelect={setGender}
				/>
			</ThemedView>
			<Button mode="contained" onPress={onNext} style={{ margin: 16 }}>
				Next
			</Button>
			<Button mode="contained" onPress={onReset} style={{ margin: 16 }}>
				Reset Stepper
			</Button>
		</ThemedView>
	);
};
