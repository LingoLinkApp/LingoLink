import { ThemedView } from '@/components/ThemedView';
import { Button, Text } from 'react-native-paper';
import React from 'react';
import { AuthService } from '@/src/services/auth.service';
import { StorageService } from '@/src/services/storage.service';

export default function TabTwoScreen() {
	const logout = async () => {
		await AuthService.logout();
		await StorageService.clearLocalStorage();
	};
	return (
		<ThemedView>
			<Text variant="displayLarge">Tab Two</Text>
			<Button mode="outlined" onPress={logout}>
				Logout
			</Button>
		</ThemedView>
	);
}
