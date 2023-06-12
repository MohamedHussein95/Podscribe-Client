import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants';
import { wp } from '../utils/Responsive_layout';

const SecondaryButton = ({ title, onPress, style }) => {
	return (
		<View style={{ ...styles.container, ...style }}>
			<Text style={{ color: Colors.primary900, fontFamily: 'SemiBold' }}>
				{title}
			</Text>
		</View>
	);
};

export default SecondaryButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		width: wp(150),
		padding: 10,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: Colors.primary900,
	},
});
