import {ThemedView} from "@/components/ThemedView";
import {Text} from "react-native-paper";
import {useState} from "react";
import {RegisterFormStyles} from "@/components/register/RegisterForm.styles";
import RegisterInputField from "@/components/register/RegisterInputField";
import RegisterButton from "@/components/register/RegisterButton";
import LoginLink from "@/components/register/LoginLink";
import {useRegisterForm} from "@/hooks/useRegisterForm";

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const {loading, error, handleRegister} = useRegisterForm();

  const handleSubmit = async () => {
    await handleRegister({username, email, password, passwordConfirm});
  };

  return (
    <ThemedView style={RegisterFormStyles.wrapper}>
      <Text variant='displayMedium'>Register</Text>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <RegisterInputField
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder='@johndoe'
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
      <RegisterButton onPress={handleSubmit} loading={loading}/>
      <LoginLink/>
    </ThemedView>
  );
}
