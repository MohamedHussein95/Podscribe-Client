import React, { memo, useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip } from "react-native-paper";
import { useDispatch } from "react-redux";

import { Toast } from "react-native-toast-message/lib/src/Toast";
import ModalLoader from "../../components/ModalLoader";
import ProgressBarHeader from "../../components/ProgressBarHeader";
import { Colors } from "../../constants";
import { useGetAllTopicsMutation } from "../../store/topicApiSlice";
import { updateUserInfo } from "../../store/userSlice";
import { DEVICE_WIDTH, wp } from "../../utils/Responsive_layout";

const SelectTopic = ({ navigation }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [topics, setTopics] = useState([]);
  const [getAllTopics] = useGetAllTopicsMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await getAllTopics({}).unwrap();

        setTopics(data);
        setModalVisible(false);
      } catch (error) {
        setModalVisible(false);
        console.log(error);
        Toast.show({
          type: "error",
          text1: `${error?.data?.message || error?.error || error}`,
          position: "top",
        });
      }
    };
    getTopics();
  }, []);

  const handleChipPress = useCallback((chip: any) => {
    setSelectedTopics((prevSelectedTopics) => {
      if (prevSelectedTopics.includes(chip)) {
        return prevSelectedTopics.filter((c) => c !== chip);
      } else {
        return [...prevSelectedTopics, chip];
      }
    });
  }, []);

  const handleNext = () => {
    try {
      dispatch(updateUserInfo({ topics: selectedTopics }));
      navigation.navigate("DiscoverPeopleScreen");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.screen}>
      <ProgressBarHeader num={4} />
      <View style={{ paddingHorizontal: wp(15) }}>
        <Text style={styles.titleText}>Select your topic of interest 💌</Text>
      </View>
      <View style={{ marginBottom: 15, paddingHorizontal: wp(15) }}>
        <Text style={styles.subTitleText}>
          Select topic of interest for better recommendations or you can skip it
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {topics.map((topic) => (
          <Chip
            onPress={() => handleChipPress(topic.id)}
            key={topic.id}
            selected={selectedTopics.includes(topic.id)}
            selectedColor={Colors.white}
            style={{
              backgroundColor: selectedTopics.includes(topic.id)
                ? Colors.primary900
                : Colors.white,
              borderWidth: 2,
              borderColor: Colors.primary900,
              borderRadius: 30,
              margin: 2,
              padding: 5,
            }}
            textStyle={{
              fontFamily: "Bold",
              fontSize: wp(17),
              color: selectedTopics.includes(topic.id)
                ? Colors.white
                : Colors.primary900,
            }}
            compact
            showSelectedOverlay
          >
            {topic.topic}
          </Chip>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: Colors.primary100 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("DiscoverPeopleScreen")}
        >
          <Text style={{ color: Colors.primary900, fontFamily: "Bold" }}>
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor:
              selectedTopics.length <= 0 ? Colors.disabled : Colors.primary900,
          }}
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={selectedTopics.length <= 0}
        >
          <Text style={{ color: Colors.white, fontFamily: "Bold" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <ModalLoader
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export default memo(SelectTopic);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    width: DEVICE_WIDTH,
  },
  titleText: {
    fontSize: wp(34),
    fontFamily: "Bold",
    color: Colors.black,
    textAlign: "left",
    marginBottom: 15,
  },
  subTitleText: {
    fontSize: wp(17),
    fontFamily: "Regular",
    color: Colors.black,
    textAlign: "left",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    alignSelf: "center",
    width: DEVICE_WIDTH,
    backgroundColor: "transparent",
    gap: 15,
  },
  button: {
    width: wp(150),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 10,
  },
});
