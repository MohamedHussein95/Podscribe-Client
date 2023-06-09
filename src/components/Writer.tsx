import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { hp, wp } from '../utils/Responsive_layout';
import { Colors } from '../constants';

const Writer = ({ item }) => {
	const { photo, name } = item;
	return (
		<View style={styles.writer}>
			<Image
				source={{ uri: photo }}
				resizeMode='contain'
				style={{
					width: wp(70),
					height: hp(70),
					backgroundColor: 'yellow',
					justifyContent: 'flex-end',
					alignItems: 'flex-start',
					borderRadius: 50,
				}}
			/>
			<View>
				<Text style={styles.name}>{name}</Text>
			</View>
		</View>
	);
};

export default Writer;

const styles = StyleSheet.create({
	writer: {
		width: wp(100),
		height: hp(100),
		overflow: 'hidden',
		gap: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	name: {
		fontFamily: 'SemiBold',
		color: Colors.black,
		fontSize: wp(15),
		textAlign: 'center',
	},
});
