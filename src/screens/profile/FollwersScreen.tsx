import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants";
import { Appbar } from "react-native-paper";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { wp } from "../../utils/Responsive_layout";
import { useGetUserFollowersFollowingsMutation } from "../../store/userApiSlice";
import { useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import FollowUser from "../../components/FollowUser";
import ModalLoader from "../../components/ModalLoader";

const FollwersScreen = ({ route, navigation }) => {
  const { authInfo } = useSelector((state) => state.auth);
  const { searchFor } = route.params;
  const [search, setSearch] = useState(searchFor || "followings");
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loadingModalVisible, setLoadingModalVisible] = useState(true);
  const [getFollowersFollowings] = useGetUserFollowersFollowingsMutation();
  const [newFollowers, setNewFollowers] = useState([]);
  const [newUnfollows, setNewUnfollows] = useState([]);

  const getFollowers_followings = async () => {
    try {
      const userId = authInfo.uid;
      const data = await getFollowersFollowings(userId).unwrap();
      setFollowers(data?.followersData);
      setFollowings(data?.followingsData);
      //console.log(data);
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
  const handleFollow = async (id: string) => {
    try {
      const followed = followings.includes(id);
      if (!followed) {
        return setFollowings((prev) => [...prev, id]);
      }
      const updated = followings.filter((p) => p !== id);
      setFollowings(updated);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      getFollowers_followings();
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: Colors.white }}>
        <View style={{ flex: 1 }}>
          <Appbar.BackAction onPress={() => navigation.pop()} />
        </View>
        <Appbar.Action icon={"magnify"} size={30} />
      </Appbar.Header>
      <View style={{ paddingHorizontal: wp(15), justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <PrimaryButton
            title={"Following"}
            onPress={() => setSearch("following")}
            style={{
              width: wp(170),
              backgroundColor:
                search === "following" ? Colors.primary900 : Colors.white,
            }}
            textStyle={{
              color: search === "following" ? Colors.white : Colors.primary900,
            }}
          />
          <PrimaryButton
            title={"Followers"}
            onPress={() => setSearch("followers")}
            style={{
              width: wp(170),
              backgroundColor:
                search === "followers" ? Colors.primary900 : Colors.white,
            }}
            textStyle={{
              color: search === "followers" ? Colors.white : Colors.primary900,
            }}
          />
        </View>
        <FlatList
          data={search === "following" ? followings : followers}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FollowUser
              item={item}
              onPress={(id) => handleFollow(id)}
              followedPeople={followings}
            />
          )}
          ListEmptyComponent={
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: wp(15),
                  color: Colors.greyScale400,
                }}
              >
                {search === "followers"
                  ? "You have no Followers"
                  : "You have no Followings"}
              </Text>
            </View>
          }
        />
      </View>
      <ModalLoader
        modalVisible={loadingModalVisible}
        onDismiss={() => setLoadingModalVisible(false)}
      />
    </View>
  );
};

export default FollwersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
