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

const EditProfileScreen = ({ navigation }) => {
  const { authInfo } = useSelector((state: RootState) => state.auth);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { socialMedia } = userInfo;

  const [FullName, setFullName] = useState(userInfo?.fullName);
  const [userName, setUserName] = useState(userInfo?.userName);
  const [about, setAbout] = useState(userInfo?.about);
  const [whatsApp, setWhatsApp] = useState(socialMedia?.whatsApp);
  const [facebook, setFacebook] = useState(socialMedia?.facebook);
  const [twitter, setTwitter] = useState(socialMedia?.twitter);
  const [instagram, setInstagram] = useState(socialMedia?.instagram);
  const [youtube, setYoutube] = useState(socialMedia?.youtube);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [profile, setprofile] = useState<string | undefined>(userInfo?.avatar);

  const [update] = useUpdateUserMutation();
  const dispatch = useDispatch();
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
      setprofile(url);

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

  const handleUpdate = async (imgUrl: string) => {
    try {
      setModalVisible(true);

      const body = {
        body: {
          fullName: FullName,
          userName: userName,
          about: about,
          socialMedia: {
            whatsApp: whatsApp,
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            youtube: youtube,
          },
          avatar: profile,
        },
      };
      const userId = authInfo.uid;
      console.log(userId);

      const data = await update({ body, userId: userId }).unwrap();
      dispatch(setCredentials(data));
      dispatch(updateUserInfo(body.body));
      setModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Your profile has been updated",
        position: "top",
      });
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
            title="Edit Profile"
            titleStyle={{ fontFamily: "Bold" }}
          />
        </View>

        <Appbar.Action icon={"dots-vertical"} size={30} />
      </Appbar.Header>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bodyContainer}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={handleSelectImage}>
          <View style={styles.imageContainer}>
            {profile && !modalVisible && (
              <Image
                source={{ uri: profile }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            {!modalVisible && !profile && (
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
          autoCapitalize="none"
        />
        <SetupInput
          placeholder={"username"}
          onChangeText={setUserName}
          value={userName}
          autoCapitalize="none"
        />
        <SetupInput
          placeholder={"Description"}
          onChangeText={setAbout}
          value={about}
          autoCapitalize="none"
          multiline={true}
        />
        <Divider />

        <Text style={{ fontFamily: "Bold", color: Colors.white }}>
          Social Media
        </Text>

        <SetupInput
          placeholder={"WhatsApp"}
          onChangeText={setWhatsApp}
          value={whatsApp}
          autoCapitalize="none"
        />
        <SetupInput
          placeholder={"Facebook"}
          onChangeText={setFacebook}
          value={facebook}
          autoCapitalize="none"
        />
        <SetupInput
          placeholder={"Twitter"}
          onChangeText={setTwitter}
          value={twitter}
          autoCapitalize="none"
        />
        <SetupInput
          placeholder={"Instagram"}
          onChangeText={setInstagram}
          value={instagram}
          autoCapitalize="none"
        />
        <SetupInput
          placeholder={"Youtube"}
          onChangeText={setYoutube}
          value={youtube}
          autoCapitalize="none"
        />
      </ScrollView>
      <View style={{ padding: 10, alignItems: "center" }}>
        <PrimaryButton title={"Update"} onPress={handleUpdate} />
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
      <ModalLoader
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export default EditProfileScreen;

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
