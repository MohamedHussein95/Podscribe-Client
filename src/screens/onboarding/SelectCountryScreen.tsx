import React, { memo, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import CountryFlag from "../../components/CountryFlag";
import Input from "../../components/Input";
import ProgressBarHeader from "../../components/ProgressBarHeader";
import { Colors, FLAGS } from "../../constants";
import { updateUserInfo } from "../../store/userSlice";
import { DEVICE_WIDTH, wp } from "../../utils/Responsive_layout";

const SelectCountry = ({ navigation }) => {
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState("");
  const [filteredFlags, setFilteredFlags] = useState(FLAGS.slice(0, 4));
  const dispatch = useDispatch();

  const handleNext = () => {
    try {
      dispatch(updateUserInfo({ country }));
      navigation.navigate("ProfileSetupFormScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);

    // Filter the FLAGS array based on the search text
    const filtered = FLAGS.filter(
      (flag) =>
        flag.country.toLowerCase().includes(text.toLowerCase()) ||
        flag.id.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredFlags(filtered.slice(0, 5)); // Update the filteredFlags state with the first 5 matching countries
  };

  const renderHeader = useMemo(
    () => (
      <>
        <View>
          <Text style={styles.titleText}>Which country are you from?</Text>
        </View>
        <View>
          <Text style={styles.subTitleText}>
            Please select your country of origin for a better recommendation
          </Text>
        </View>
        <Input
          placeholder="Search All Countries"
          active={focused}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={searchText}
          onChangeText={handleSearch} // Updated onChangeText to handleSearch
          containerStyle={styles.inputContainer}
        />
      </>
    ),
    [focused, searchText]
  );

  return (
    <View style={styles.screen}>
      <ProgressBarHeader num={2} />
      <FlatList
        data={filteredFlags}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CountryFlag item={item} country={country} setCountry={setCountry} />
        )}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, paddingBottom: 15 }}
        contentContainerStyle={{
          paddingHorizontal: wp(15),
          alignItems: "center",
        }}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: !country ? Colors.disabled : Colors.primary900,
          }}
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={!country}
        >
          <Text style={{ color: Colors.white, fontFamily: "Bold" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(SelectCountry);

const styles = StyleSheet.create({
  screen: {
    width: DEVICE_WIDTH,
    marginTop: 20,
    flex: 1,
    backgroundColor: Colors.white,
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
  inputContainer: {
    width: wp(350),
    marginTop: 15,
    alignSelf: "flex-start",
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    alignSelf: "center",
    width: DEVICE_WIDTH,
    backgroundColor: "transparent",
  },
  button: {
    width: wp(300),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 10,
  },
});
