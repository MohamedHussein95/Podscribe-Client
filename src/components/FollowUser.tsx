import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { Colors } from "../constants";
import { hp, wp } from "../utils/Responsive_layout";

const FollowUser = ({ item, onPress, followedPeople }) => {
  return (
    <View style={styles.container}>
      {item.avatar ? (
        <Avatar.Image source={{ uri: item.avatar }} size={60} />
      ) : (
        <Image
          source={require("../../assets/images/logo_pl.png")}
          style={{
            width: wp(60),
            height: hp(60),
            borderRadius: 100,
            backgroundColor: Colors.greyScale300,
          }}
          resizeMode="cover"
        />
      )}

      <View style={{ flex: 1, gap: 5 }}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.userName}>{item.userName || "error"}</Text>
      </View>
      <TouchableOpacity onPress={() => onPress(item.id)} activeOpacity={0.8}>
        <View
          style={{
            ...styles.follow,
            backgroundColor: followedPeople.includes(item.id)
              ? Colors.white
              : Colors.primary900,
          }}
        >
          <Text
            style={{
              color: followedPeople.includes(item.id)
                ? Colors.primary900
                : Colors.white,
              fontFamily: "Bold",
            }}
          >
            {followedPeople.includes(item.id) ? "following" : "follow"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(FollowUser);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.primary900,
    width: wp(300),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 10,
  },
  fullName: {
    fontSize: wp(17),
    fontFamily: "Bold",
    color: Colors.black,
    textAlign: "left",
  },
  userName: {
    fontSize: wp(14),
    fontFamily: "Medium",
    color: Colors.greyScale500,
    textAlign: "left",
  },
  follow: {
    backgroundColor: Colors.primary900,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp(100),
    borderWidth: 2,
    borderColor: Colors.primary900,
  },
});
