import { Colors } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

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
