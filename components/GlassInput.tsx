import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface GlassInputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  prefix?: string;
}

export default function GlassInput({
  icon,
  isPassword = false,
  prefix,
  style,
  ...rest
}: GlassInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[styles.container, isFocused && styles.containerFocused, style]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={isFocused ? Colors.accentBlue : Colors.textTertiary}
          style={styles.icon}
        />
      )}
      {prefix && <Text style={styles.prefix}>{prefix}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.textTertiary}
        secureTextEntry={isPassword && !showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectionColor={Colors.accentBlue}
        {...rest}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={Colors.textTertiary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  containerFocused: {
    borderColor: Colors.inputBorderFocus,
    backgroundColor: "rgba(0, 102, 255, 0.04)",
  },
  icon: {
    width: 24,
    textAlign: "center",
  },
  prefix: {
    ...Typography.body,
    color: Colors.textSecondary,
    paddingRight: Spacing.xs,
    borderRightWidth: 1,
    borderRightColor: Colors.glassBorder,
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    padding: 0,
  },
});
