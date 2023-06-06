import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import CreateAccountScreen from '../screens/onboarding/CreateAccountScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
			<Stack.Screen
				name='CreateAccountScreen'
				component={CreateAccountScreen}
			/>
		</Stack.Navigator>
	);
}

export default AuthStack;
