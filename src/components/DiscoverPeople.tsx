import React, { memo, useEffect, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	ActivityIndicator,
	Avatar,
	Divider,
	Modal,
	Portal,
} from 'react-native-paper';
import Input from '../components/Input';
import { Colors } from '../constants';
import { DEVICE_HEIGHT, DEVICE_WIDTH, wp } from '../utils/Responsive_layout';
import { useDispatch, useSelector } from 'react-redux';
import {
	useGetUsersMutation,
	useUploadUserToDBMutation,
} from '../store/userApiSlice';
import { updateUserInfo } from '../store/userSlice';
import { setAuth } from '../store/authSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DiscoverPEOPLE = () => {
	const { userInfo } = useSelector((state) => state.user);
	const { authInfo } = useSelector((state) => state.auth);
	const [discoveredPeople, setDiscoveredPeople] = useState([]);
	const [followedPeople, setFollowedPeople] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	console.log(followedPeople);

	const [uploadUser] = useUploadUserToDBMutation();
	const [getUsers] = useGetUsersMutation();

	const dispatch = useDispatch();

	type FlatlistItem = {
		uid: string;
		avatar: string;
		displayName: string;
		username: string;
	};

	const handleSetupUser = async () => {
		try {
			setModalVisible(true);
			const uid = authInfo.uid;
			const body = {
				...userInfo,
				following: followedPeople,
				MoreInfo: {
					website: '',
					location: '',
					joined: authInfo.metadata.creationTime,
					totalReader: '',
				},
			};
			console.log(body);
			const data = await uploadUser({ body, uid }).unwrap();
			console.log(data);

			dispatch(updateUserInfo(data));

			dispatch(setAuth());
		} catch (error) {
			setModalVisible(false);
			console.log(error);
		}
	};
	const handleFollow = async (uid: string) => {
		try {
			const followed = followedPeople.includes(uid);
			if (!followed) {
				return setFollowedPeople((prev) => [...prev, uid]);
			}
			const updated = followedPeople.filter((p) => p !== uid);
			setFollowedPeople(updated);
		} catch (error) {
			console.log(error);
		}
	};

	const _renderItem = (item: FlatlistItem, index: number) => {
		return (
			<View style={styles.container}>
				<Avatar.Image source={{ uri: item.avatar }} size={60} />
				<View style={{ flex: 1, gap: 5 }}>
					<Text style={styles.fullName}>{item.displayName}</Text>
					<Text style={styles.userName}>{item.username || ''}</Text>
				</View>
				<TouchableOpacity
					onPress={() => handleFollow(item.uid)}
					activeOpacity={0.8}
				>
					<View
						style={{
							...styles.follow,
							backgroundColor: followedPeople.includes(item.uid)
								? Colors.white
								: Colors.primary900,
						}}
					>
						<Text
							style={{
								color: followedPeople.includes(item.uid)
									? Colors.primary900
									: Colors.white,
								fontFamily: 'Bold',
							}}
						>
							{followedPeople.includes(item.uid)
								? 'following'
								: 'follow'}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};
	useEffect(() => {
		const getSomeUsers = async () => {
			try {
				const users = await getUsers().unwrap();
				setDiscoveredPeople(users);
			} catch (error) {
				console.log(error);
			}
		};
		getSomeUsers();
	}, []);
	return (
		<View style={styles.screen}>
			<FlatList
				bounces={false}
				data={discoveredPeople}
				keyExtractor={(item) => item.uid}
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
			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={() => setModalVisible((prev) => !prev)}
					contentContainerStyle={styles.containerStyle}
				>
					<View
						style={{
							backgroundColor: Colors.primary900,
							padding: 30,
							borderRadius: 500,
						}}
					>
						<MaterialCommunityIcons
							name='checkbox-marked'
							size={50}
							color={Colors.white}
						/>
					</View>
					<View
						style={{
							padding: 30,
						}}
					>
						<Text
							style={{
								fontFamily: 'Bold',
								fontSize: wp(24),
								color: Colors.primary900,
								textAlign: 'center',
							}}
						>
							Sign Up Successful!
						</Text>
					</View>
					<View style={{ marginVertical: 20 }}>
						<Text
							style={{
								fontFamily: 'Medium',
								fontSize: wp(17),
								color: Colors.black,
								textAlign: 'center',
							}}
						>
							Your account has been created.Please wait a moment,we are
							preparing for you...
						</Text>
					</View>
					<View style={{ marginVertical: 20 }}>
						<ActivityIndicator size={'small'} color={Colors.primary900} />
					</View>
				</Modal>
			</Portal>
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
		borderWidth: 2,
		borderColor: Colors.primary900,
	},
	modalTitle: {
		fontSize: 24,
		fontFamily: 'Bold',
		textAlign: 'center',
		color: Colors.primary500,
	},
	modalContent: {
		fontSize: 18,
		fontFamily: 'Medium',
		textAlign: 'center',
		color: Colors.dark1,
		marginVertical: 14,
		marginBottom: 50,
	},
	modalImage: {
		width: '100%',
		height: 200,
		resizeMode: 'contain',
	},
	containerStyle: {
		backgroundColor: Colors.white,
		padding: 20,
		height: DEVICE_HEIGHT * 0.6,
		width: '80%',
		alignSelf: 'center',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 0,
	},
});
