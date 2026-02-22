import { Colors } from "@/constants/Colors";
import { getOnboarded } from "@/lib/storage";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const [checking, setChecking] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Reset state when auth changes so we always re-check
    setChecking(true);
    setHasOnboarded(null);

    if (isSignedIn) {
      getOnboarded().then((val) => {
        setHasOnboarded(val);
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || checking || (isSignedIn && hasOnboarded === null)) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="light" />
        <ActivityIndicator size="large" color={Colors.accentBlue} />
      </View>
    );
  }

  // Not signed in → auth screen
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Signed in + already onboarded → home
  if (hasOnboarded) {
    return <Redirect href="/home" />;
  }

  // Signed in + NOT onboarded → onboarding
  return <Redirect href="/(onboard)/step-one" />;
}
