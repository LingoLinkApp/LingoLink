import {StyleSheet, Image, Platform} from 'react-native';
import {ThemedView} from "@/components/ThemedView";
import {Text} from "react-native-paper";
import React from 'react';


export default function TabTwoScreen() {
  return (
    <ThemedView>
      <Text variant="displayLarge">Tab Two</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
