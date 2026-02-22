import Divider from "@/components/Divider";
import GlassInput from "@/components/GlassInput";
import GoogleButton from "@/components/GoogleButton";
import GradientButton from "@/components/GradientButton";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up");
  };

  const handleCreateAccount = () => {
    // Navigate to OTP verification
    router.push("/(auth)/otp-verify");
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Decorative background glows */}
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
            <Text style={styles.formTitle}>Create Account</Text>
            <Text style={styles.formSubtitle}>
              Start your AI-powered fitness transformation
            </Text>

            <View style={styles.spacerMd} />

            {/* Google Sign Up */}
            <GoogleButton onPress={handleGoogleSignUp} />

            <Divider />

            {/* Input Fields */}
            <GlassInput
              icon="person-outline"
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <GlassInput
              icon="mail-outline"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <GlassInput
              icon="lock-closed-outline"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <GlassInput
              icon="call-outline"
              prefix="+91"
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            {/* Create Account Button */}
            <View style={styles.buttonWrapper}>
              <GradientButton
                title="Create Account"
                onPress={handleCreateAccount}
              />
            </View>

            {/* Toggle to Sign In */}
            <View style={styles.toggleWrapper}>
              <Text style={styles.toggleText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Text style={styles.toggleLink}>Log In</Text>
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
    paddingTop: 80,
    paddingBottom: Spacing.xxxl,
  },
  // Logo
  logoSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
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
  // Form
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
    height: Spacing.xs,
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
