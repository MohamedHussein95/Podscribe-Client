import {
	AntDesign,
	Ionicons,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Divider, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../constants';
import ArticleDetailsScreen from '../screens/Articles/ArticleDetailsScreen';
import CreateArticleScreen from '../screens/Articles/CreateArticleScreen';
import DraftsScreen from '../screens/Articles/DraftsScreen';
import PublishedArticlesScreen from '../screens/Articles/PublishedArticlesScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import ExploreScreen from '../screens/Discover/ExploreScreen';
import PopularArticlesScreen from '../screens/Discover/PopularArticlesScreen';
import TopicDetailsScreen from '../screens/Discover/TopicDetailsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import { clearCredentials } from '../store/authSlice';
import { hp, wp } from '../utils/Responsive_layout';
import { signOutUser } from '../utils/authActions';
import MyArticlesScreen from '../screens/Articles/MyArticlesScreen';
import AboutScreen from '../screens/profile/AboutScreen';
import { useNavigation } from '@react-navigation/native';
import FollwersScreen from '../screens/profile/FollwersScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const ChatStack = createNativeStackNavigator();
const profileStack = createNativeStackNavigator();

const ArticleStacks = () => {
	const { published, drafts } = useSelector((state) => state.articles);
	return (
		<TopTab.Navigator
			initialRouteName='DraftsScreen'
			tabBarPosition='top'
			backBehavior='none'
			screenOptions={{
				tabBarLabelStyle: {
					fontFamily: 'Medium',
					textTransform: 'none',
					fontSize: 15,
				},
				tabBarIndicatorStyle: {
					backgroundColor: Colors.primary900,
					height: 4,
				},
				tabBarActiveTintColor: Colors.primary900,
				tabBarInactiveTintColor: Colors.greyScale500,
				tabBarStyle: {
					//paddingTop: 30,
					backgroundColor: Colors.white,
					marginBottom: 10,
				},
			}}
		>
			<TopTab.Screen
				name='DraftsScreen'
				component={DraftsScreen}
				options={{
					tabBarLabel:
						drafts?.length > 0 ? `Drafts(${drafts?.length})` : 'Drafts',
				}}
			/>
			<TopTab.Screen
				name='PublishedArticlesScreen'
				component={PublishedArticlesScreen}
				options={{
					tabBarLabel:
						published?.length > 0
							? `Published(${published?.length})`
							: 'Published',
				}}
			/>
		</TopTab.Navigator>
	);
};
const ProfileStacks = () => {
	return (
		<TopTab.Navigator
			initialRouteName='MyArticlesScreen'
			tabBarPosition='top'
			backBehavior='none'
			screenOptions={{
				tabBarLabelStyle: {
					fontFamily: 'Medium',
					textTransform: 'none',
					fontSize: 15,
				},
				tabBarIndicatorStyle: {
					backgroundColor: Colors.primary900,
					height: 4,
				},
				tabBarActiveTintColor: Colors.primary900,
				tabBarInactiveTintColor: Colors.greyScale500,
				tabBarStyle: {
					//paddingTop: 30,
					backgroundColor: Colors.white,
					marginBottom: 10,
					elevation: 1,
				},
			}}
		>
			<TopTab.Screen
				name='MyArticlesScreen'
				component={MyArticlesScreen}
				options={{
					tabBarLabel: 'Articles',
				}}
			/>
			<TopTab.Screen
				name='AboutScreen'
				component={AboutScreen}
				options={{
					tabBarLabel: 'About',
				}}
			/>
		</TopTab.Navigator>
	);
};
const ArticlesNavigator = () => {
	return (
		<ChatStack.Navigator
			screenOptions={{
				headerShown: true,
				contentStyle: {
					paddingHorizontal: 10,
					backgroundColor: Colors.white,
				},
				header: () => <Header />,
			}}
		>
			<ChatStack.Screen name='ArticleStacks' component={ArticleStacks} />
		</ChatStack.Navigator>
	);
};
const ProfileNavigator = () => {
	return (
		<profileStack.Navigator
			screenOptions={{
				headerShown: true,
				contentStyle: {
					paddingHorizontal: 10,
					backgroundColor: Colors.white,
				},
				header: () => <ProfileHeader />,
			}}
		>
			<profileStack.Screen name='ProfileStacks' component={ProfileStacks} />
		</profileStack.Navigator>
	);
};
const TabStack = () => {
	return (
		<Tab.Navigator
			initialRouteName={'home'}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'HomeScreen') {
						iconName = focused ? 'home' : 'home-outline';
						return <Ionicons name={iconName} size={size} color={color} />;
					} else if (route.name === 'ArticlesNavigator') {
						iconName = focused ? 'note-text' : 'note-text-outline';
						return (
							<MaterialCommunityIcons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					} else if (route.name === 'ProfileScreen') {
						iconName = focused ? 'person' : 'person-outline';
						return <Ionicons name={iconName} size={size} color={color} />;
					} else if (route.name === 'DiscoverScreen') {
						iconName = focused ? 'compass' : 'compass-outline';
						return (
							<MaterialCommunityIcons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					} else if (route.name === 'CreateArticleScreen') {
						return (
							<AntDesign
								name={'pluscircle'}
								size={30}
								color={Colors.primary900}
							/>
						);
					}
				},
				tabBarActiveTintColor: Colors.primary900,
				tabBarInactiveTintColor: Colors.greyScale300,
				headerShown: false,
				tabBarLabel: '',
				tabBarStyle: {
					paddingVertical: 5,
					height: Platform.OS === 'ios' ? 100 : 50,
					backgroundColor: Colors.white,
				},
				lazy: false,
			})}
		>
			<Tab.Screen name='HomeScreen' component={HomeScreen} />
			<Tab.Screen name='DiscoverScreen' component={DiscoverScreen} />
			<Tab.Screen
				name='CreateArticleScreen'
				component={CreateArticleScreen}
			/>
			<Tab.Screen name='ArticlesNavigator' component={ArticlesNavigator} />
			<Tab.Screen name='ProfileNavigator' component={ProfileNavigator} />
		</Tab.Navigator>
	);
};

const MainNavigation = () => {
	return (
		<Stack.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				headerTitle: '',
			})}
			initialRouteName='MyTabs'
		>
			<Stack.Screen name='TabStack' component={TabStack} />
			<Stack.Screen
				name='ArticleDetailsScreen'
				component={ArticleDetailsScreen}
			/>
			<Stack.Screen
				name='PopularArticlesScreen'
				component={PopularArticlesScreen}
			/>
			<Stack.Screen name='ExploreScreen' component={ExploreScreen} />
			<Stack.Screen
				name='TopicDetailsScreen'
				component={TopicDetailsScreen}
			/>
			<Stack.Screen name='FollwersScreen' component={FollwersScreen} />
		</Stack.Navigator>
	);
};
const Header = () => {
	return (
		<Appbar.Header
			style={{
				backgroundColor: Colors.white,
				paddingHorizontal: 10,
			}}
		>
			<Image
				source={require('../../assets/images/logo.png')}
				style={{ width: wp(30), height: hp(30) }}
			/>
			<Appbar.Content
				title={'My Articles'}
				color={Colors.black}
				style={{ marginHorizontal: 10 }}
				titleStyle={{ fontFamily: 'Bold', fontSize: 18 }}
			/>
			<AntDesign
				name='search1'
				size={24}
				color={Colors.black}
				style={{ marginHorizontal: 10 }}
			/>
			<Ionicons
				name='ellipsis-horizontal-circle-outline'
				size={30}
				color={Colors.black}
			/>
		</Appbar.Header>
	);
};
const ProfileHeader = () => {
	const { authInfo } = useSelector((state) => state.auth);
	const { userInfo } = useSelector((state) => state.user);
	const navigation = useNavigation();
	//console.log(userInfo);

	const dispatch = useDispatch();
	const handleSignOut = async () => {
		try {
			await signOutUser();
			dispatch(clearCredentials());
		} catch (error) {
			console.log(error);
		}
	};
	const handlePress = async (screen, sFor) => {
		navigation.navigate(screen, { searchFor: sFor });
	};
	return (
		<View style={styles.screen}>
			<Appbar.Header style={{ backgroundColor: Colors.white }}>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 10,
						marginLeft: 5,
					}}
				>
					<Image
						source={require('../../assets/images/logo.png')}
						style={{ width: wp(30), height: hp(30) }}
					/>
					<Appbar.Content
						title='Profile'
						titleStyle={{ fontFamily: 'Bold' }}
					/>
				</View>
				<Appbar.Action icon={'share-outline'} size={30} />
				<Appbar.Action icon={'cog-outline'} size={30} />
			</Appbar.Header>
			<View style={{ marginHorizontal: 15 }}>
				<View style={styles.container}>
					<Avatar.Image source={{ uri: authInfo?.photoURL }} size={60} />
					<View style={{ flex: 1, gap: 5 }}>
						<Text style={styles.fullName}>
							{authInfo?.displayName || 'Andrew Ainsley'}
						</Text>
						<Text style={styles.userName}>
							{userInfo?.userName || '@andrew_ainsley'}
						</Text>
					</View>
					<TouchableOpacity activeOpacity={0.8} onPress={handleSignOut}>
						<View style={styles.edit}>
							<Text
								style={{ color: Colors.primary900, fontFamily: 'Bold' }}
							>
								<MaterialCommunityIcons
									name='pencil'
									color={Colors.primary900}
									size={15}
								/>{' '}
								Edit
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<Divider />
				<View style={styles.metaContainer}>
					<View style={styles.meta}>
						<Text style={{ fontFamily: 'SemiBold', fontSize: wp(24) }}>
							{userInfo.articles?.published?.filter(Boolean)?.length ||
								'0'}
						</Text>
						<Text>articles</Text>
					</View>
					<Divider style={{ width: wp(0.8), height: '100%' }} />
					<TouchableOpacity
						onPress={() => handlePress('FollwersScreen', 'following')}
					>
						<View style={styles.meta}>
							<Text style={{ fontFamily: 'SemiBold', fontSize: wp(24) }}>
								{userInfo.following?.filter(Boolean)?.length || '0'}
							</Text>
							<Text>following</Text>
						</View>
					</TouchableOpacity>

					<Divider style={{ width: wp(0.8), height: '100%' }} />
					<TouchableOpacity
						onPress={() => handlePress('FollwersScreen', 'followers')}
					>
						<View style={styles.meta}>
							<Text style={{ fontFamily: 'SemiBold', fontSize: wp(24) }}>
								{userInfo.followers?.filter(Boolean)?.length || '0'}
							</Text>
							<Text>followers</Text>
						</View>
					</TouchableOpacity>
				</View>
				<Divider />
			</View>
		</View>
	);
};
export default MainNavigation;

const styles = StyleSheet.create({
	screen: {
		backgroundColor: Colors.white,
	},
	titleContainer: {
		alignSelf: 'flex-start',
		marginVertical: 5,
	},
	container: {
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginVertical: 10,
	},
	title: {
		fontFamily: 'Bold',
		fontSize: wp(28),
		color: Colors.black,
		textAlign: 'left',
		letterSpacing: 0.5,
	},
	fullName: {
		fontSize: wp(18),
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
	},
	userName: {
		fontSize: wp(14),
		fontFamily: 'Medium',
		color: Colors.greyScale700,
		textAlign: 'left',
	},
	edit: {
		backgroundColor: Colors.white,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		width: wp(90),
		borderWidth: 2,
		borderColor: Colors.primary900,
	},
	meta: {
		alignItems: 'center',
		gap: 5,
	},
	metaContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 15,
	},
});
