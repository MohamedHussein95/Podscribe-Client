import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { hp, wp } from '../utils/Responsive_layout';
import { Colors } from '../constants';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item }: any) => {
	const { title, photo, user, postedAt } = item;
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => navigation.navigate('ArticleDetailsScreen', { item })}
		>
			<View style={styles.card}>
				<ImageBackground
					source={{ uri: photo }}
					style={{
						borderRadius: 10,
						width: wp(200),
						height: hp(150),
						backgroundColor: 'yellow',
					}}
					resizeMode='cover'
				>
					<View
						style={{
							alignSelf: 'flex-end',
							backgroundColor: Colors.primary900,
							margin: 5,
							borderRadius: 33,
							padding: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<MaterialCommunityIcons
							name='bookmark-minus-outline'
							size={25}
							color={Colors.white}
						/>
					</View>
				</ImageBackground>

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
							{user.fullName}
						</Text>
					</View>
					<View style={styles.timeContainer}>
						<Text
							style={styles.time}
							numberOfLines={1}
							ellipsizeMode='tail'
						>
							{moment(postedAt).fromNow()}
						</Text>
						<MaterialCommunityIcons name='dots-vertical' size={15} />
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 10,
		width: wp(200),
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	titleContainer: {
		alignSelf: 'flex-start',
		marginVertical: 5,
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
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		width: wp(80),
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
	},
});
