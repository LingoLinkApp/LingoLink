import {ThemedView} from "@/components/ThemedView";
import {Button, Text} from "react-native-paper";
import React from 'react';
import {AuthService} from "@/src/services/auth.service";


export default function TabTwoScreen() {
  return (
    <ThemedView>
      <Text variant="displayLarge">Tab Two</Text>
      <Button mode='outlined' onPress={AuthService.logout}>Logout</Button>
    </ThemedView>
  );
}
