import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { hp, wp } from '../utils/Responsive_layout';
import { Colors } from '../constants';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAddToBookMarksMutation } from '../store/articleApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setBookMarks } from '../store/userSlice';
import { ImageBackground } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Card = ({ item }) => {
	const { title, cover, user, postedAt } = item;
	const { authInfo } = useSelector((state) => state.auth);
	const { bookMarks } = useSelector((state) => state.user);

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [addToBookMarks] = useAddToBookMarksMutation();

	const handleBookMark = async () => {
		const body = {
			id: authInfo.uid,
		};

		try {
			const bookMarksData = await addToBookMarks({
				body,
				aid: item.id,
			}).unwrap();
			dispatch(setBookMarks(bookMarksData));
			Toast.show({
				type: 'success',
				text1: `Added To Bookmarks`,
				position: 'top',
			});
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: `${error?.data?.message || error?.error || error}`,
				position: 'top',
			});
		}
	};

	const navigateToArticleDetails = () => {
		navigation.navigate('ArticleDetailsScreen', { item });
	};

	const renderCoverImage = () => {
		if (cover) {
			return (
				<ImageBackground
					source={{ uri: cover }}
					style={styles.cover}
					resizeMode='cover'
				>
					<View style={styles.bookmarkContainer}>
						<TouchableOpacity onPress={handleBookMark}>
							<MaterialCommunityIcons
								name={
									bookMarks.includes(item.id)
										? 'bookmark-minus'
										: 'bookmark-minus-outline'
								}
								size={25}
								color={Colors.white}
							/>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			);
		} else {
			return (
				<View style={styles.noCover}>
					<Image
						source={require('../../assets/images/logo_pl.png')}
						style={styles.cover}
					/>
				</View>
			);
		}
	};

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={navigateToArticleDetails}>
			<View style={styles.card}>
				{renderCoverImage()}

				<View style={styles.titleContainer}>
					<Text
						style={styles.title}
						numberOfLines={2}
						ellipsizeMode='tail'
					>
						{title}
					</Text>
				</View>
				<View style={styles.footer}>
					<View style={styles.userContainer}>
						<Avatar.Image source={{ uri: user.avatar }} size={30} />
						<Text
							style={styles.userName}
							numberOfLines={1}
							ellipsizeMode='tail'
						>
							{user.fullName.trimEnd().split(' ').pop()}
						</Text>
					</View>
					<View style={styles.timeContainer}>
						<Text
							style={styles.time}
							numberOfLines={1}
							ellipsizeMode='tail'
						>
							{moment(postedAt).fromNow(true)}
						</Text>
						<MaterialCommunityIcons name='dots-vertical' size={18} />
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default memo(Card);

const styles = StyleSheet.create({
	card: {
		marginRight: 5,
		width: wp(200),
		alignItems: 'center',
		overflow: 'hidden',
		height: hp(240),
		borderRadius: 8,
		backgroundColor: Colors.white,
	},
	bookmarkContainer: {
		position: 'absolute',
		top: 5,
		right: 5,
		backgroundColor: Colors.primary900,
		borderRadius: 16,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		alignSelf: 'flex-start',
		marginVertical: 5,
		paddingHorizontal: 10,
	},
	title: {
		fontFamily: 'SemiBold',
		fontSize: wp(18),
		color: Colors.black,
		textAlign: 'left',
	},
	footer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		bottom: 0,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		width: wp(100),
	},
	timeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	time: {
		fontFamily: 'Regular',
		fontSize: wp(12),
		color: Colors.greyScale600,
	},
	userName: {
		fontFamily: 'SemiBold',
		fontSize: wp(12),
		color: Colors.primary900,
		width: '90%',
	},
	noCover: {
		backgroundColor: Colors.greyScale300,
		width: wp(200),
		height: hp(150),
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cover: {
		width: wp(200),
		height: hp(150),
		borderRadius: 8,
	},
});
