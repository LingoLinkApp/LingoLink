import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native-paper';
import { useState } from 'react';
import { LoginFormStyles } from '@/components/login/LoginForm.styles';
import LoginInputField from '@/components/login/LoginInputField';
import LoginButton from '@/components/login/LoginButton';
import RegisterLink from '@/components/login/RegisterLink';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { StorageService } from '@/src/services/storage.service';
import { UserLoginDTO } from '@/src/types/login/userLoginDTO';
import { AuthService } from '@/src/services/auth.service';
import { router } from 'expo-router';
import { RoutesEnum } from '@/src/constants/routing';
import { StorageKeysEnum } from '@/src/constants/storage';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginMutation = useMutation({
		mutationFn: AuthService.loginUser,
		onSuccess: async (data) => {
			try {
				await StorageService.storeToSecureStorage(StorageKeysEnum.BEARER_TOKEN, data.data.token);

				if (await StorageService.getFromSecureStorage(StorageKeysEnum.BEARER_TOKEN)) {
					const profile = await AuthService.hasCompletedProfile();
					if (profile) {
						await StorageService.storeToLocalStorage(StorageKeysEnum.PROFILE, profile.data);
						router.push(RoutesEnum.MESSAGE_ROUTE);
					} else {
						router.push(RoutesEnum.CREATE_PROFILE_ROUTE);
					}
				}
			} catch (error) {
				console.error(error);
			}
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data: UserLoginDTO = {
			email: email,
			password: password,
		};

		loginMutation.mutate(data);
	};

	return (
		<ThemedView style={LoginFormStyles.wrapper}>
			<Text variant="displayMedium">Login</Text>
			<LoginInputField
				label="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				placeholder="john.doe@gmail.com"
				autoFocus={true}
				autoCorrect={true}
				textContentType="emailAddress"
			/>
			<LoginInputField
				label="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				autoCorrect={false}
			/>
			<LoginButton onPress={handleLogin} />
			<RegisterLink />
		</ThemedView>
	);
}
