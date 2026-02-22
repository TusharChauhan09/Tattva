import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { clearOnboarded } from "@/lib/storage";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { signOut, isSignedIn, isLoaded } = useAuth();

  // Guard: if not signed in, redirect to sign-in
  if (isLoaded && !isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>Fit</Text>
          <Text style={styles.logoAccent}>AI</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={async () => {
            await clearOnboarded();
            signOut();
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>Tattva FitAI</Text>
          <View style={styles.divider} />
          <Text style={styles.statusText}>
            Everything is ready for your transformation.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  logoAccent: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.accentBlue,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xxl,
  },
  welcomeCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 24,
    padding: Spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  welcomeText: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  brandText: {
    ...Typography.h1,
    color: Colors.textPrimary,
    fontSize: 32,
    marginBottom: Spacing.base,
  },
  divider: {
    width: 40,
    height: 4,
    backgroundColor: Colors.accentBlue,
    borderRadius: 2,
    marginBottom: Spacing.base,
  },
  statusText: {
    ...Typography.body,
    color: Colors.textTertiary,
    textAlign: "center",
    lineHeight: 24,
  },
});
