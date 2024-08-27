import {Button} from "react-native-paper";
import {Link} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {LoginFormStyles} from "@/components/login/LoginForm.styles";
import {RoutesEnum} from "@/src/constants/routesEnum";
import React from "react";

export default function RegisterLink() {
  return (
    <ThemedView style={LoginFormStyles.container}>
      <Button mode="text">
        Don’t have an account? <Link href={RoutesEnum.REGISTER_ROUTE} style={LoginFormStyles.textCTA}>Register
        Now</Link>
      </Button>
    </ThemedView>
  );
}
