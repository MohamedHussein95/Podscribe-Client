import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, List, Switch } from "react-native-paper";
import { Colors } from "../../constants";

const SecurityScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [biometricID, setBiometricID] = useState(false);
  const [faceID, setFaceID] = useState(false);
  const [smsAuthenticator, setSMSAuthenticator] = useState(false);
  const [googleAuthenticator, setGoogleAuthenticator] = useState(false);
  const [deviceManagement, setDeviceManagement] = useState(false);

  const onToggleSwitch = (title) => {
    switch (title) {
      case "Remember me":
        setRememberMe(!rememberMe);
        break;
      case "Biometric ID":
        setBiometricID(!biometricID);
        break;
      case "Face ID":
        setFaceID(!faceID);
        break;
      case "SMS Authenticator":
        setSMSAuthenticator(!smsAuthenticator);
        break;
      case "Google Authenticator":
        setGoogleAuthenticator(!googleAuthenticator);
        break;
      case "Device Management":
        setDeviceManagement(!deviceManagement);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content
          title="Security"
          titleStyle={{ fontFamily: "SemiBold" }}
        />
      </Appbar.Header>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContainer}
      >
        <List.Item
          title="Remember me"
          right={(props) => (
            <Switch
              value={rememberMe}
              onValueChange={() => onToggleSwitch("Remember me")}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Biometric ID"
          right={(props) => (
            <Switch
              value={biometricID}
              onValueChange={() => onToggleSwitch("Biometric ID")}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Face ID"
          right={(props) => (
            <Switch
              value={faceID}
              onValueChange={() => onToggleSwitch("Face ID")}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="SMS Authenticator"
          right={(props) => (
            <Switch
              value={smsAuthenticator}
              onValueChange={() => onToggleSwitch("SMS Authenticator")}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Google Authenticator"
          right={(props) => (
            <Switch
              value={googleAuthenticator}
              onValueChange={() => onToggleSwitch("Google Authenticator")}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Device Management"
          right={(props) => (
            <Switch
              value={deviceManagement}
              onValueChange={() => onToggleSwitch("Device Management")}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
      </ScrollView>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
