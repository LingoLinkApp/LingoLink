import {ThemedView} from "@/components/ThemedView";
import {Button, Text} from "react-native-paper";
import {AuthService} from "@/src/services/auth.service";
import React from "react";

export default function MessagesScreen() {

  const token = AuthService.getBearerToken();

  return (
    <ThemedView>
      <Text variant="displayLarge">Messages</Text>
      <Button mode="contained" onPress={AuthService.logoutUser}>Logout</Button>
    </ThemedView>
  );
}
