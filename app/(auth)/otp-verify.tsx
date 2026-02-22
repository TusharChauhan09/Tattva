import GradientButton from "@/components/GradientButton";
import OTPInput from "@/components/OTPInput";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function OTPVerifyScreen() {
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    console.log("Verifying OTP:", otpCode);
    // Navigate to onboarding after successful verification
    router.replace("/(onboard)");
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      console.log("Resending OTP...");
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Background glow */}
      <View style={styles.bgGlow1} />
      <View style={styles.bgGlow2} />

      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Shield Icon */}
        <View style={styles.iconSection}>
          <View style={styles.shieldOuter}>
            <View style={styles.shieldInner}>
              <Ionicons
                name="shield-checkmark"
                size={52}
                color={Colors.accentBlue}
              />
            </View>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Verify Your Phone</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to{"\n"}
            <Text style={styles.phoneNumber}>+91 98XXXXX90</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpSection}>
          <OTPInput length={6} onComplete={(code) => setOtpCode(code)} />
        </View>

        {/* Timer & Resend */}
        <View style={styles.resendSection}>
          {!canResend ? (
            <Text style={styles.timerText}>
              Resend code in{" "}
              <Text style={styles.timerHighlight}>{formatTimer(timer)}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
              <Text style={styles.resendText}>
                Didn't receive the code?{" "}
                <Text style={styles.resendLink}>Resend</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <View style={styles.buttonSection}>
          <GradientButton
            title="Verify"
            onPress={handleVerify}
            disabled={otpCode.length !== 6}
          />
        </View>
      </View>

      {/* Decorative dots */}
      <View style={styles.dotsPattern}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.decorDot,
              {
                left: Math.random() * width,
                top: Math.random() * 200,
                opacity: Math.random() * 0.3 + 0.05,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
              },
            ]}
          />
        ))}
      </View>
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
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(0, 102, 255, 0.06)",
    top: -60,
    left: -60,
  },
  bgGlow2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 163, 255, 0.04)",
    bottom: 50,
    right: -50,
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: Spacing.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: "center",
    paddingBottom: Spacing.massive,
  },
  iconSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  shieldOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 102, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  shieldInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(0, 102, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.accentBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  phoneNumber: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  otpSection: {
    marginBottom: Spacing.xl,
  },
  resendSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  timerText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  timerHighlight: {
    color: Colors.accentBlue,
    fontWeight: "600",
  },
  resendText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  resendLink: {
    color: Colors.textLink,
    fontWeight: "600",
  },
  buttonSection: {
    marginTop: Spacing.sm,
  },
  dotsPattern: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: "hidden",
  },
  decorDot: {
    position: "absolute",
    borderRadius: 9999,
    backgroundColor: Colors.accentBlue,
  },
});
