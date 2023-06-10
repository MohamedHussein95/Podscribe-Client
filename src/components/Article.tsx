import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Colors } from '../constants';
import { hp, wp } from '../utils/Responsive_layout';

const Article = ({ item }) => {
	const { authInfo } = useSelector((state) => state.auth);
	const { uid } = authInfo;

	const owner = item?.user?.id === uid;

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: item?.cover }}
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
						{item?.title}
					</Text>
				</View>

				{!owner && (
					<View style={styles.user}>
						<Avatar.Image
							source={{ uri: item?.user?.avatar }}
							size={25}
						/>
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							style={{
								fontSize: wp(12),
								color: Colors.primary900,
								fontFamily: 'Regular',
							}}
						>
							{item?.user?.fullName}
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
						{moment(new Date(item?.publicationTime)).fromNow()}
					</Text>
					{owner && (
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
					{!owner && (
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
	image: { width: wp(120), height: hp(100), borderRadius: 10 },
	body: { gap: 10 },
	title: {
		fontFamily: 'Bold',
		fontSize: wp(18),

		textAlign: 'left',
	},
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
