import Divider from "@/components/Divider";
import GlassInput from "@/components/GlassInput";
import GoogleButton from "@/components/GoogleButton";
import GradientButton from "@/components/GradientButton";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { useSignIn, useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Handle any pending auth sessions
WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Preload browser on Android for faster OAuth
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setError("");
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "fitness",
        path: "/(auth)/sign-in",
      });

      const {
        createdSessionId,
        setActive: setActiveSession,
        signIn: ssoSignIn,
        signUp: ssoSignUp,
      } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl,
      });

      if (createdSessionId) {
        await setActiveSession!({ session: createdSessionId });
        router.replace("/");
        return;
      }

      if (ssoSignUp?.status === "complete" && ssoSignUp.createdSessionId) {
        await setActiveSession!({ session: ssoSignUp.createdSessionId });
        router.replace("/");
        return;
      }

      if (ssoSignUp?.status === "missing_requirements") {
        try {
          const result = await ssoSignUp.update({});
          if (result.status === "complete" && result.createdSessionId) {
            await setActiveSession!({ session: result.createdSessionId });
            router.replace("/");
            return;
          }
        } catch (updateErr) {
          console.log("Could not auto-complete sign-up:", updateErr);
        }

        const fields = ssoSignUp.missingFields?.join(", ") || "unknown fields";
        setError(`Google sign-in requires additional info: ${fields}.`);
        return;
      }

      if (ssoSignIn?.status === "complete" && ssoSignIn.createdSessionId) {
        await setActiveSession!({ session: ssoSignIn.createdSessionId });
        router.replace("/");
        return;
      }

      setError("Could not complete Google sign-in. Please try again.");
    } catch (err: any) {
      console.error("Google SSO error:", JSON.stringify(err, null, 2));
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Google sign in failed. Please try again.";
      setError(message);
    }
  }, [startSSOFlow]);

  const handleSendOTP = useCallback(async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      // Start sign-in with email
      const { supportedFirstFactors } = await signIn.create({
        identifier: email,
      });

      // Find the email_code factor
      const emailFactor = supportedFirstFactors?.find(
        (f: any) => f.strategy === "email_code",
      );

      if (emailFactor && "emailAddressId" in emailFactor) {
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: emailFactor.emailAddressId,
        });

        router.push({
          pathname: "/(auth)/otp-verify",
          params: { email, mode: "sign-in" },
        });
      } else {
        setError("Email sign-in is not available. Please sign up first.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Could not send verification code. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signIn, email]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.bgGlow1} />
      <View style={styles.bgGlow2} />
      <View style={styles.bgGlow3} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoWrapper}>
              <Text style={styles.logoText}>Fit</Text>
              <Text style={styles.logoAccent}>AI</Text>
            </View>
            <Text style={styles.tagline}>Your AI-Powered Fitness Journey</Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            <Text style={styles.formSubtitle}>
              Sign in to continue your fitness journey
            </Text>

            <View style={styles.spacerMd} />

            <GoogleButton onPress={handleGoogleSignIn} />

            <Divider />

            {/* Email */}
            <GlassInput
              icon="mail-outline"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {error !== "" && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.buttonWrapper}>
              <GradientButton
                title="Send OTP"
                onPress={handleSendOTP}
                loading={loading}
                disabled={!email}
              />
            </View>

            <View style={styles.toggleWrapper}>
              <Text style={styles.toggleText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-up")}
                activeOpacity={0.7}
              >
                <Text style={styles.toggleLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bgGlow1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 102, 255, 0.08)",
    top: -80,
    right: -80,
  },
  bgGlow2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 163, 255, 0.05)",
    bottom: 100,
    left: -60,
  },
  bgGlow3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(0, 102, 255, 0.04)",
    top: "40%",
    right: -30,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: 90,
    paddingBottom: Spacing.xxxl,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: Spacing.sm,
  },
  logoText: {
    ...Typography.logo,
    color: Colors.textPrimary,
  },
  logoAccent: {
    ...Typography.logo,
    color: Colors.accentBlue,
    textShadowColor: "rgba(0, 163, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  tagline: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  formSection: {
    gap: Spacing.base,
  },
  formTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  formSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  spacerMd: {
    height: Spacing.sm,
  },
  errorText: {
    ...Typography.bodySmall,
    color: Colors.error,
    textAlign: "center",
  },
  buttonWrapper: {
    marginTop: Spacing.sm,
  },
  toggleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
  toggleText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  toggleLink: {
    ...Typography.label,
    color: Colors.textLink,
  },
});
