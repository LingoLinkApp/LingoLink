import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import React from 'react';
import { RoutesEnum } from '@/src/constants/routing';

export default function HomeScreen() {
	return (
		<ThemedView style={styles.container}>
			<Text variant="displayLarge">LingoLink</Text>
			<ThemedView style={styles.buttonContainer}>
				<Link href={RoutesEnum.LOGIN_ROUTE} asChild>
					<Button mode="contained">Login</Button>
				</Link>
				<Link href={RoutesEnum.REGISTER_ROUTE} asChild>
					<Button mode="contained">Register</Button>
				</Link>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	buttonContainer: {
		width: '80%',
		justifyContent: 'space-around',
		height: 100,
		marginTop: 20,
	},
});
