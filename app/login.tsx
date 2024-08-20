import {ThemedView} from "@/components/ThemedView";
import {Text} from "react-native-paper";
import {useState} from "react";
import {LoginFormStyles} from "@/components/login/LoginForm.styles";
import LoginInputField from "@/components/login/LoginInputField";
import LoginButton from "@/components/login/LoginButton";
import RegisterLink from "@/components/login/RegisterLink";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <LoginButton onPress={() => console.log('Pressed')}/>
      <RegisterLink/>
    </ThemedView>
  );
}
