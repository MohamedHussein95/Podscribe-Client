import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "../../constants";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { wp } from "../../utils/Responsive_layout";
import { Divider } from "react-native-paper";
import SocialLinkContainer from "../../components/SocialLinkContainer";

const AboutScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { about, MoreInfo, socialMedia } = userInfo;
  const [numToShow, setNumToShow] = useState(3);
  const [showMore, setShowMore] = useState(false);
  console.log(socialMedia?.whatsApp);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Description</Text>
          <Text
            style={{ ...styles.content, color: Colors.greyScale700 }}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {about ||
              `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
          </Text>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.container}>
          <Text style={styles.title}>Social Media</Text>

          <SocialLinkContainer
            url={socialMedia?.whatsApp}
            title="WhatsApp"
            icon="whatsapp"
          />
          <SocialLinkContainer
            url={socialMedia?.facebook}
            title="Facebook"
            icon="facebook"
          />
          <SocialLinkContainer
            url={socialMedia?.twitter}
            title="Twitter"
            icon="twitter"
          />
          <SocialLinkContainer
            url={socialMedia?.instagram}
            title="Instagram"
            icon="instagram"
          />
          <SocialLinkContainer
            url={socialMedia?.youtube}
            title="Youtube"
            icon="youtube"
          />
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.container}>
          <Text style={styles.title}>More Info</Text>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons
              name="web"
              size={25}
              color={Colors.primary900}
            />
            <Text style={styles.content}>
              {MoreInfo?.website || "www.exampledomain.com"}
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={25}
              color={Colors.greyScale700}
            />
            <Text style={{ ...styles.content, color: Colors.greyScale700 }}>
              {MoreInfo?.location || "New York,United States"}
            </Text>
          </View>
          <View style={styles.button}>
            <MaterialCommunityIcons
              name="clock-time-six-outline"
              size={25}
              color={Colors.greyScale700}
            />
            <Text style={{ ...styles.content, color: Colors.greyScale700 }}>
              {" "}
              joined since{" "}
              {moment(new Date(MoreInfo?.joined)).format("YYYY-MM-DD ")}
            </Text>
          </View>
          <View style={styles.button}>
            <MaterialCommunityIcons
              name="chart-box-outline"
              size={25}
              color={Colors.greyScale700}
            />
            <Text style={{ ...styles.content, color: Colors.greyScale700 }}>
              {MoreInfo?.totalReader || "2,368,756"} readers
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: { gap: 10 },
  title: {
    fontFamily: "Bold",
    fontSize: wp(17),
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
