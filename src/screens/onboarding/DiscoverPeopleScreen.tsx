import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUsersMutation,
  useUploadUserToDBMutation,
} from "../../store/userApiSlice";
import { updateUserInfo } from "../../store/userSlice";
import { setCredentials } from "../../store/authSlice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import FollowUser from "../../components/FollowUser";
import { DEVICE_HEIGHT, DEVICE_WIDTH, wp } from "../../utils/Responsive_layout";
import { Modal, Portal } from "react-native-paper";
import { Colors } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import ProgressBarHeader from "../../components/ProgressBarHeader";
import ModalLoader from "../../components/ModalLoader";
import { RootState } from "../../store/store";

const DiscoverPEOPLE = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { authInfo } = useSelector((state: RootState) => state.auth);
  const [discoveredPeople, setDiscoveredPeople] = useState([]);
  const [followedPeople, setFollowedPeople] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(true);
  const [uploadUser] = useUploadUserToDBMutation();
  const [getUsers] = useGetUsersMutation();

  const dispatch = useDispatch();

  const handleSetupUser = async () => {
    try {
      setModalVisible(true);
      const uid = authInfo.uid;
      const body = {
        ...userInfo,
        following: followedPeople || [""],
        moreInfo: {
          website: "",
          location: "",
          joined: authInfo.metadata.creationTime,
          totalReader: "",
        },
      };

      const data = await uploadUser({ body, uid }).unwrap();

      dispatch(updateUserInfo(data.userData));
      dispatch(setCredentials(data.authData));
    } catch (error) {
      setModalVisible(false);
      console.log(error);
    }
  };
  const handleFollow = useCallback(
    async (id: string) => {
      try {
        const followed = followedPeople.includes(id);
        if (!followed) {
          return setFollowedPeople((prev) => [...prev, id]);
        }
        const updated = followedPeople.filter((p) => p !== id);
        setFollowedPeople(updated);
      } catch (error) {
        console.log(error);
      }
    },
    [followedPeople]
  );
  useEffect(() => {
    const getSomeUsers = async () => {
      try {
        const users = await getUsers({}).unwrap();
        setDiscoveredPeople(users);
        setLoadingModalVisible(false);
      } catch (error) {
        setLoadingModalVisible(false);
        console.log(error);
        Toast.show({
          type: "error",
          text1: `${error?.data?.message || error?.error || error}`,
          position: "top",
        });
      }
    };
    getSomeUsers();
  }, []);
  return (
    <View style={styles.screen}>
      <ProgressBarHeader num={5} />
      <FlatList
        data={discoveredPeople}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View>
              <Text style={styles.titleText}>Discover People 🥰</Text>
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.subTitleText}>
                Pick some People to follow
              </Text>
            </View>
          </>
        }
        ListHeaderComponentStyle={{}}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FollowUser
            item={item}
            onPress={(id: string) => handleFollow(id)}
            followedPeople={followedPeople}
          />
        )}
        getItemLayout={(data, index) => ({
          length: DEVICE_WIDTH,
          offset: DEVICE_WIDTH * index,
          index,
        })}
        style={{ flex: 1, marginBottom: 15 }}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSetupUser}
        >
          <Text style={{ color: Colors.white, fontFamily: "Bold" }}>
            Finish
          </Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible((prev) => !prev)}
          contentContainerStyle={styles.containerStyle}
        >
          <View
            style={{
              backgroundColor: Colors.primary900,
              padding: 30,
              borderRadius: 500,
            }}
          >
            <MaterialCommunityIcons
              name="checkbox-marked"
              size={50}
              color={Colors.white}
            />
          </View>
          <View
            style={{
              padding: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: wp(24),
                color: Colors.primary900,
                textAlign: "center",
              }}
            >
              Sign Up Successful!
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: wp(17),
                color: Colors.black,
                textAlign: "center",
              }}
            >
              Your account has been created.Please wait a moment,we are
              preparing for you...
            </Text>
          </View>
          <View style={{ marginVertical: 20 }}>
            <ActivityIndicator size={"small"} color={Colors.primary900} />
          </View>
        </Modal>
      </Portal>
      <ModalLoader
        modalVisible={loadingModalVisible}
        onDismiss={() => setLoadingModalVisible(false)}
      />
    </View>
  );
};

export default memo(DiscoverPEOPLE);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    width: DEVICE_WIDTH,
    marginTop: 20,
    paddingHorizontal: wp(15),
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
  container: {
    width: wp(350),
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginVertical: 10,
  },
  countryText: {
    fontSize: wp(18),
    fontFamily: "Bold",
    color: Colors.black,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    alignSelf: "center",
    width: DEVICE_WIDTH,
  },
  button: {
    backgroundColor: Colors.primary900,
    width: wp(300),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 10,
  },
  fullName: {
    fontSize: wp(17),
    fontFamily: "Bold",
    color: Colors.black,
    textAlign: "left",
  },
  userName: {
    fontSize: wp(14),
    fontFamily: "Medium",
    color: Colors.greyScale500,
    textAlign: "left",
  },
  follow: {
    backgroundColor: Colors.primary900,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp(100),
    borderWidth: 2,
    borderColor: Colors.primary900,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Bold",
    textAlign: "center",
    color: Colors.primary500,
  },
  modalContent: {
    fontSize: 18,
    fontFamily: "Medium",
    textAlign: "center",
    color: Colors.dark1,
    marginVertical: 14,
    marginBottom: 50,
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  containerStyle: {
    backgroundColor: Colors.white,
    padding: 20,
    height: DEVICE_HEIGHT * 0.6,
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
});
