import { Colors } from "@/constants/Colors";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env");
}

function LoadingScreen() {
  return (
    <View style={loadingStyles.container}>
      <StatusBar style="light" />
      <View style={loadingStyles.logoWrapper}>
        <Text style={loadingStyles.logoText}>Fit</Text>
        <Text style={loadingStyles.logoAccent}>AI</Text>
      </View>
      <ActivityIndicator size="large" color={Colors.accentBlue} />
    </View>
  );
}

function RootNavigator() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
        <Stack.Screen
          name="(onboard)"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen name="home" options={{ animation: "fade" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  logoText: {
    fontSize: 42,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  logoAccent: {
    fontSize: 42,
    fontWeight: "800",
    color: Colors.accentBlue,
    textShadowColor: "rgba(0, 163, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});
