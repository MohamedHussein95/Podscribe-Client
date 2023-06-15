import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { Colors } from "../../constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { hp, wp } from "../../utils/Responsive_layout";
import TabViewExample from "../../components/TopTap";
import { SceneMap } from "react-native-tab-view";
import DraftsScreen from "./DraftsScreen";
import PublishedArticlesScreen from "./PublishedArticlesScreen";
import FAQScreen from "./FAQScreen";
import ContactUsScreen from "./ContactUsScreen";

const renderScene = SceneMap({
  first: FAQScreen,
  second: ContactUsScreen,
});

const ArticlesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <Appbar.Header
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 0,
        }}
      >
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content
          title={"Help Center"}
          color={Colors.black}
          style={{ marginHorizontal: 10 }}
          titleStyle={{ fontFamily: "Bold", fontSize: 18 }}
        />
      </Appbar.Header>

      <TabViewExample
        scene={renderScene}
        firstScreen={"FAQ"}
        secondScreen={"Contact Us"}
        tabHeader={true}
        thirdScreen={undefined}
        fourthScreen={undefined}
        fifthScreen={undefined}
      />
    </View>
  );
};

export default ArticlesScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.white },
});
