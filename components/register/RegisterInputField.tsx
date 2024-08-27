import {TextInput} from "react-native-paper";
import {ThemedView} from "@/components/ThemedView";
import {RegisterFormStyles} from "@/components/register/RegisterForm.styles";
import React from "react";

export default function RegisterInputField({label, value, onChangeText, ...props}: any) {
  return (
    <ThemedView style={[RegisterFormStyles.container, RegisterFormStyles.inputContainer]}>
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
