import {Button} from "react-native-paper";
import {Link} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {LoginFormStyles} from "@/components/login/LoginForm.styles";

export default function RegisterLink() {
  return (
    <ThemedView style={LoginFormStyles.container}>
      <Button mode="text">
        Don’t have an account? <Link href='/register' style={LoginFormStyles.textCTA}>Register Now</Link>
      </Button>
    </ThemedView>
  );
}
