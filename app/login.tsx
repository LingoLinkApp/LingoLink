import {ThemedView} from "@/components/ThemedView";
import {Text} from "react-native-paper";
import {useState} from "react";
import {LoginFormStyles} from "@/components/login/LoginForm.styles";
import LoginInputField from "@/components/login/LoginInputField";
import LoginButton from "@/components/login/LoginButton";
import RegisterLink from "@/components/login/RegisterLink";
import React from "react";
import {useMutation} from "@tanstack/react-query";
import {loginUser, registerUser} from "@/src/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserLoginDTO from "@/LingoLink/src/types/userLogin";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        await AsyncStorage.setItem(data.data.type, data.data.token);

        if (await AsyncStorage.getItem("bearer")) {
          console.log("Successfully logged in.");
        }

      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
    },
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: UserLoginDTO = {
      email: email,
      password: password,
    }

    mutation.mutate(data);
  }

  return (
    <ThemedView style={LoginFormStyles.wrapper}>
      <Text variant='displayMedium'>Login</Text>
      <LoginInputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        placeholder='john.doe@gmail.com'
        autoFocus={true}
        autoCorrect={true}
        textContentType='emailAddress'
      />
      <LoginInputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
      />
      <LoginButton onPress={handleSubmit}/>
      <RegisterLink/>
    </ThemedView>
  );
}
