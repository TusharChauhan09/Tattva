import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GoogleButtonProps {
  onPress: () => void;
}

function GoogleIcon() {
  return (
    <View style={styles.iconWrapper}>
      <Text style={styles.googleG}>G</Text>
    </View>
  );
}

export default function GoogleButton({ onPress }: GoogleButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <GoogleIcon />
      <Text style={styles.text}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.googleBg,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
  },
  googleG: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  text: {
    ...Typography.label,
    color: Colors.googleText,
  },
});
