import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { hp, wp } from '../utils/Responsive_layout';
import { Colors } from '../constants';

const Writer = ({ item }) => {
	const { avatar, fullName } = item;
	const lastName = fullName.trimEnd().split(' ').pop();

	return (
		<View style={styles.writer}>
			<Image
				source={{ uri: avatar }}
				resizeMode='contain'
				style={{
					width: wp(60),
					height: hp(60),
					justifyContent: 'flex-end',
					alignItems: 'flex-start',
					borderRadius: 50,
				}}
			/>
			<View>
				<Text style={styles.name}>{lastName}</Text>
			</View>
		</View>
	);
};

export default Writer;

const styles = StyleSheet.create({
	writer: {
		overflow: 'hidden',
		gap: 4,
		justifyContent: 'center',
		alignItems: 'center',

		paddingRight: 15,
		marginRight: wp(5),
	},
	name: {
		fontFamily: 'SemiBold',
		color: Colors.black,
		fontSize: wp(15),
		textAlign: 'center',
	},
});
