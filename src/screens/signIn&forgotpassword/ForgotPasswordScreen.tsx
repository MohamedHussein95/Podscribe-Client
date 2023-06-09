import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { DEVICE_WIDTH, wp } from '../../utils/Responsive_layout';
import { Colors } from '../../constants';
import SetupInput from '../../components/SetupInput';

const ForgotPasswordScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	return (
		<View style={styles.screen}>
			<Appbar.Header style={styles.header}>
				<Appbar.BackAction
					style={{
						margin: 0,
						padding: 0,
					}}
					size={25}
					onPress={() => navigation.pop()}
				/>
			</Appbar.Header>
			<View style={{ paddingHorizontal: wp(15), flex: 1 }}>
				<View>
					<Text style={styles.titleText}>Forgot Password 🔑</Text>
				</View>
				<View>
					<Text style={styles.subTitleText}>
						Enter your email address .We will send an OTP code for
						verification in the next step
					</Text>
				</View>
				<View>
					<Text style={styles.inputTitle}>Email</Text>
					<SetupInput
						placeholder={'Email'}
						onChangeText={setEmail}
						value={email}
						autoCapitalize='none'
						keyboardType='email-address'
					/>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity
						style={{
							...styles.button,
							backgroundColor:
								email.trim().length === 0
									? Colors.disabled
									: Colors.primary900,
						}}
						activeOpacity={0.8}
						onPress={() => navigation.navigate('OtpScreen')}
						disabled={email.trim().length === 0}
					>
						<Text
							style={{
								color: Colors.white,
								fontFamily: 'Bold',
							}}
						>
							Sign In
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
	screen: {
		width: DEVICE_WIDTH,

		backgroundColor: Colors.white,
		height: '100%',
	},
	titleText: {
		fontSize: wp(30),
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
		marginBottom: 15,
	},
	subTitleText: {
		fontSize: wp(17),
		fontFamily: 'Regular',
		color: Colors.black,
		textAlign: 'left',
		marginBottom: 20,
	},
	header: {},
	button: {
		width: wp(360),
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginVertical: 10,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		alignSelf: 'center',
		width: DEVICE_WIDTH,
		position: 'absolute',
		bottom: 0,
	},
});
