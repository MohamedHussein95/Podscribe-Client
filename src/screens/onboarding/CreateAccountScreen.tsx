import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, ProgressBar } from 'react-native-paper';
import { Colors } from '../../constants';
import { DEVICE_WIDTH, hp, wp } from '../../utils/Responsive_layout';
import OnboardingScreen from './OnboardingScreen';
const CreateAccountScreen = () => {
	const [progress, setProgress] = useState(0.2);
	return (
		<View style={styles.screen}>
			<Appbar.Header style={styles.header}>
				<Appbar.BackAction />
				<ProgressBar
					progress={progress}
					color={Colors.primary900}
					style={{
						height: hp(20),
						width: wp(250),
						margin: 10,
						marginLeft: 20,
						borderRadius: 30,
					}}
				/>
			</Appbar.Header>

			<ScrollView style={{ flex: 1 }}></ScrollView>

			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.8}
					onPress={() => setProgress((prev) => prev + 0.2)}
				>
					<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
						Next
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	header: {},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		position: 'absolute',
		bottom: 0,
		width: DEVICE_WIDTH,
	},
	button: {
		backgroundColor: Colors.primary900,
		width: wp(300),
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginVertical: 20,
	},
});
