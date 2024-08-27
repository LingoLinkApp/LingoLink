import {ThemedView} from "@/components/ThemedView";
import React, {useState} from "react";
import {Button, Text, TextInput} from "react-native-paper";
import DropDownInput from "@/components/create-profile/DropDownInput/DropDownInput";
import DateTimeInput from "@/components/create-profile/DateTimeInput/DateTimeInput";
import {StorageService} from "@/src/services/storage.service";

export default async function CreateProfileScreen() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [gender, setGender] = useState<string | null | undefined>('male');

  if (await StorageService.getFromLocalStorage('gender')) {
    setGender(await StorageService.getFromLocalStorage('gender'));
  }

  return (
    <ThemedView>
      <Text variant="displayLarge">Create Profile</Text>
      <Text variant="displayMedium">Tell us more about yourself</Text>
      <TextInput mode='outlined'
                 textContentType={'name'}
                 label={'First name'}
                 placeholder={'John'}
                 value={firstName}
                 onChangeText={setFirstName}
                 style={{margin: 16}}
      />
      <TextInput mode='outlined'
                 textContentType={'familyName'}
                 label={'Last name'}
                 value={lastName}
                 onChangeText={setLastName}
                 placeholder={'Doe'}
                 style={{margin: 16}}
      />
      <DateTimeInput birthdate={birthdate}/>
      <DropDownInput gender={gender} setGender={setGender}/>
      <Button mode='contained' style={{margin: 16}}>Next</Button>
    </ThemedView>
  )
}
