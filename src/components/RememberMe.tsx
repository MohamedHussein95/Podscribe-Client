import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Colors } from '../constants';
import { wp } from '../utils/Responsive_layout';

const RememberMe = ({ checked, onPress, style }) => {
	return (
		<View style={[styles.container, style]}>
			<View
				style={{
					alignSelf: 'center',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Checkbox
					status={checked ? 'checked' : 'unchecked'}
					onPress={onPress}
					color={Colors.primary900}
					uncheckedColor={Colors.primary900}
				/>
				<Text style={styles.rememberText}>Remember me</Text>
			</View>
		</View>
	);
};

export default memo(RememberMe);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	rememberText: {
		fontFamily: 'Bold',
		fontSize: wp(17),
		color: Colors.black,
	},
});
