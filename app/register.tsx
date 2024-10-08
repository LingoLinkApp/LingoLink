import {ThemedView} from "@/components/ThemedView";
import {Text} from "react-native-paper";
import {useState} from "react";
import {RegisterFormStyles} from "@/components/register/RegisterForm.styles";
import RegisterInputField from "@/components/register/RegisterInputField";
import RegisterButton from "@/components/register/RegisterButton";
import LoginLink from "@/components/register/LoginLink";
import React from "react";
import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/src/services/auth.service";
import {UserRegisterDTO} from "@/src/types/register/userRegisterDTO";

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: AuthService.registerUser,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error);
      setError("An error occurred while registering. Please try again.");
    },
  })


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: UserRegisterDTO
      = {
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirm,
    };

    mutation.mutate(data);
  };

  return (
    <ThemedView style={RegisterFormStyles.wrapper}>
      <Text variant='displayMedium'>Register</Text>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <RegisterInputField
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder='johndoe'
        autoFocus={true}
        autoCorrect={true}
        textContentType='username'
      />
      <RegisterInputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        placeholder='john.doe@gmail.com'
        autoCorrect={true}
        textContentType='emailAddress'
      />
      <RegisterInputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
      />
      <RegisterInputField
        label="Confirm Password"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
        autoCorrect={false}
      />
      <RegisterButton onPress={handleSubmit}/>
      <LoginLink/>
    </ThemedView>
  );
}
