import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants";
import { wp } from "../utils/Responsive_layout";
import { Alert } from "react-native";

const SocialLinkContainer = ({
  url,
  title,
  icon,
}: {
  url: string;
  title: string;
  icon: string;
}) => {
  const handlePress = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(url)}>
      <MaterialCommunityIcons name={icon} size={25} color={Colors.primary900} />
      <Text style={styles.content}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SocialLinkContainer;

const styles = StyleSheet.create({
  content: {
    fontFamily: "Regular",
    fontSize: wp(15),
    letterSpacing: 0.5,
    color: Colors.primary900,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
