import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Appbar, Avatar, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import TabViewExample from "../../components/TopTap";
import { Colors } from "../../constants";
import { clearCredentials } from "../../store/authSlice";
import { hp, wp } from "../../utils/Responsive_layout";
import { signOutUser } from "../../utils/authActions";
import { SceneMap } from "react-native-tab-view";
import MyArticlesScreen from "../Articles/MyArticlesScreen";
import AboutScreen from "./AboutScreen";

const renderScene = SceneMap({
  first: MyArticlesScreen,
  second: AboutScreen,
});

const UserProfileScreen = () => {
  const { authInfo } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await signOutUser();
      dispatch(clearCredentials());
    } catch (error) {
      console.log(error);
    }
  };
  const handlePress = async (screen, sFor) => {
    navigation.navigate(screen, { searchFor: sFor });
  };
  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: 5,
          }}
        >
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: wp(30), height: hp(30) }}
          />
          <Appbar.Content title="Profile" titleStyle={{ fontFamily: "Bold" }} />
        </View>
        <Appbar.Action icon={"share-outline"} size={30} />
        <Appbar.Action
          icon={"cog-outline"}
          size={30}
          onPress={() => navigation.navigate("SettingsScreen")}
        />
      </Appbar.Header>
      <View style={styles.bodyContainer}>
        <View style={styles.container}>
          <Avatar.Image source={{ uri: authInfo?.photoURL }} size={60} />
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={styles.fullName}>
              {authInfo?.displayName || "Guest User"}
            </Text>
            <Text style={styles.userName}>{userInfo?.userName || "@user"}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("EditProfileScreen")}
          >
            <View style={styles.edit}>
              <Text style={{ color: Colors.primary900, fontFamily: "Bold" }}>
                <MaterialCommunityIcons
                  name="pencil"
                  color={Colors.primary900}
                  size={15}
                />{" "}
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={styles.metaContainer}>
          <View style={styles.meta}>
            <Text style={{ fontFamily: "SemiBold", fontSize: wp(24) }}>
              {userInfo?.articles?.published?.filter(Boolean)?.length || "0"}
            </Text>
            <Text>articles</Text>
          </View>
          <Divider style={{ width: wp(0.8), height: "100%" }} />
          <TouchableOpacity
            onPress={() => handlePress("FollwersScreen", "following")}
          >
            <View style={styles.meta}>
              <Text style={{ fontFamily: "SemiBold", fontSize: wp(24) }}>
                {userInfo.following?.filter(Boolean)?.length || "0"}
              </Text>
              <Text>following</Text>
            </View>
          </TouchableOpacity>

          <Divider style={{ width: wp(0.8), height: "100%" }} />
          <TouchableOpacity
            onPress={() => handlePress("FollwersScreen", "followers")}
          >
            <View style={styles.meta}>
              <Text style={{ fontFamily: "SemiBold", fontSize: wp(24) }}>
                {userInfo.followers?.filter(Boolean)?.length || "0"}
              </Text>
              <Text>followers</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Divider />

        <TabViewExample
          scene={renderScene}
          firstScreen={"Articles"}
          secondScreen={"About"}
          tabHeader={true}
          thirdScreen={undefined}
          fourthScreen={undefined}
          fifthScreen={undefined}
        />
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  container: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  bodyContainer: { marginHorizontal: 15, flex: 1 },
  title: {
    fontFamily: "Bold",
    fontSize: wp(28),
    color: Colors.black,
    textAlign: "left",
    letterSpacing: 0.5,
  },
  fullName: {
    fontSize: wp(18),
    fontFamily: "Bold",
    color: Colors.black,
    textAlign: "left",
  },
  userName: {
    fontSize: wp(14),
    fontFamily: "Medium",
    color: Colors.greyScale700,
    textAlign: "left",
  },
  edit: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp(90),
    borderWidth: 2,
    borderColor: Colors.primary900,
  },
  meta: {
    alignItems: "center",
    gap: 5,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

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
