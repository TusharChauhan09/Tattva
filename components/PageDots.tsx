import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import React from "react";
import { StyleSheet, View } from "react-native";

interface PageDotsProps {
  total: number;
  current: number;
}

export default function PageDots({ total, current }: PageDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  dot: {
    borderRadius: 9999,
  },
  dotActive: {
    width: 28,
    height: 8,
    backgroundColor: Colors.dotActive,
    borderRadius: 4,
  },
  dotInactive: {
    width: 8,
    height: 8,
    backgroundColor: Colors.dotInactive,
    borderRadius: 4,
  },
});
