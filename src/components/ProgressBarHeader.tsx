import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper';
import { Colors } from '../constants';
import { hp, wp } from '../utils/Responsive_layout';
import { StatusBar } from 'expo-status-bar';

const ProgressBarHeader = ({ num }) => {
	const [progress, setProgress] = useState(0.2 * num);
	return (
		<>
			<StatusBar style='dark' backgroundColor={Colors.white} />
			<Appbar.Header style={styles.header}>
				<Appbar.BackAction
					style={{
						margin: 0,
						padding: 0,
					}}
					size={25}
					onPress={() => {}}
				/>
				<ProgressBar
					progress={progress}
					color={Colors.primary900}
					style={{
						height: hp(12),
						width: wp(250),
						marginHorizontal: 20,
						borderRadius: 30,
						alignSelf: 'center',
					}}
				/>
			</Appbar.Header>
		</>
	);
};

export default memo(ProgressBarHeader);

const styles = StyleSheet.create({
	header: {
		margin: 0,
		paddingHorizontal: wp(5),
		backgroundColor: Colors.white,
	},
});
