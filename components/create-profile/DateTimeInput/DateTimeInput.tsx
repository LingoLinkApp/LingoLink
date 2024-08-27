import {DatePickerInput, en, registerTranslation} from 'react-native-paper-dates';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useState} from "react";
import React from "react";
import {ThemedView} from "@/components/ThemedView";
import {StorageService} from "@/src/services/storage.service";

registerTranslation('en-gb', en);

type DateTimeInputProps = {
  birthdate: Date;
};

export default function DateTimeInput({birthdate}: DateTimeInputProps) {
  // Store the selected birthdate in local storage
  const storeSelectedBirthdate = async () => {
    try {
      await StorageService.storeToLocalStorage('birthdate', birthdate!);
    } catch (error) {
      console.error(`Could not store ${birthdate} to local storage`);
    }
  }

  return (
    <SafeAreaProvider>
      <ThemedView style={{justifyContent: 'center', flex: 1, alignItems: 'center', margin: 16, marginTop: 32}}>
        <DatePickerInput
          locale="en"
          label="Birthdate"
          value={birthdate}
          onChange={(d) => storeSelectedBirthdate(d)}
          inputMode="start"
          presentationStyle={"pageSheet"}

        />
      </ThemedView>
    </SafeAreaProvider>
  )
}
