import React, { memo, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { Colors } from "../constants";
import { hp, wp } from "../utils/Responsive_layout";
import { IconType } from "../types";

interface InputProps {
  IconPack?: IconType;
  icon?: string;
  color?: string;
  containerStyle?: ViewStyle;
  touched?: boolean;
  errors?: string;
  onPress?: () => void;
  size?: number;
  style?: TextStyle;
  placeholder?: string;
}

const Input = ({
  IconPack,
  icon,
  color = Colors.primary900,
  containerStyle,
  touched,
  errors,
  onPress,
  ...props
}: InputProps) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput {...props} style={styles.input} />
      {IconPack && (
        <IconPack
          name={icon}
          size={props.size || wp(24)}
          color={color}
          onPress={onPress}
          style={styles.icon}
        />
      )}
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(45),
    borderBottomColor: Colors.primary900,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontFamily: "Bold",
    fontSize: wp(18),
  },
  icon: {},
});
