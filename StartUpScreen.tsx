import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Colors } from './src/constants';
import { setDrafts, setPublished } from './src/store/articleSlice';
import { setCredentials, setDidTryAutoLogin } from './src/store/authSlice';
import { useGetUserMutation } from './src/store/userApiSlice';
import { setBookMarks, updateUserInfo } from './src/store/userSlice';
import { hp, wp } from './src/utils/Responsive_layout';

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
				/* 1.GET user and Auth Info 
				   2.GET User Articles
				   3.Get User BookMarks

				*/
				const userData = await getUser(userId).unwrap();
				//console.log(userData);

				dispatch(setCredentials(userData.user));
				dispatch(updateUserInfo(userData.userData));
				dispatch(setPublished(userData.updatedPublished));
				dispatch(setDrafts(userData.updatedDrafts));
				dispatch(setBookMarks(userData.bookMarks));
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
