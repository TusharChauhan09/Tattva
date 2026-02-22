import GradientButton from "@/components/GradientButton";
import OTPInput from "@/components/OTPInput";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function OTPVerifyScreen() {
  const {
    signUp,
    setActive: setSignUpActive,
    isLoaded: isSignUpLoaded,
  } = useSignUp();
  const {
    signIn,
    setActive: setSignInActive,
    isLoaded: isSignInLoaded,
  } = useSignIn();
  const { email, mode } = useLocalSearchParams<{
    email: string;
    mode: string;
  }>();

  const isSignIn = mode === "sign-in";

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleVerify = useCallback(async () => {
    if (isSignIn && !isSignInLoaded) return;
    if (!isSignIn && !isSignUpLoaded) return;

    setLoading(true);
    setError("");

    try {
      if (isSignIn) {
        if (!signIn) return;
        // Sign-in: verify with first factor (email code)
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: otpCode,
        });

        if (result.status === "complete") {
          await setSignInActive({ session: result.createdSessionId });
          router.replace("/");
        } else {
          console.error(JSON.stringify(result, null, 2));
          setError("Verification could not be completed. Please try again.");
        }
      } else {
        if (!signUp) return;
        // Sign-up: verify email address
        const result = await signUp.attemptEmailAddressVerification({
          code: otpCode,
        });

        if (result.status === "complete") {
          await setSignUpActive({ session: result.createdSessionId });
          router.replace("/");
        } else {
          console.error(JSON.stringify(result, null, 2));
          setError("Verification could not be completed. Please try again.");
        }
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid verification code. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [
    isSignIn,
    isSignInLoaded,
    isSignUpLoaded,
    signIn,
    signUp,
    setSignInActive,
    setSignUpActive,
    otpCode,
  ]);

  const handleResend = useCallback(async () => {
    if (!canResend) return;

    try {
      if (isSignIn) {
        if (!isSignInLoaded || !signIn) return;
        // Re-send sign-in email OTP
        const { supportedFirstFactors } = await signIn.create({
          identifier: email,
        });
        const emailFactor = supportedFirstFactors?.find(
          (f: any) => f.strategy === "email_code",
        );
        if (emailFactor && "emailAddressId" in emailFactor) {
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId: emailFactor.emailAddressId,
          });
        }
      } else {
        if (!isSignUpLoaded || !signUp) return;
        // Re-send sign-up email OTP
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
      }
      setTimer(30);
      setCanResend(false);
      setError("");
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message || "Could not resend code. Please try again.";
      setError(message);
    }
  }, [
    canResend,
    isSignIn,
    isSignInLoaded,
    isSignUpLoaded,
    signIn,
    signUp,
    email,
  ]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Mask the email for display (e.g. t***r@gmail.com)
  const maskedEmail = email
    ? email.replace(/^(.)(.*)(@.*)$/, (_, first, middle, domain) => {
        return `${first}${"*".repeat(Math.min(middle.length, 4))}${domain}`;
      })
    : "your email";

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

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
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to{"\n"}
            <Text style={styles.emailText}>{maskedEmail}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpSection}>
          <OTPInput length={6} onComplete={(code) => setOtpCode(code)} />
        </View>

        {/* Error message */}
        {error !== "" && <Text style={styles.errorText}>{error}</Text>}

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
            loading={loading}
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
  emailText: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  otpSection: {
    marginBottom: Spacing.xl,
  },
  errorText: {
    ...Typography.bodySmall,
    color: Colors.error,
    textAlign: "center",
    marginBottom: Spacing.sm,
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
