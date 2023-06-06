import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
	return (
		<Stack.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				headerTitle: '',
			})}
			initialRouteName='MyTabs'
		></Stack.Navigator>
	);
};

export default MainNavigation;
