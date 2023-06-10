import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { Colors } from './src/constants';
import {
	setCredentials,
	setDidTryAutoLogin,
	setUserInfo,
} from './src/store/authSlice';
import { hp, wp } from './src/utils/Responsive_layout';
import { useGetUserMutation } from './src/store/userApiSlice';
import { updateUserInfo } from './src/store/userSlice';

const StartUpScreen = () => {
	let userId = null;
	const dispatch = useDispatch();
	const [getUser] = useGetUserMutation({});

	useEffect(() => {
		const getUserInfo = async () => {
			userId = await AsyncStorage.getItem('userId');
			console.log(userId);

			if (!userId) {
				console.log('Auto Login Failed');
				dispatch(setDidTryAutoLogin());
				return;
			}
			try {
				const userData = await getUser(userId).unwrap();
				//console.log(userData);

				dispatch(setCredentials(userData.user));
				dispatch(updateUserInfo(userData.userData));
				dispatch(setDidTryAutoLogin());
			} catch (error) {
				console.log(error);
				dispatch(setDidTryAutoLogin());
			}
		};
		getUserInfo();
	}, []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Colors.white,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Image
				source={require('./assets/images/logo.png')}
				resizeMode='contain'
				style={{ width: wp(50), height: hp(50) }}
			/>
		</View>
	);
};

export default StartUpScreen;
