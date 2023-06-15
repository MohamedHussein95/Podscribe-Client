import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { hp, wp } from '../utils/Responsive_layout';
import { Avatar } from 'react-native-paper';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';

const Article = ({ item }) => {
	const { cover, title, user, publicationTime } = item;
	const { bookMarks } = useSelector((state) => state.user);
	const { authInfo } = useSelector((state) => state.auth);
	const { uid } = authInfo;
	const owner = uid === user.id;

	const date = new Date(publicationTime);
	const postedAt = moment(date).fromNow();

	const navigation = useNavigation();

	const handleArticlePress = () => {
		navigation.navigate('ArticleDetailsScreen', { item });
	};

	return (
		<View style={[styles.article, { height: owner ? hp(100) : hp(120) }]}>
			<View>
				{cover ? (
					<Image source={{ uri: cover }} style={styles.cover} />
				) : (
					<View style={styles.noCover}>
						<Image
							source={require('../../assets/images/logo_pl.png')}
							style={styles.cover}
						/>
					</View>
				)}
			</View>
			<View
				style={[
					styles.body,
					{
						justifyContent: owner ? 'space-evenly' : 'space-between',
						marginVertical: owner ? 0 : 5,
					},
				]}
			>
				<TouchableOpacity activeOpacity={0.8} onPress={handleArticlePress}>
					<View style={styles.header}>
						<Text
							style={styles.title}
							numberOfLines={2}
							ellipsizeMode='tail'
						>
							{title}
						</Text>
					</View>
				</TouchableOpacity>
				{!owner && (
					<View style={styles.userContainer}>
						<Avatar.Image source={{ uri: user.avatar }} size={30} />
						<Text style={styles.userFullName}>{user.fullName}</Text>
					</View>
				)}
				<View style={styles.footer}>
					<Text>{postedAt}</Text>
					<View style={styles.iconContainer}>
						{owner ? (
							<>
								<MaterialCommunityIcons
									name='pencil-outline'
									color={Colors.greyScale800}
									size={20}
								/>
								<MaterialCommunityIcons
									name='dots-vertical'
									color={Colors.greyScale800}
									size={20}
								/>
							</>
						) : (
							<>
								<MaterialCommunityIcons
									name={
										bookMarks.includes(item.id)
											? 'bookmark-minus'
											: 'bookmark-minus-outline'
									}
									color={Colors.primary900}
									size={20}
								/>
								<MaterialCommunityIcons
									name='dots-vertical'
									color={Colors.greyScale800}
									size={20}
								/>
							</>
						)}
					</View>
				</View>
			</View>
		</View>
	);
};

export default memo(Article);

const styles = StyleSheet.create({
	article: {
		flexDirection: 'row',
		width: '100%',
		height: hp(120),
		alignSelf: 'center',
		marginVertical: 10,
		gap: 10,
	},
	cover: {
		width: wp(120),
		height: '100%',
		borderRadius: 5,
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	header: {},
	title: {
		fontFamily: 'SemiBold',
		fontSize: wp(18),
	},
	body: {
		justifyContent: 'space-between',
		width: '65%',
		marginVertical: 5,
	},
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	noCover: {
		backgroundColor: Colors.greyScale300,
		borderRadius: 5,
	},
	userFullName: {
		fontFamily: 'Regular',
		fontSize: wp(12),
		color: Colors.primary900,
	},
});
