import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { StorageService } from '@/src/services/storage.service';
import { ProfileService } from '@/src/services/profile.service';
import { formatDate } from '@/src/utils/dates';
import { initializeStepper, resetStepper, goToNextStep, handleBack } from '@/src/utils/stepper';
import { ThemedView } from '@/components/ThemedView';
import { StepOneComponent } from '@/components/profile/create/StepOneComponent';
import { StepTwoComponent } from '@/components/profile/create/StepTwoComponent';
import { StepThreeComponent } from '@/components/profile/create/StepThreeComponent';
import { StorageKeysEnum } from '@/src/constants/storage';
import { RoutesEnum } from '@/src/constants/routing';
import { ProfileCreationEnum } from '@/src/constants/stepper';
import { ErrorMessagesEnum } from '@/src/constants/errors';
import { Genders } from '@/src/constants/genders';
import { AuthService } from '@/src/services/auth.service';

export default function CreateProfileScreen() {
	const [currentStep, setCurrentStep] = useState(ProfileCreationEnum.STEP_ONE);
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [birthdate, setBirthdate] = useState<Date | undefined>(new Date());
	const [country, setCountry] = useState<any | null>(null);
	const [gender, setGender] = useState<Genders | null | undefined>('male');

	useEffect(() => {
		const fetchStepAndProfile = async () => {
			try {
				// Check if there's a stored step to resume from
				const storedStep = await StorageService.getFromLocalStorage(ProfileCreationEnum.STEP_NAME);
				if (storedStep) {
					setCurrentStep(storedStep as ProfileCreationEnum);
				}

				const profile = await ProfileService.getProfile();

				if (profile.data) {
					await StorageService.storeToLocalStorage(StorageKeysEnum.PROFILE, profile.data);
					const formattedBirthdate = new Date(profile.data.birthdate);
					setFirstName(profile.data.firstName);
					setLastName(profile.data.lastName);
					setBirthdate(formattedBirthdate);
					setGender(profile.data.gender);
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error(error);
					throw new Error(ErrorMessagesEnum.FETCH_ERROR, error);
				}
			}
		};

		initializeStepper();
		fetchStepAndProfile();
	}, []);

	const createProfileMutation = useMutation({
		mutationFn: ProfileService.creationUserProfile,
		onSuccess: async (data) => {
			try {
				if (data.success === false) {
					return;
				}

				await StorageService.storeToLocalStorage(StorageKeysEnum.PROFILE, data.data);
				await StorageService.storeToLocalStorage(
					ProfileCreationEnum.STEP_NAME,
					ProfileCreationEnum.STEP_TWO,
				);

				// Proceed to the next step
				await goToNextStep(currentStep, setCurrentStep);
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

	const setProfileHasCompletedMutation = useMutation({
		mutationFn: ProfileService.setCompletedProfile,
		onSuccess: async (data) => {
			try {
				return data.success !== false;
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
				throw new Error(ErrorMessagesEnum.COULD_NOT_SET_PROFILE_COMPLETED, error);
			}
		},
	});

	const setCountryMutation = useMutation({
		mutationFn: ({ profile, uuid }: { profile: any; uuid: string }) =>
			ProfileService.updateProfile(profile, uuid),
		onSuccess: async (data) => {
			try {
				if (!data.success) {
					return;
				} else {
					return data;
				}
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
				throw new Error(ErrorMessagesEnum.COULD_NOT_UPDATE_PROFILE, error);
			}
		},
	});

	const handleProfileCreation = async () => {
		const data: any = {
			firstName,
			lastName,
			birthdate: formatDate(birthdate),
			gender,
		};

		createProfileMutation.mutate(data);
	};

	const handleStepTwo = async () => {
		const newCountry = {
			country: {
				name: country.label,
				code: country.value,
			},
		};
		const uuid = await AuthService.getUuid();
		setCountryMutation.mutate({ profile: newCountry, uuid });
		// Proceed to the next step
		// await goToNextStep(currentStep, setCurrentStep);
	};

	const handleFinish = async () => {
		// Get the profile from local storage
		let profile: any = await StorageService.getFromLocalStorage(StorageKeysEnum.PROFILE);
		profile = JSON.parse(profile);

		// Use the uuid to set the profile as completed
		setProfileHasCompletedMutation.mutate(profile.uuid);
		console.log('Profile has been set as completed');

		// Reset state
		await resetStepper();
		setCurrentStep(ProfileCreationEnum.STEP_ONE);

		router.push(RoutesEnum.MESSAGE_ROUTE);
	};

	const handleResetStepper = async () => {
		await resetStepper();
		setCurrentStep(ProfileCreationEnum.STEP_ONE);
		await StorageService.storeToLocalStorage(
			ProfileCreationEnum.STEP_NAME,
			ProfileCreationEnum.STEP_ONE,
		);
	};

	return (
		<ThemedView>
			{currentStep === ProfileCreationEnum.STEP_ONE && (
				<StepOneComponent
					firstName={firstName}
					lastName={lastName}
					birthdate={birthdate}
					gender={gender}
					setFirstName={setFirstName}
					setLastName={setLastName}
					setBirthdate={setBirthdate}
					setGender={(gender: string) => setGender(gender as Genders)}
					onNext={() => handleProfileCreation()}
					onReset={handleResetStepper}
				/>
			)}
			{currentStep === ProfileCreationEnum.STEP_TWO && (
				<StepTwoComponent
					setCountry={setCountry}
					onNext={handleStepTwo}
					onBack={() => handleBack(currentStep, setCurrentStep)}
				/>
			)}
			{currentStep === ProfileCreationEnum.STEP_THREE && (
				<StepThreeComponent
					onFinish={handleFinish}
					onBack={() => handleBack(currentStep, setCurrentStep)}
				/>
			)}
		</ThemedView>
	);
}
