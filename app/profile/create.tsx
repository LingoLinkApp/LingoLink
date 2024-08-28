import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { StorageService } from '@/src/services/storage.service';
import { ProfileService } from '@/src/services/profile.service';
import { initializeStepper, resetStepper, goToNextStep, handleBack } from '@/src/utils/stepper';
import { ThemedView } from '@/components/ThemedView';
import { ProfileCreationEnum } from '@/src/constants/stepper';
import { ErrorMessagesEnum } from '@/src/constants/errors';
import { formatDate } from '@/src/utils/dates';
import { StepOneComponent } from '@/components/profile/create/StepOneComponent';
import { StepTwoComponent } from '@/components/profile/create/StepTwoComponent';
import { StepThreeComponent } from '@/components/profile/create/StepThreeComponent';
import { StorageKeysEnum } from '@/src/constants/storage';
import { router } from 'expo-router';
import { RoutesEnum } from '@/src/constants/routing';

export default function CreateProfileScreen() {
	const [currentStep, setCurrentStep] = useState(ProfileCreationEnum.STEP_ONE);
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [birthdate, setBirthdate] = useState<Date | undefined>(new Date());
	const [gender, setGender] = useState<string | null | undefined>('male');

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

	const handleProfileCreation = async () => {
		const data: any = {
			firstName,
			lastName,
			birthdate: formatDate(birthdate),
			gender,
		};

		createProfileMutation.mutate(data);
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
					setGender={setGender}
					onNext={() => handleProfileCreation()}
					onReset={handleResetStepper}
				/>
			)}
			{currentStep === ProfileCreationEnum.STEP_TWO && (
				<StepTwoComponent
					onNext={() => goToNextStep(currentStep, setCurrentStep)}
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
