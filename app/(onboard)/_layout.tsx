import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function OnboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" options={{ animation: "fade" }} />
      <Stack.Screen name="step-one" options={{ animation: "fade" }} />
      <Stack.Screen
        name="step-two"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="step-three"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
