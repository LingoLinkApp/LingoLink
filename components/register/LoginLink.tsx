import {Button} from "react-native-paper";
import {Link} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {RegisterFormStyles} from "@/components/register/RegisterForm.styles";
import React from "react";
import {RoutesEnum} from "@/src/constants/routesEnum";

export default function LoginLink() {
  return (
    <ThemedView style={RegisterFormStyles.container}>
      <Button mode="text">
        Already have an account? <Link href={RoutesEnum.LOGIN_ROUTE} style={RegisterFormStyles.textCTA}>Login</Link>
      </Button>
    </ThemedView>
  );
}
