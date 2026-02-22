import { Colors } from "@/constants/Colors";
import { BorderRadius, Spacing } from "@/constants/Spacing";
import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export default function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const refs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    // Take only the last character typed
    const digit = text.slice(-1);
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    const complete = newOtp.join("");
    if (complete.length === length && !newOtp.includes("")) {
      onComplete(complete);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (refs.current[index] = ref)}
          style={[
            styles.box,
            focusedIndex === index && styles.boxFocused,
            otp[index] !== "" && styles.boxFilled,
          ]}
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          keyboardType="number-pad"
          maxLength={1}
          selectionColor={Colors.accentBlue}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm + 2,
  },
  box: {
    width: 50,
    height: 58,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.inputBg,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  boxFocused: {
    borderColor: Colors.primaryBlue,
    backgroundColor: "rgba(0, 102, 255, 0.06)",
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  boxFilled: {
    borderColor: Colors.accentBlue,
    backgroundColor: "rgba(0, 163, 255, 0.06)",
  },
});
