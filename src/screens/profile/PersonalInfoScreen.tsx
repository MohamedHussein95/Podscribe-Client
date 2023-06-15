import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Appbar, Divider, Modal, Portal } from "react-native-paper";
import { Colors } from "../../constants";
import { hp, wp } from "../../utils/Responsive_layout";
import SetupInput from "../../components/SetupInput";
import { pickCameraAsync, pickGalleryAsync } from "../../utils/UploadImage";
import { uploadFile } from "../../utils/fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ModalLoader from "../../components/ModalLoader";
import PrimaryButton from "../../components/PrimaryButton";
import { useUpdateUserMutation } from "../../store/userApiSlice";
import { setCredentials } from "../../store/authSlice";
import { updateUserInfo } from "../../store/userSlice";

const PersonalInfoScreen = ({ navigation }) => {
  const { authInfo } = useSelector((state: RootState) => state.auth);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { moreInfo } = userInfo;

  const [FullName, setFullName] = useState(userInfo?.fullName);
  const [email, setEmail] = useState(authInfo?.email);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);
  const [gender, setGender] = useState(userInfo?.gender);
  const [Date, setBirth] = useState(userInfo?.DOB);
  const [location, setLocation] = useState(moreInfo?.location);
  const [profile, setprofile] = useState<string | undefined>(userInfo?.avatar);

  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Appbar.BackAction onPress={() => navigation.pop()} />
          <Appbar.Content
            title="Personal Info"
            titleStyle={{ fontFamily: "Bold" }}
          />
        </View>

        <Appbar.Action
          icon={"pencil-outline"}
          size={30}
          onPress={() => navigation.navigate("EditProfileScreen")}
        />
      </Appbar.Header>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContainer}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            {profile && (
              <Image
                source={{ uri: profile }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            {!profile && (
              <MaterialCommunityIcons
                name="image-area"
                size={30}
                color={Colors.greyScale500}
              />
            )}
          </View>
        </TouchableOpacity>

        <SetupInput
          placeholder={"Display Name"}
          onChangeText={setFullName}
          value={FullName}
          editable={false}
          selectTextOnFocus={false}
        />
        <SetupInput
          placeholder={"Email"}
          onChangeText={setEmail}
          value={email}
          editable={false}
          selectTextOnFocus={false}
        />
        <SetupInput
          placeholder={"Description"}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          multiline={true}
          editable={false}
          selectTextOnFocus={false}
        />

        <SetupInput
          placeholder={"gender"}
          onChangeText={setGender}
          value={gender}
          editable={false}
          selectTextOnFocus={false}
        />
        <SetupInput
          placeholder={"Date"}
          onChangeText={setBirth}
          value={Date}
          editable={false}
          selectTextOnFocus={false}
        />
        <SetupInput
          placeholder={"location"}
          onChangeText={setLocation}
          value={location}
          autoCapitalize="none"
          editable={false}
          selectTextOnFocus={false}
        />
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bodyContainer: { paddingHorizontal: wp(15), alignItems: "center" },
  profileContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
    width: wp(90),
    height: hp(90),
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
