import React, { useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Colors } from '../../constants';
import { DEVICE_WIDTH, wp } from '../../utils/Responsive_layout';

const OtpScreen = ({ navigation }) => {
	const firstInput = useRef(),
		secondInput = useRef(),
		thirdInput = useRef(),
		fourthInput = useRef();
	const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });
	const [seconds, setSeconds] = useState(59);

	const [focused, setFocused] = useState(1);

	const handleInputKeyPress = (event, ref, prevRef) => {
		if (
			event.nativeEvent.key === 'Backspace' &&
			!event.nativeEvent.text &&
			prevRef
		) {
			prevRef.current.focus();
		}
	};
	useEffect(() => {
		let interval = null;
		if (seconds > 0) {
			interval = setInterval(() => {
				setSeconds(seconds - 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [seconds]);

	const displayTime = () => {
		//const min = Math.floor(seconds / 60);
		const sec = seconds % 60;
		const formattedSec = sec < 10 ? `0${sec}` : sec;
		return `${formattedSec}`;
	};

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
					<Text style={styles.titleText}>You've Got Mail 📩</Text>
				</View>
				<View>
					<Text style={styles.subTitleText}>
						We have sent the OTP verification code to your email
						address.Check your email and enter the code below
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<View
						style={{
							...styles.otpBox,
							backgroundColor:
								focused === 1 ? Colors.primary100 : Colors.greyScale100,
							borderColor:
								focused === 1 ? Colors.primary900 : Colors.greyScale100,
						}}
					>
						<TextInput
							style={styles.otpText}
							keyboardType='number-pad'
							maxLength={1}
							ref={firstInput}
							onChangeText={(text) => {
								setOtp({ ...otp, 1: text });
								text && secondInput.current.focus();
							}}
							onKeyPress={(event) =>
								handleInputKeyPress(event, firstInput, null)
							}
							autoFocus
							onFocus={() => setFocused(1)}
							cursorColor={Colors.primary900}
						/>
					</View>
					<View
						style={{
							...styles.otpBox,
							backgroundColor:
								focused === 2 ? Colors.primary100 : Colors.greyScale100,
							borderColor:
								focused === 2 ? Colors.primary900 : Colors.greyScale100,
						}}
					>
						<TextInput
							style={styles.otpText}
							keyboardType='number-pad'
							maxLength={1}
							ref={secondInput}
							onChangeText={(text) => {
								setOtp({ ...otp, 2: text });
								text
									? thirdInput.current.focus()
									: firstInput.current.focus();
							}}
							onKeyPress={(event) =>
								handleInputKeyPress(event, secondInput, firstInput)
							}
							onFocus={() => setFocused(2)}
							cursorColor={Colors.primary900}
						/>
					</View>
					<View
						style={{
							...styles.otpBox,
							backgroundColor:
								focused === 3 ? Colors.primary100 : Colors.greyScale100,
							borderColor:
								focused === 3 ? Colors.primary900 : Colors.greyScale100,
						}}
					>
						<TextInput
							style={styles.otpText}
							keyboardType='number-pad'
							maxLength={1}
							ref={thirdInput}
							onChangeText={(text) => {
								setOtp({ ...otp, 3: text });
								text
									? fourthInput.current.focus()
									: secondInput.current.focus();
							}}
							onKeyPress={(event) =>
								handleInputKeyPress(event, thirdInput, secondInput)
							}
							onFocus={() => setFocused(3)}
							cursorColor={Colors.primary900}
						/>
					</View>
					<View
						style={{
							...styles.otpBox,
							backgroundColor:
								focused === 4 ? Colors.primary100 : Colors.greyScale100,
							borderColor:
								focused === 4 ? Colors.primary900 : Colors.greyScale100,
						}}
					>
						<TextInput
							style={styles.otpText}
							keyboardType='number-pad'
							maxLength={1}
							ref={fourthInput}
							onChangeText={(text) => {
								setOtp({ ...otp, 4: text });
								!text && thirdInput.current.focus();
							}}
							onKeyPress={(event) =>
								handleInputKeyPress(event, fourthInput, thirdInput)
							}
							onFocus={() => setFocused(4)}
							cursorColor={Colors.primary900}
						/>
					</View>
				</View>
				{seconds === 0 ? (
					<Text onPress={() => setSeconds(59)} style={styles.timerText}>
						Resend
					</Text>
				) : (
					<Text style={styles.content}>
						You can resend code in{' '}
						<Text style={styles.timerText}>{displayTime()}</Text> s
					</Text>
				)}
				<View style={styles.footer}>
					<TouchableOpacity
						style={{
							...styles.button,
							backgroundColor:
								otp[4] === '' ||
								otp[3] === '' ||
								otp[2] === '' ||
								otp[1] === ''
									? Colors.disabled
									: Colors.primary900,
						}}
						activeOpacity={0.8}
						onPress={() => navigation.navigate('CreateNewPasswordScreen')}
						disabled={
							otp[4] === '' ||
							otp[3] === '' ||
							otp[2] === '' ||
							otp[1] === ''
						}
					>
						<Text
							style={{
								color: Colors.white,
								fontFamily: 'Bold',
							}}
						>
							Confirm
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default OtpScreen;

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
	inputContainer: {
		marginHorizontal: 20,
		marginBottom: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		alignSelf: 'center',
	},
	otpBox: {
		borderRadius: 12,
		borderWidth: 1,
		width: DEVICE_WIDTH / 5.15,
	},
	otpText: {
		fontSize: 25,
		color: Colors.dark2,
		fontFamily: 'Bold',
		padding: 0,
		textAlign: 'center',
		paddingHorizontal: 18,
		paddingVertical: 10,
	},
	timerText: {
		fontSize: 18,
		fontFamily: 'Bold',
		lineHeight: 18 * 1.4,
		color: Colors.primary500,
		alignSelf: 'center',
	},
	content: {
		fontSize: 18,
		fontFamily: 'Medium',
		textAlign: 'center',
		color: Colors.dark1,
		marginVertical: 14,
	},
});
