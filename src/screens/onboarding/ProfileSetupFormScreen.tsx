import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import React, { memo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Modal, Portal } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ProgressBarHeader from "../../components/ProgressBarHeader";
import SetupInput from "../../components/SetupInput";
import { Colors } from "../../constants";
import { updateUserInfo } from "../../store/userSlice";
import { DEVICE_WIDTH, hp, wp } from "../../utils/Responsive_layout";
import { pickCameraAsync, pickGalleryAsync } from "../../utils/UploadImage";
import { uploadFile } from "../../utils/fileUpload";
import { RootState } from "../../store/store";
import ModalLoader from "../../components/ModalLoader";

const ProfileSetupForm = ({ navigation }: any) => {
  const { authInfo } = useSelector((state: RootState) => state.auth);
  const [fullName, setFullName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [formattedValue, setFormattedValue] = useState<string>("");

  const [avatar, setAvatar] = useState<string | undefined>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const phoneInput = useRef<PhoneInput>(null);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [genderModalVisible, setGenderModalVisible] = useState<boolean>(false);

  const [selectedDropDownvalue, setSelectedDropDownvalue] = useState<
    string | undefined
  >();

  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<string>("date");
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const showMode = (currentMode: string) => {
    if (Platform.OS === "android") {
      return DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: undefined,
        is24Hour: true,
      });
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const dispatch = useDispatch();

  const handleNext = () => {
    try {
      dispatch(
        updateUserInfo({
          fullName,
          phoneNumber: formattedValue,
          gender: selectedDropDownvalue,
          DOB: moment(date).format("MM/DD/YYYY"),
          avatar,
        })
      );
      navigation.navigate("SelectTopicScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectImage = async () => {
    setImageModalOpen(true);
  };
  const handleCameraSelect = async () => {
    try {
      setImageModalOpen(false);
      const image = await pickCameraAsync();
      if (!image) return;

      await handleImageSelect(image);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGallerySelect = async () => {
    try {
      setImageModalOpen(false);
      const image = await pickGalleryAsync();
      if (!image) return;

      await handleImageSelect(image);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageSelect = async (imgUrl: string) => {
    try {
      setModalVisible(true);

      const url = await uploadFile(imgUrl, authInfo.uid, "profilePhotos");
      setAvatar(url);

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
  return (
    <View style={styles.screen}>
      <ProgressBarHeader num={3} />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(20) }}
      >
        <View>
          <Text style={styles.titleText}>Complete your profile 📋</Text>
        </View>
        <View>
          <Text style={styles.subTitleText}>
            Don't worry,only you can see your personal data.No one else will be
            able to see it
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleSelectImage}>
            <View style={styles.imageContainer}>
              {avatar && !modalVisible && (
                <Image
                  source={{ uri: avatar }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
              {!modalVisible && !avatar && (
                <MaterialCommunityIcons
                  name="image-area"
                  size={30}
                  color={Colors.greyScale500}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <SetupInput
            placeholder={"Full Name"}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="KE"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            containerStyle={{
              backgroundColor: Colors.white,
              width: "100%",
              borderBottomColor: Colors.primary900,
              borderBottomWidth: 1,

              marginBottom: 15,
            }}
            textInputStyle={{
              fontFamily: "Bold",
              fontSize: wp(18),
              color: Colors.black,
            }}
            placeholderTextColor={Colors.greyScale400}
            textContainerStyle={{
              backgroundColor: Colors.white,
            }}
            countryPickerButtonStyle={{
              paddingHorizontal: 0,
              justifyContent: "flex-start",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: hp(45),
            borderBottomColor: Colors.primary900,
            borderBottomWidth: 1,
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontFamily: "Bold",
              fontSize: wp(18),
              color: selectedDropDownvalue ? Colors.black : Colors.greyScale500,
            }}
          >
            {selectedDropDownvalue ? selectedDropDownvalue : "Gender"}
          </Text>
          <AntDesign
            name={
              selectedDropDownvalue
                ? selectedDropDownvalue === "Male"
                  ? "man"
                  : "woman"
                : "down"
            }
            color={Colors.primary900}
            size={24}
            onPress={() => setGenderModalVisible((prev) => !prev)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: hp(45),
            borderBottomColor: Colors.primary900,
            borderBottomWidth: 1,
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontFamily: "Bold",
              fontSize: wp(18),
              color: Colors.black,
            }}
          >
            {moment(date).format("MM/DD/YYYY")}
          </Text>
          <AntDesign
            name={"calendar"}
            color={Colors.primary900}
            size={24}
            onPress={showDatepicker}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor:
              fullName.trim().length <= 0 ||
              formattedValue.trim().length <= 0 ||
              selectedDropDownvalue?.trim().length <= 0 ||
              !phoneInput.current?.isValidNumber(value)
                ? Colors.disabled
                : Colors.primary900,
          }}
          activeOpacity={0.8}
          onPress={handleNext}
          disabled={
            fullName.trim().length <= 0 ||
            formattedValue.trim().length <= 0 ||
            selectedDropDownvalue?.trim().length <= 0 ||
            !phoneInput.current?.isValidNumber(value)
          }
        >
          <Text style={{ color: Colors.white, fontFamily: "Bold" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal
          visible={imageModalOpen}
          onDismiss={() => setImageModalOpen((prev) => !prev)}
          contentContainerStyle={styles.modalContainerStyle}
        >
          <View style={styles.modalContainer}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: 18,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Choose an action
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={handleCameraSelect}
                style={styles.modalButton}
              >
                <MaterialIcons
                  name="camera-alt"
                  size={30}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGallerySelect}
                style={styles.modalButton}
              >
                <MaterialIcons
                  name="insert-photo"
                  size={30}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={genderModalVisible}
          onDismiss={() => setGenderModalVisible((prev) => !prev)}
          contentContainerStyle={styles.modalContainerStyle}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelectedDropDownvalue("Male");
                setGenderModalVisible(false);
              }}
              style={{
                backgroundColor: Colors.primary900,
                marginVertical: 5,
                padding: 10,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: wp(17),
                  color: Colors.white,
                  textAlign: "center",
                }}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedDropDownvalue("Female");
                setGenderModalVisible(false);
              }}
              style={{
                backgroundColor: Colors.primary900,
                marginVertical: 5,
                padding: 10,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: wp(17),
                  color: Colors.white,
                  textAlign: "center",
                }}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <ModalLoader
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export default memo(ProfileSetupForm);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    width: DEVICE_WIDTH,
    marginTop: 20,
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
  inputTitle: {
    fontFamily: "Bold",
    color: Colors.black,
    textAlign: "left",
  },
  avatarContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
    width: wp(90),
    height: hp(90),
  },
  input: {
    backgroundColor: Colors.white,
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
  imageContainer: {
    width: wp(90),
    height: hp(90),
    backgroundColor: Colors.greyScale200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  containerStyle: {
    backgroundColor: Colors.white,
    width: wp(350),
    alignSelf: "center",
    height: hp(500),
    borderRadius: 12,
    justifyContent: "flex-start",
  },
  modalContainer: {
    backgroundColor: "white",
    height: 150,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContainerStyle: {
    justifyContent: "flex-end",
    flex: 1,
  },
  modalButton: {
    width: wp(80),
    height: hp(80),
    backgroundColor: Colors.primary900,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
