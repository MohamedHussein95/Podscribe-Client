import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../../constants';
import { Appbar, Avatar, Divider } from 'react-native-paper';
import { hp, wp } from '../../utils/Responsive_layout';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { useUpdateArticleReadsMutation } from '../../store/articleApiSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const ArticleDetailsScreen = ({ route, navigation }) => {
	const { authInfo } = useSelector((state) => state.auth);
	const { id, title, cover, user, publicationTime, reads } = route.params.item;
	//console.log(route.params.item);

	const alreadyRead = reads?.includes(authInfo.uid);

	const [updateReads] = useUpdateArticleReadsMutation();

	useEffect(() => {
		const updateArticleReads = async () => {
			try {
				if (!alreadyRead) {
					const aId = id;
					console.log(id);

					const uId = { uId: authInfo.uid };
					const data = await updateReads({
						uId,
						aId,
					}).unwrap();
				}
			} catch (error) {
				console.log(error);

				Toast.show({
					type: 'error',
					text1: `${error?.data?.message || error?.error || error}`,
					position: 'top',
				});
			}
		};
		updateArticleReads();
	}, []);
	return (
		<View style={styles.screen}>
			<StatusBar style='dark' />
			<ImageBackground
				source={{ uri: cover }}
				style={{ width: '100%', height: hp(400) }}
				resizeMode='cover'
			>
				<Appbar.Header
					style={{
						justifyContent: 'space-between',
						backgroundColor: 'transparent',
					}}
				>
					<Appbar.BackAction
						color={Colors.white}
						onPress={() => navigation.goBack()}
					/>
					<View style={{ flexDirection: 'row' }}>
						<Appbar.Action
							icon={'bookmark-minus-outline'}
							size={30}
							color={Colors.white}
						/>
						<Appbar.Action
							icon={'share-outline'}
							size={30}
							color={Colors.white}
						/>
						<Appbar.Action
							icon={'dots-horizontal-circle-outline'}
							size={30}
							color={Colors.white}
						/>
					</View>
				</Appbar.Header>
			</ImageBackground>
			<View style={{ paddingHorizontal: 15 }}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
				</View>

				<View style={{ marginVertical: 10 }}>
					<Divider />
					<View>
						<TouchableOpacity style={styles.container} onPress={() => {}}>
							<Avatar.Image source={{ uri: user?.avatar }} size={60} />
							<View style={{ flex: 1, gap: 5 }}>
								<Text style={styles.fullName}>{user?.fullName}</Text>
								<Text style={styles.userName}>{user?.userName}</Text>
							</View>
							<View style={styles.follow}>
								<Text
									style={{ color: Colors.white, fontFamily: 'Bold' }}
								>
									follow
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Divider />
				</View>
			</View>
		</View>
	);
};

export default ArticleDetailsScreen;

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
		width: wp(350),
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
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
	follow: {
		backgroundColor: Colors.primary900,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		width: wp(90),
	},
});
