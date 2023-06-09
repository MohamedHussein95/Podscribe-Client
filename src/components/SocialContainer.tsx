import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants';
import { hp, wp } from '../utils/Responsive_layout';

const SocialContainer = ({ logo, title, style }) => {
	return (
		<TouchableOpacity
			style={{ ...styles.container, ...style }}
			activeOpacity={0.8}
		>
			<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
				<Image
					source={{ uri: logo }}
					style={{ width: wp(25), height: hp(25) }}
					resizeMode='cover'
				/>
				{title && (
					<Text
						style={{
							fontFamily: 'SemiBold',
							fontSize: wp(15),
							color: Colors.dark2,
						}}
					>
						{title}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default SocialContainer;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		borderWidth: 1,
		borderColor: Colors.greyScale300,
		padding: 15,
		width: '80%',
		marginVertical: 15,
		borderRadius: 33,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
