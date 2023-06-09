import React, { memo, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import Input from '../components/Input';
import { Colors } from '../constants';
import { DEVICE_HEIGHT, DEVICE_WIDTH, wp } from '../utils/Responsive_layout';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadUserToDBMutation } from '../store/userApiSlice';
import { updateUserInfo } from '../store/userSlice';
import { setAuth } from '../store/authSlice';

const PEOPLE = [
	{
		id: '1',
		avatar:
			'https://www.publicdomainpictures.net/pictures/370000/nahled/model-men.jpg',
		fullName: 'Rodolfo Goode',
		username: '@rodolfo_goode',
	},
	{
		id: '2',
		avatar:
			'https://www.publicdomainpictures.net/pictures/370000/nahled/blond-child.jpg',
		fullName: 'Chieko Chute',
		username: '@Chieko_Chute',
	},
	{
		id: '3',
		avatar:
			'https://img.freepik.com/premium-photo/portrait-shot-handsome-pensive-romantic-serious-tanned-man-guy-basic-tshirt-looks-aside-posing-white-background-fashion-style-new-collection-offer-copy-space-ad-model-snap_163305-183211.jpg',
		fullName: 'kyle Danford',
		username: '@kyle_Danford',
	},
];

const DiscoverPEOPLE = () => {
	const { userInfo } = useSelector((state) => state.user);
	const { authInfo } = useSelector((state) => state.auth);
	console.log(userInfo);

	const [uploadUser] = useUploadUserToDBMutation();

	const dispatch = useDispatch();

	type FlatlistItem = {
		id: string;
		avatar: string;
		fullName: string;
		username: string;
	};

	const handleSetupUser = async () => {
		try {
			const uid = authInfo.uid;

			const data = await uploadUser({ userInfo, uid }).unwrap();
			console.log(data);

			dispatch(updateUserInfo(data));
			dispatch(setAuth());
		} catch (error) {
			console.log(error);
		}
	};

	const _renderItem = (item: FlatlistItem, index: number) => {
		return (
			<View>
				<TouchableOpacity style={styles.container} onPress={() => {}}>
					<Avatar.Image source={{ uri: item.avatar }} size={60} />
					<View style={{ flex: 1, gap: 5 }}>
						<Text style={styles.fullName}>{item.fullName}</Text>
						<Text style={styles.userName}>{item.username}</Text>
					</View>
					<View style={styles.follow}>
						<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
							follow
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<View style={styles.screen}>
			<FlatList
				bounces={false}
				data={PEOPLE}
				pagingEnabled
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
				renderItem={({ item, index }) => _renderItem(item, index)}
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
					<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
						Finish
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(DiscoverPEOPLE);

const styles = StyleSheet.create({
	screen: {
		width: DEVICE_WIDTH,
		marginTop: 20,
		paddingHorizontal: wp(15),
	},
	titleText: {
		fontSize: wp(34),
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
		marginBottom: 15,
	},
	subTitleText: {
		fontSize: wp(17),
		fontFamily: 'Regular',
		color: Colors.black,
		textAlign: 'left',
	},
	inputContainer: {
		width: wp(350),
		marginTop: 15,
		alignSelf: 'flex-start',
	},
	container: {
		width: wp(350),
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
		marginVertical: 10,
	},
	countryText: {
		fontSize: wp(18),
		fontFamily: 'Bold',
		color: Colors.black,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		alignSelf: 'center',
		width: DEVICE_WIDTH,
	},
	button: {
		backgroundColor: Colors.primary900,
		width: wp(300),
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginVertical: 10,
	},
	fullName: {
		fontSize: wp(17),
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
	},
	userName: {
		fontSize: wp(14),
		fontFamily: 'Medium',
		color: Colors.greyScale500,
		textAlign: 'left',
	},
	follow: {
		backgroundColor: Colors.primary900,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		width: wp(90),
	},
});
