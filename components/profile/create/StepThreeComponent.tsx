import React from 'react';
import { Button, Text } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';

interface StepThreeComponentProps {
	onFinish: () => void;
	onBack: () => void;
}

export const StepThreeComponent = ({ onFinish, onBack }: StepThreeComponentProps) => {
	return (
		<ThemedView>
			<Text variant="displayLarge">Profile Step Three</Text>
			<Text variant="displayMedium">Step Three Content</Text>
			{/* Add your step three fields here */}
			<Button mode="contained" onPress={onBack} style={{ margin: 16 }}>
				Back
			</Button>
			<Button mode="contained" onPress={onFinish} style={{ margin: 16 }}>
				Finish
			</Button>
		</ThemedView>
	);
};
