import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants';
import { wp } from '../utils/Responsive_layout';

const PrimaryButton = ({ title, onPress, style, textStyle }) => {
	return (
		<TouchableOpacity
			style={{ ...styles.container, ...style }}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text
				style={{
					fontFamily: 'SemiBold',
					...textStyle,
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default PrimaryButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary900,
		justifyContent: 'center',
		alignItems: 'center',
		width: wp(150),
		padding: 10,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: Colors.primary900,
	},
});
