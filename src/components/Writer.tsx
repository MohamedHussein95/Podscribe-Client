import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';
import { hp, wp } from '../utils/Responsive_layout';

const Writer = ({ item }) => {
	const { avatar, fullName } = item;
	const lastName = fullName?.trimEnd().split(' ').pop();

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: avatar }}
				resizeMode='contain'
				style={styles.avatar}
			/>
			<Text style={styles.name}>{lastName}</Text>
		</View>
	);
};

export default Writer;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginRight: wp(5),
		paddingRight: 15,
		overflow: 'hidden',
	},
	avatar: {
		width: wp(60),
		height: hp(60),
		borderRadius: 50,
	},
	name: {
		fontFamily: 'SemiBold',
		fontSize: wp(15),
		color: Colors.black,
		textAlign: 'center',
		marginTop: 10,
	},
});
