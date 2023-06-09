import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import MyArticlesScreen from '../screens/Articles/MyArticlesScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CreateArticleScreen from '../screens/Articles/CreateArticleScreen';
import { Colors } from '../constants';
import {
	AntDesign,
	Ionicons,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import ArticleDetailsScreen from '../screens/Articles/ArticleDetailsScreen';
import DraftsScreen from '../screens/Articles/DraftsScreen';
import PublishedArticlesScreen from '../screens/Articles/PublishedArticlesScreen';
import { Appbar, Avatar } from 'react-native-paper';
import { Image } from 'react-native';
import { hp, wp } from '../utils/Responsive_layout';
import { useSelector } from 'react-redux';
import PopularArticlesScreen from '../screens/Discover/PopularArticlesScreen';
import ExploreScreen from '../screens/Discover/ExploreScreen';
import TopicDetailsScreen from '../screens/Discover/TopicDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const ChatStack = createNativeStackNavigator();

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
			<Tab.Screen name='ProfileScreen' component={ProfileScreen} />
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
export default MainNavigation;
