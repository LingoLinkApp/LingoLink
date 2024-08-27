import {Button} from "react-native-paper";
import {ThemedView} from "@/components/ThemedView";
import {RegisterFormStyles} from "@/components/register/RegisterForm.styles";
import React from "react";

export default function RegisterButton({onPress, loading}: any) {
  return (
    <ThemedView style={RegisterFormStyles.container}>
      <Button mode="contained" onPress={onPress} loading={loading}>
        Register
      </Button>
    </ThemedView>
  );
}
