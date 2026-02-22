import PageDots from "@/components/PageDots";
import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function StepOneScreen() {
  const handleSkip = () => {
    // Skip all onboarding — go to main app
    console.log("Skip onboarding");
  };

  const handleNext = () => {
    router.push("/(onboard)/step-two");
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Background glows */}
      <View style={styles.bgGlow1} />
      <View style={styles.bgGlow2} />

      {/* Content */}
      <View style={styles.content}>
        {/* Hero Illustration */}
        <View style={styles.heroContainer}>
          <View
            style={[
              styles.heroGlow,
              { backgroundColor: "rgba(0, 102, 255, 0.15)" },
            ]}
          />
          <View
            style={[
              styles.heroGlowSmall,
              { backgroundColor: "rgba(0, 102, 255, 0.15)" },
            ]}
          />

          {/* Orbit ring */}
          <View style={styles.orbitRing}>
            <View style={styles.orbitDot1}>
              <Ionicons
                name="analytics-outline"
                size={22}
                color={Colors.accentBlue}
              />
            </View>
            <View style={styles.orbitDot2}>
              <Ionicons
                name="body-outline"
                size={18}
                color={Colors.lightBlue}
              />
            </View>
          </View>

          {/* Central icon */}
          <View style={styles.centralIconOuter}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.centralIconGradient}
            >
              <Ionicons
                name="barbell-outline"
                size={56}
                color={Colors.textPrimary}
              />
            </LinearGradient>
          </View>

          {/* Floating data cards */}
          <View style={styles.dataCard1}>
            <View style={styles.dataCardInner}>
              <View style={styles.dataCardDot} />
              <View style={styles.dataCardLine} />
            </View>
          </View>
          <View style={styles.dataCard2}>
            <View style={styles.dataCardInner}>
              <View style={styles.dataCardDotSmall} />
              <View style={styles.dataCardLineShort} />
            </View>
          </View>

          {/* Neural network lines */}
          <View style={styles.networkLine1} />
          <View style={styles.networkLine2} />
          <View style={styles.networkLine3} />
        </View>

        {/* Dots — page 1 of 3 */}
        <View style={styles.dotsContainer}>
          <PageDots total={3} current={0} />
        </View>

        {/* Text */}
        <View style={styles.textContent}>
          <Text style={styles.title}>AI-Powered Workouts</Text>
          <Text style={styles.description}>
            Get personalized workout plans crafted by artificial intelligence,
            tailored to your body type, fitness level, and goals.
          </Text>
        </View>
      </View>

      {/* Bottom Navigation — Skip + Next */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.7}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={styles.nextButtonOuter}
        >
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButton}
          >
            <Ionicons
              name="arrow-forward"
              size={24}
              color={Colors.textPrimary}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  bgGlow1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    top: -50,
    left: -80,
  },
  bgGlow2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(0, 163, 255, 0.04)",
    bottom: -50,
    right: -60,
  },
  content: { flex: 1, paddingTop: 80 },
  // Hero
  heroContainer: {
    height: height * 0.4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  heroGlow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  heroGlowSmall: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.6,
  },
  centralIconOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 15,
  },
  centralIconGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  orbitRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.15)",
    borderStyle: "dashed",
  },
  orbitDot1: {
    position: "absolute",
    top: -12,
    left: "50%",
    marginLeft: -12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.2)",
  },
  orbitDot2: {
    position: "absolute",
    bottom: 20,
    right: -6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 163, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 163, 255, 0.15)",
  },
  dataCard1: {
    position: "absolute",
    top: 30,
    right: 30,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  dataCard2: {
    position: "absolute",
    bottom: 40,
    left: 25,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm - 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  dataCardInner: { flexDirection: "row", alignItems: "center", gap: 6 },
  dataCardDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentBlue,
  },
  dataCardLine: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0, 163, 255, 0.3)",
  },
  dataCardDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryBlue,
  },
  dataCardLineShort: {
    width: 28,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(0, 102, 255, 0.25)",
  },
  networkLine1: {
    position: "absolute",
    width: 1,
    height: 60,
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    top: 10,
    left: 60,
    transform: [{ rotate: "30deg" }],
  },
  networkLine2: {
    position: "absolute",
    width: 1,
    height: 45,
    backgroundColor: "rgba(0, 163, 255, 0.08)",
    bottom: 30,
    right: 50,
    transform: [{ rotate: "-20deg" }],
  },
  networkLine3: {
    position: "absolute",
    width: 1,
    height: 35,
    backgroundColor: "rgba(0, 102, 255, 0.06)",
    top: 50,
    right: 80,
    transform: [{ rotate: "60deg" }],
  },
  // Dots
  dotsContainer: { marginBottom: Spacing.xxl },
  // Text
  textContent: { paddingHorizontal: Spacing.xxl, alignItems: "center" },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.base,
  },
  description: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 28,
  },
  // Bottom nav
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl + 10,
    paddingTop: Spacing.lg,
  },
  skipButton: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.base },
  skipText: { ...Typography.label, color: Colors.textTertiary },
  nextButtonOuter: {
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
