import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants";
import { wp } from "../utils/Responsive_layout";

const PrimaryButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary900,
    justifyContent: "center",
    alignItems: "center",
    width: wp(150),
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary900,
  },
  title: {
    fontFamily: "SemiBold",
    color: Colors.white,
  },
});
