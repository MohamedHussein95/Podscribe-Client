import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect } from 'react';
import { signOutUser } from '../../utils/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../store/authSlice';
import { Appbar, Avatar, Divider } from 'react-native-paper';
import { hp, wp } from '../../utils/Responsive_layout';
import { Colors } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
	const { authInfo } = useSelector((state) => state.auth);
	const { userInfo } = useSelector((state) => state.user);

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

	return (
		<View style={styles.screen}>
			<Appbar.Header>
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
						source={require('../../../assets/images/logo.png')}
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
							{userInfo?.fullName || 'Andrew Ainsley'}
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
							{userInfo.articles?.published.length || '0'}
						</Text>
						<Text>articles</Text>
					</View>
					<Divider style={{ width: wp(0.8), height: '100%' }} />
					<View style={styles.meta}>
						<Text style={{ fontFamily: 'SemiBold', fontSize: wp(24) }}>
							{userInfo.following?.length || '0'}
						</Text>
						<Text>following</Text>
					</View>
					<Divider style={{ width: wp(0.8), height: '100%' }} />
					<View style={styles.meta}>
						<Text style={{ fontFamily: 'SemiBold', fontSize: wp(24) }}>
							{userInfo.followers?.length || '0'}
						</Text>
						<Text>followers</Text>
					</View>
				</View>
				<Divider />
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
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
