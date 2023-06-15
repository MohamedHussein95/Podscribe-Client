import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Colors } from "../constants";
import ArticleDetailsScreen from "../screens/Articles/ArticleDetailsScreen";
import ArticlesScreen from "../screens/Articles/ArticlesScreen";
import CreateArticleScreen from "../screens/Articles/CreateArticleScreen";
import DiscoverScreen from "../screens/Discover/DiscoverScreen";
import ExploreScreen from "../screens/Discover/ExploreScreen";
import PopularArticlesScreen from "../screens/Discover/PopularArticlesScreen";
import TopicDetailsScreen from "../screens/Discover/TopicDetailsScreen";
import HomeScreen from "../screens/home/HomeScreen";
import FollwersScreen from "../screens/profile/FollwersScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import NotificationScreen from "../screens/home/NotificationScreen";
import MyBookMarksScreen from "../screens/home/MyBookMarksScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import PersonalInfoScreen from "../screens/profile/PersonalInfoScreen";
import NotificationSettingsScreen from "../screens/profile/NotificationSettingsScreen";
import SecurityScreen from "../screens/profile/SecurityScreen";
import HelpCenterScreen from "../screens/profile/HelpCenterScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={"home"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "ArticlesScreen") {
            iconName = focused ? "note-text" : "note-text-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "UserProfileScreen") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "DiscoverScreen") {
            iconName = focused ? "compass" : "compass-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "CreateArticleScreen") {
            return (
              <AntDesign
                name={"pluscircle"}
                size={30}
                color={Colors.primary900}
              />
            );
          }
        },
        tabBarActiveTintColor: Colors.primary900,
        tabBarInactiveTintColor: Colors.greyScale300,
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
          paddingVertical: 5,
          height: Platform.OS === "ios" ? 100 : 50,
          backgroundColor: Colors.white,
        },
        lazy: false,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <Tab.Screen name="CreateArticleScreen" component={CreateArticleScreen} />
      <Tab.Screen name="ArticlesScreen" component={ArticlesScreen} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTitle: "",
      })}
      initialRouteName="MyTabs"
    >
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen
        name="ArticleDetailsScreen"
        component={ArticleDetailsScreen}
      />
      <Stack.Screen
        name="PopularArticlesScreen"
        component={PopularArticlesScreen}
      />
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="TopicDetailsScreen" component={TopicDetailsScreen} />
      <Stack.Screen name="FollwersScreen" component={FollwersScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="MyBookMarksScreen" component={MyBookMarksScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
