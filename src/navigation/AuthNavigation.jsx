import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import CreateAccountScreen from '../screens/onboarding/CreateAccountScreen';
import LetYouInScreen from '../screens/onboarding/LetYouInScreen';
import SignInScreen from '../screens/signIn&forgotpassword/SignInScreen';
import ForgotPasswordScreen from '../screens/signIn&forgotpassword/ForgotPasswordScreen';
import OtpScreen from '../screens/signIn&forgotpassword/OtpScreen';
import CreateNewPasswordScreen from '../screens/signIn&forgotpassword/CreateNewPasswordScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AuthStack() {
	const [firstLaunch, setFirstLaunch] = useState(null);

	useEffect(() => {
		const getFirstLaunch = async () => {
			try {
				const firstTime = await AsyncStorage.getItem('firstLaunch');
				if (!firstTime) {
					setFirstLaunch(true);
					await AsyncStorage.setItem('firstLaunch', 'true');
				} else {
					setFirstLaunch(false);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getFirstLaunch();
	}, []);
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={firstLaunch ? 'OnboardingScreen' : 'LetYouInScreen'}
		>
			{firstLaunch && (
				<Stack.Screen
					name='OnboardingScreen'
					component={OnboardingScreen}
				/>
			)}

			<Stack.Screen name='LetYouInScreen' component={LetYouInScreen} />

			<Stack.Screen
				name='CreateAccountScreen'
				component={CreateAccountScreen}
			/>
			<Stack.Screen name='SignInScreen' component={SignInScreen} />
			<Stack.Screen
				name='ForgotPasswordScreen'
				component={ForgotPasswordScreen}
			/>
			<Stack.Screen name='OtpScreen' component={OtpScreen} />
			<Stack.Screen
				name='CreateNewPasswordScreen'
				component={CreateNewPasswordScreen}
			/>
		</Stack.Navigator>
	);
}

export default AuthStack;
