import React from 'react';
import { Button, Text } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';

interface StepTwoComponentProps {
	onNext: () => void;
	onBack: () => void;
}

export const StepTwoComponent = ({ onNext, onBack }: StepTwoComponentProps) => {
	return (
		<ThemedView>
			<Text variant="displayLarge">Profile Step Two</Text>
			<Text variant="displayMedium">Step Two Content</Text>
			{/* Add your step two fields here */}
			<Button mode="contained" onPress={onBack} style={{ margin: 16 }}>
				Back
			</Button>
			<Button mode="contained" onPress={onNext} style={{ margin: 16 }}>
				Next
			</Button>
		</ThemedView>
	);
};
