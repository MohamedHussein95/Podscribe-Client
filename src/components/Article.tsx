import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { DEVICE_HEIGHT, hp, wp } from '../utils/Responsive_layout';
import { Colors } from '../constants';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Article = ({ item }) => {
	const { authInfo } = useSelector((state) => state.auth);
	const { uid } = authInfo;
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: item.coverImage }}
				resizeMode='cover'
				style={styles.image}
			/>
			<View style={styles.body}>
				<View style={styles.titleContainer}>
					<Text
						style={styles.title}
						numberOfLines={2}
						ellipsizeMode='tail'
					>
						{item.title}
					</Text>
				</View>
				{item.user && (
					<View style={styles.user}>
						<Avatar.Image source={{ uri: item.user.avatar }} size={25} />
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							style={{
								fontSize: wp(12),
								color: Colors.primary900,
								fontFamily: 'Regular',
							}}
						>
							{item.user.fullName}
						</Text>
					</View>
				)}

				<View style={styles.footer}>
					<Text
						style={{
							flex: 1,
							color: Colors.greyScale700,
						}}
					>
						{moment(new Date(item.publicationTime)).fromNow()}
					</Text>
					{uid === item.id && (
						<>
							<MaterialCommunityIcons
								name='pencil-outline'
								size={25}
								color={Colors.greyScale700}
							/>
							<MaterialCommunityIcons
								name='dots-vertical'
								size={25}
								style={{ marginLeft: 5 }}
								color={Colors.greyScale700}
							/>
						</>
					)}
					{uid !== item.id && (
						<>
							<MaterialCommunityIcons
								name='bookmark-minus-outline'
								size={25}
								color={Colors.greyScale700}
							/>
							<MaterialCommunityIcons
								name='dots-vertical'
								size={25}
								style={{ marginLeft: 5 }}
								color={Colors.greyScale700}
							/>
						</>
					)}
				</View>
			</View>
		</View>
	);
};

export default memo(Article);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 15,
		width: '100%',
		marginVertical: 10,
		alignItems: 'center',
	},
	image: { width: wp(120), height: hp(120), borderRadius: 10 },
	body: {
		width: wp(235),
	},
	title: { fontFamily: 'Bold', fontSize: wp(18) },
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleContainer: {},
	user: {
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
		marginVertical: 4,
	},
	fullName: {},
});
