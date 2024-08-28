import { StorageService } from '@/src/services/storage.service';
import { ProfileCreationEnum } from '@/src/constants/stepper';
import { router } from 'expo-router';
import { RoutesEnum } from '@/src/constants/routing';

export async function initializeStepper() {
	const storedStep = await StorageService.getFromLocalStorage(ProfileCreationEnum.STEP_NAME);
	if (!storedStep) {
		await StorageService.storeToLocalStorage(
			ProfileCreationEnum.STEP_NAME,
			ProfileCreationEnum.STEP_ONE,
		);
	}
}

export async function resetStepper() {
	await StorageService.deleteFromLocalStorage(ProfileCreationEnum.STEP_NAME);
}

export async function goToNextStep(
	currentStep: ProfileCreationEnum,
	setCurrentStep: (step: ProfileCreationEnum) => void,
) {
	if (currentStep === ProfileCreationEnum.STEP_ONE) {
		setCurrentStep(ProfileCreationEnum.STEP_TWO);
		await StorageService.storeToLocalStorage(
			ProfileCreationEnum.STEP_NAME,
			ProfileCreationEnum.STEP_TWO,
		);
	} else if (currentStep === ProfileCreationEnum.STEP_TWO) {
		setCurrentStep(ProfileCreationEnum.STEP_THREE);
		await StorageService.storeToLocalStorage(
			ProfileCreationEnum.STEP_NAME,
			ProfileCreationEnum.STEP_THREE,
		);
	}
}

// Function to go back to the previous step
export async function handleBack(
	currentStep: ProfileCreationEnum,
	setCurrentStep: (step: ProfileCreationEnum) => void,
) {
	if (currentStep === ProfileCreationEnum.STEP_TWO) {
		setCurrentStep(ProfileCreationEnum.STEP_ONE);
		await StorageService.storeToLocalStorage(
			ProfileCreationEnum.STEP_NAME,
			ProfileCreationEnum.STEP_ONE,
		);
	} else if (currentStep === ProfileCreationEnum.STEP_THREE) {
		setCurrentStep(ProfileCreationEnum.STEP_TWO);
		await StorageService.storeToLocalStorage(
			ProfileCreationEnum.STEP_NAME,
			ProfileCreationEnum.STEP_TWO,
		);
	}
}
