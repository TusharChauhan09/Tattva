import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DividerProps {
  text?: string;
}

export default function Divider({ text = "OR" }: DividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
    marginVertical: Spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.glassBorder,
  },
  text: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
