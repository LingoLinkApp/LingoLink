import {ThemedView} from "@/components/ThemedView";
import React, {useState} from "react";
import {Button, Text, TextInput} from "react-native-paper";
import {Dropdown} from "react-native-paper-dropdown";
import {DatePickerInput} from "react-native-paper-dates";
import {useMutation} from "@tanstack/react-query";
import {StorageService} from "@/src/services/storage.service";
import {router} from "expo-router";
import {ProfileService} from "@/src/services/profile.service";
import {AuthService} from "@/src/services/auth.service";
import {formatDate} from "@/src/utils/dates";
import {ProfileCreationEnum} from "@/src/constants/profileCreationEnum";
import {genders} from "@/src/constants/genders";
import {RoutesEnum} from "@/src/constants/routesEnum";

export default function CreateProfileScreen() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date | undefined>(new Date());
  const [gender, setGender] = useState<string | null | undefined>('male');

  const createProfileMutation = useMutation({
    mutationFn: ProfileService.creationUserProfile,
    onSuccess: async (data) => {
      try {
        if (data.success === false) {
          console.error(data);
          throw new Error("An error occurred while creating the create. Please try again.");
        }

        await StorageService.storeToLocalStorage('profile', data.data);
        await StorageService.storeToLocalStorage('create-creation-step', ProfileCreationEnum.STEP_ONE);

        router.push(RoutesEnum.CREATE_PROFILE_STEP_TWO_ROUTE);
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      console.log({context: 'CreateProfileScreen | onError', error});
    },
  });

  const handleProfileCreation = async () => {
    const data: any = {
      firstName,
      lastName,
      birthdate: formatDate(birthdate),
      gender
    }

    createProfileMutation.mutate(data);
  }

  const logout = async () => {
    await AuthService.logout();
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
      <ThemedView style={{justifyContent: 'center', flex: 1, alignItems: 'center', margin: 16, marginTop: 32}}>
        <DatePickerInput
          locale="en"
          label="Birthdate"
          value={birthdate}
          onChange={(d) => setBirthdate(d)}
          inputMode="start"
          presentationStyle={"pageSheet"}

        />
      </ThemedView>
      <ThemedView style={{margin: 16, marginTop: 64}}>
        <Dropdown
          label="Gender"
          placeholder="Select Gender"
          options={genders}
          value={gender!}
          onSelect={setGender}
        />
      </ThemedView>
      <Button mode='contained' onPress={handleProfileCreation} style={{margin: 16}}>Next</Button>
      <Button mode='contained' onPress={logout} style={{margin: 16}}>Logout</Button>
    </ThemedView>
  )
}
