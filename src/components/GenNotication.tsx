import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../utils/Responsive_layout';
import moment from 'moment';
import { Colors } from '../constants';

const GenNotification = ({ item }) => {
	const { articleId, avatar, cover, publicationTime, title, userId } = item;

	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Image
					source={{ uri: avatar }}
					resizeMode='contain'
					style={styles.avatar}
				/>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.time}>
					{moment(new Date(publicationTime)).calendar()}
				</Text>
			</View>
			<View style={styles.coverContainer}>
				{cover ? (
					<Image
						source={{ uri: cover }}
						style={styles.cover}
						resizeMode='cover'
					/>
				) : (
					<View style={styles.noCover}>
						<Image
							source={require('../../assets/images/logo_pl.png')}
							style={styles.logo}
							resizeMode='contain'
						/>
					</View>
				)}
			</View>
		</View>
	);
};

export default GenNotification;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: 8,
		marginVertical: 5,
	},
	avatarContainer: {
		marginRight: 10,
	},
	avatar: {
		width: wp(60),
		height: hp(60),
		borderRadius: wp(30),
	},
	contentContainer: {
		flex: 1,
	},
	title: {
		fontFamily: 'SemiBold',
		fontSize: wp(15),
		color: Colors.black,
		marginBottom: 5,
	},
	time: {
		color: Colors.greyScale700,
	},
	coverContainer: {
		marginLeft: 10,
	},
	cover: {
		width: wp(80),
		height: hp(60),
		borderRadius: 8,
	},
	noCover: {
		backgroundColor: Colors.greyScale300,
		width: wp(80),
		height: hp(60),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	logo: {
		width: wp(90),
		height: hp(90),
	},
});
