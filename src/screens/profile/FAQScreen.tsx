import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors, FAQS, FAQTopics } from "../../constants";
import { wp } from "../../utils/Responsive_layout";
import Input from "../../components/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { List } from "react-native-paper";

const FAQScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [focused, setFocused] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState(FAQS);

  const handleAccordionPress = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const filterFaqs = (query) => {
    if (query) {
      const filtered = FAQS.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(FAQS);
    }
  };

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
    setExpandedIds([]);
    filterFaqs("");
  };

  const renderTopicItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.topicButton,
        selectedTopic === item.id && styles.selectedTopicButton,
      ]}
      onPress={() => handleTopicSelection(item.id)}
    >
      <Text
        style={[
          styles.topicButtonText,
          selectedTopic === item.id && styles.selectedTopicButtonText,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderFaqItem = ({ item }) => (
    <List.Accordion
      title={item.question}
      expanded={expandedIds.includes(item.id)}
      onPress={() => handleAccordionPress(item.id)}
      key={item.id}
      titleStyle={{
        fontFamily: "Bold",
        color: Colors.primary900,
      }}
      titleNumberOfLines={0}
      style={{
        elevation: 1,
        marginVertical: 4,
      }}
      right={(props) => (
        <List.Icon {...props} icon={"chevron-down"} color={Colors.primary900} />
      )}
    >
      <List.Item
        title={item.answer}
        titleNumberOfLines={0}
        titleStyle={{
          fontFamily: "Medium",
          color: Colors.greyScale800,
        }}
      />
    </List.Accordion>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={FAQTopics}
        renderItem={renderTopicItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{ paddingVertical: 15 }}
        showsHorizontalScrollIndicator={false}
      />

      <Input
        placeholder={"Search"}
        onChangeText={(text) => {
          setSearchText(text);
          filterFaqs(text);
        }}
        onBlur={() => setFocused(false)}
        active={focused}
        onFocus={() => setFocused(true)}
        value={searchText}
        keyboardType="default"
        IconPack={MaterialCommunityIcons}
        icon="magnify"
        containerStyle={styles.inputContainer}
        iconRight={undefined}
        color={undefined}
        touched={undefined}
        errors={undefined}
        onPressIconRight={undefined}
        onPressIconLeft={undefined}
      />

      <FlatList
        style={{ flex: 1 }}
        data={filteredFaqs}
        renderItem={renderFaqItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    width: wp(360),
    alignSelf: "center",
  },
  topicButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary900,
    width: wp(100),
    padding: 5,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(10),
  },
  selectedTopicButton: {
    backgroundColor: Colors.primary900,
  },
  topicButtonText: {
    fontFamily: "SemiBold",
    color: Colors.primary900,
  },
  selectedTopicButtonText: {
    color: Colors.white,
  },
});
