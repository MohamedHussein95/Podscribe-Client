import React, { memo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../constants';
import { hp, wp } from '../utils/Responsive_layout';

const Input = ({
	IconPack,
	icon,
	color,
	containerStyle,
	touched,
	errors,
	onPress,

	...props
}) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput {...props} style={styles.input} />
			{IconPack && (
				<IconPack
					name={icon}
					size={props.size || wp(20)}
					color={color}
					onPress={onPress}
					style={styles.icon}
				/>
			)}
		</View>
	);
};

export default memo(Input);

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		height: hp(45),
		borderBottomColor: Colors.primary900,
		borderBottomWidth: 1,

		paddingVertical: 10,
		marginTop: 10,
		marginBottom: 15,
	},
	input: {
		flex: 1,
		fontFamily: 'Bold',
		fontSize: wp(20),
	},
	icon: {},
});
