import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants";
import { Appbar, Avatar, Divider, Switch } from "react-native-paper";
import { List } from "react-native-paper";
import { wp } from "../../utils/Responsive_layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const [recommendS, setRecommendS] = useState(false);
  const [following, setFollowing] = useState(false);
  const [commentsS, setCommentsS] = useState(false);
  const [taggedS, setTaggedS] = useState(false);
  const [likedS, setLikedS] = useState(false);
  const [followedS, setFollowedS] = useState(false);
  const [activityS, setActivityS] = useState(false);
  const [appS, setAppS] = useState(false);
  const [tipsS, setTipsS] = useState(false);
  const [surveyS, setSurveyS] = useState(false);

  const onRecommendToggle = () => {
    setRecommendS(!recommendS);
  };

  const onFollowingToggle = () => {
    setFollowing(!following);
  };

  const onCommentsToggle = () => {
    setCommentsS(!commentsS);
  };

  const onTaggedToggle = () => {
    setTaggedS(!taggedS);
  };

  const onLikedToggle = () => {
    setLikedS(!likedS);
  };

  const onFollowedToggle = () => {
    setFollowedS(!followedS);
  };

  const onActivityToggle = () => {
    setActivityS(!activityS);
  };

  const onAppToggle = () => {
    setAppS(!appS);
  };

  const onTipsToggle = () => {
    setTipsS(!tipsS);
  };

  const onSurveyToggle = () => {
    setSurveyS(!surveyS);
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content
          title="Notification"
          titleStyle={{ fontFamily: "SemiBold" }}
        />
      </Appbar.Header>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContainer}
      >
        <List.Item
          title="Notify me when..."
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="There is new Recommendation"
          right={(props) => (
            <Switch
              value={recommendS}
              onValueChange={onRecommendToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Someone is following me"
          right={(props) => (
            <Switch
              value={following}
              onValueChange={onFollowingToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="There are Comments on my Article"
          right={(props) => (
            <Switch
              value={commentsS}
              onValueChange={onCommentsToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Someone Tagged Me in a Comment"
          right={(props) => (
            <Switch
              value={taggedS}
              onValueChange={onTaggedToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Someone Liked My Comment"
          right={(props) => (
            <Switch
              value={likedS}
              onValueChange={onLikedToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Someone I Follow Published a New Article"
          right={(props) => (
            <Switch
              value={followedS}
              onValueChange={onFollowedToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="There is Activity on My Account"
          right={(props) => (
            <Switch
              value={activityS}
              onValueChange={onActivityToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <View style={{ marginVertical: 5, padding: 5 }}>
          <Divider />
        </View>
        <List.Item
          title="System"
          titleStyle={{ fontFamily: "Bold", fontSize: wp(20) }}
        />
        <List.Item
          title="App System"
          right={(props) => (
            <Switch
              value={appS}
              onValueChange={onAppToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Guidance & Tips"
          right={(props) => (
            <Switch
              value={tipsS}
              onValueChange={onTipsToggle}
              color={Colors.primary900}
            />
          )}
          titleStyle={{ fontFamily: "SemiBold" }}
          style={{ paddingVertical: 0 }}
        />
        <List.Item
          title="Participate in a Survey"
          right={(props) => (
            <Switch
              value={surveyS}
              onValueChange={onSurveyToggle}
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

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
