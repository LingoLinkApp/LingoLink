import React, {useState} from 'react';
import {Dropdown} from 'react-native-paper-dropdown';
import {genders} from "@/constants/genders";
import {ThemedView} from "@/components/ThemedView";
import {StorageService} from "@/src/services/storage.service";

type DropDownInputProps = {
  gender: string | null | undefined;
  setGender: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

export default function DropDownInput({gender, setGender}: DropDownInputProps) {
  // Store the selected gender in local storage
  const storeSelectedGender = async () => {
    setGender(gender);
    try {
      await StorageService.storeToLocalStorage('gender', gender!);
    } catch (error) {
      console.error(`Could not store ${gender} to local storage`);
    }
  }

  return (
    <ThemedView style={{margin: 16, marginTop: 64}}>
      <Dropdown
        label="Gender"
        placeholder="Select Gender"
        options={genders}
        value={gender!}
        onSelect={storeSelectedGender}
      />
    </ThemedView>
  );
}
