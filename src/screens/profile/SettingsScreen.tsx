import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants";
import { Appbar, Avatar, Divider, Switch } from "react-native-paper";
import { List } from "react-native-paper";
import { wp } from "../../utils/Responsive_layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Settings" titleStyle={{ fontFamily: "Bold" }} />
      </Appbar.Header>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContainer}
      >
        <List.Item
          title="Personal Info"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"account"}
              color={Colors.error}
              style={{ backgroundColor: Colors.transparentRed }}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{ fontFamily: "Bold" }}
          onPress={() => navigation.navigate("PersonalInfoScreen")}
        />
        <List.Item
          title="Notification"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"bell"}
              color={Colors.orange}
              style={{ backgroundColor: Colors.transparentOrange }}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{ fontFamily: "Bold" }}
          onPress={() => navigation.navigate("NotificationSettingsScreen")}
        />
        <List.Item
          title="Security"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"security"}
              color={Colors.success}
              style={{ backgroundColor: Colors.transparentGreen }}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{ fontFamily: "Bold" }}
          onPress={() => navigation.navigate("SecurityScreen")}
        />
        <List.Item
          title="Dark Mode"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"eye"}
              color={Colors.purple}
              style={{ backgroundColor: Colors.transparentPurple }}
            />
          )}
          right={(props) => (
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color={Colors.purple}
            />
          )}
          titleStyle={{ fontFamily: "Bold" }}
        />
        <View style={{ marginVertical: 5, padding: 5 }}>
          <Divider />
        </View>
        <List.Item
          title="Invite Friends"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"account-group"}
              color={Colors.orange}
              style={{ backgroundColor: Colors.transparentOrange }}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{ fontFamily: "Bold" }}
        />
        <List.Item
          title="Help Center"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"help"}
              color={Colors.success}
              style={{ backgroundColor: Colors.transparentGreen }}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{ fontFamily: "Bold" }}
          onPress={() => navigation.navigate("HelpCenterScreen")}
        />
        <List.Item
          title="About Podscribe"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"information"}
              color={Colors.primary900}
              style={{ backgroundColor: Colors.transparentBrown }}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{ fontFamily: "Bold" }}
        />
        <List.Item
          title="Logout"
          left={(props) => (
            <Avatar.Icon
              {...props}
              size={40}
              icon={"logout"}
              color={Colors.error}
              style={{ backgroundColor: Colors.transparentRed }}
            />
          )}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{ fontFamily: "Bold" }}
        />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodyContainer: { paddingHorizontal: wp(15) },
});
