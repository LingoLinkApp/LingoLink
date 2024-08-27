import {Button} from "react-native-paper";
import {ThemedView} from "@/components/ThemedView";
import {LoginFormStyles} from "@/components/login/LoginForm.styles";
import React from "react";

export default function LoginButton({onPress}: any) {
  return (
    <ThemedView style={LoginFormStyles.container}>
      <Button mode="contained" onPress={onPress}>
        Login
      </Button>
    </ThemedView>
  );
}
