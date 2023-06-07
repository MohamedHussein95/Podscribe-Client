import React, { memo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../constants';
import { hp, wp } from '../utils/Responsive_layout';

const Input = ({
	IconPack,
	icon,
	iconRight,
	active,
	color,
	containerStyle,
	touched,
	errors,
	onPressIconRight,
	onPressIconLeft,
	...props
}) => {
	return (
		<View style={[styles.container, containerStyle]}>
			<View
				style={[
					styles.inputContainer,
					{
						backgroundColor: Colors.greyScale100,
						borderColor: Colors.primary500,
						borderWidth: active ? 1 : 0,
					},
				]}
			>
				{IconPack && (
					<IconPack
						name={icon}
						size={props.size || 24}
						color={active && Colors.greyScale500}
						onPress={
							props.type === 'password'
								? () => (props.secureTextEntry = !props.secureTextEntry)
								: onPressIconLeft
						}
						style={[styles.icon, props.iconStyle]}
					/>
				)}
				<TextInput
					{...props}
					style={[styles.input, props.style]}
					placeholderTextColor={Colors.greyScale500}
					cursorColor={Colors.greyScale700}
				/>
				{IconPack && (
					<IconPack
						name={iconRight}
						size={props.size || 24}
						color={active && color}
						onPress={onPressIconRight}
						style={[styles.icon, props.iconStyle]}
					/>
				)}
			</View>
		</View>
	);
};

export default memo(Input);

const styles = StyleSheet.create({
	input: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: '100%',
		fontSize: 18,
		fontFamily: 'Medium',
		color: Colors.greyScale900,
		height: '100%',
	},
	inputContainer: {
		height: hp(60),
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		marginBottom: 5,
	},
	container: {
		marginVertical: 10,
	},
	icon: {},
});
