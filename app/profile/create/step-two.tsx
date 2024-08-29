import React, { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { Button, Text } from 'react-native-paper';

export default function CreateProfileStepTwoScreen() {
	const getStep = () => {
		return 2;
	};

	return (
		<ThemedView>
			<Text variant="displayLarge">Tell us more about yourself</Text>
			<Text variant="displayMedium">Step 2</Text>
			<Button onPress={() => console.log(getStep())}>Get Step</Button>
		</ThemedView>
	);
}
