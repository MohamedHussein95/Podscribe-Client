import { IconType } from '@expo/vector-icons';
import React, { memo } from 'react';
import {
	StyleProp,
	StyleSheet,
	TextInput,
	TextStyle,
	TouchableOpacityProps,
	View,
	ViewStyle,
} from 'react-native';
import { Colors } from '../constants';
import { hp } from '../utils/Responsive_layout';

interface InputProps extends TouchableOpacityProps {
	IconPack?: IconType;
	icon?: string;
	iconRight?: string;
	active?: boolean;
	color?: string;
	containerStyle?: StyleProp<ViewStyle>;
	touched?: boolean;
	errors?: string;
	onPressIconRight?: () => void;
	onPressIconLeft?: () => void;
	size?: number;
	style?: StyleProp<TextStyle>;
	secureTextEntry?: boolean;
	type?: string;
	placeholder?: string;
}

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
}: InputProps) => {
	const handlePressIconLeft = () => {
		if (props.type === 'password') {
			props.secureTextEntry = !props.secureTextEntry;
		} else if (onPressIconLeft) {
			onPressIconLeft();
		}
	};

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
						color={active ? Colors.greyScale500 : undefined}
						onPress={handlePressIconLeft}
						style={[styles.icon]}
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
						color={active ? color : undefined}
						onPress={onPressIconRight}
						style={[styles.icon]}
					/>
				)}
			</View>
		</View>
	);
};

export default memo(Input);

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
	},
	inputContainer: {
		height: hp(60),
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		marginBottom: 5,
	},
	input: {
		flex: 1,
		paddingHorizontal: 10,
		fontSize: 18,
		fontFamily: 'Medium',
		color: Colors.greyScale900,
	},
	icon: {},
});
