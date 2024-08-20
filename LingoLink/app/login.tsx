import {ThemedView} from "@/components/ThemedView";
import {Text} from "react-native-paper";
import React, {useState} from "react";
import {LoginFormStyles} from "@/components/login/LoginForm.styles";
import LoginInputField from "@/components/login/LoginInputField";
import LoginButton from "@/components/login/LoginButton";
import RegisterLink from "@/components/login/RegisterLink";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {loginUser, registerUser} from "@/src/services/auth.service";
import UserLoginDTO from "@/src/types/userLogin";
import {ApiLoginResponseOkDTO} from "@/src/types/apiResponse/login/apiLoginResponseOkDTO";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: loginUser,
      onSuccess: async (data: ApiLoginResponseOkDTO) => {
          try {
              await AsyncStorage.setItem(data.data.type, data.data.token);

              if(await AsyncStorage.getItem("bearer")) { // Fait await AsyncStorage.getItem("bearer") pour checker si ton utilisateur est authentifié, peut etre créer une fonction "checkAuth"
                  console.log("On est authentifié letsgooooooo");
              }
          } catch (e) {

          }
      },
      onError: (error) => {

      }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data: UserLoginDTO = {
          email: email,
          password: password,
      };

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
