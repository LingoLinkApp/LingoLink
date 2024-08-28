import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { Button, Text } from 'react-native-paper';

export default function CreateProfileStepThreeScreen() {
	const getStep = () => {
		return 3;
	};

	return (
		<ThemedView>
			<Text variant="displayLarge">Tell us more about yourself</Text>
			<Text variant="displayMedium">Step 3</Text>
			<Button onPress={() => console.log(getStep())}>Get Step</Button>
		</ThemedView>
	);
}
