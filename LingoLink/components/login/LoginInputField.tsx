import {TextInput} from "react-native-paper";
import {ThemedView} from "@/components/ThemedView";
import {LoginFormStyles} from "@/components/login/LoginForm.styles";

export default function LoginInputField({label, value, onChangeText, ...props}: any) {
  return (
    <ThemedView style={[LoginFormStyles.container, LoginFormStyles.inputContainer]}>
      <TextInput
        label={label}
        mode='outlined'
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </ThemedView>
  );
}
