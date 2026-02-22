import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="sign-in" options={{ animation: "fade" }} />
      <Stack.Screen
        name="sign-up"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="otp-verify"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
