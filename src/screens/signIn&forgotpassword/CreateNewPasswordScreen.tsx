import { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Appbar, Modal, Portal } from 'react-native-paper';
import * as yup from 'yup';
import { DEVICE_HEIGHT, DEVICE_WIDTH, wp } from '../../utils/Responsive_layout';
import { Formik } from 'formik';
import SetupInput from '../../components/SetupInput';
import RememberMe from '../../components/RememberMe';
import { Colors } from '../../constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setAuth, setDidTryAutoLogin } from '../../store/authSlice';

const NewPasswordValidationSchema = yup.object().shape({
	password: yup
		.string()
		.min(6, ({ min }) => `password must be atleast ${min} characters`)
		.required('this field is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'passwords do not match')
		.required('this field is required'),
});
const CreateNewPasswordScreen = ({ navigation }) => {
	const [checked, setChecked] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handlePasswordChange = (password, confirmPassword) => {
		try {
			setModalVisible(true);
		} catch (error) {
			console.log(error);
		}
	};
	const handleGoToHome = () => {
		try {
			setLoading(true);
			dispatch(setAuth());
			dispatch(setDidTryAutoLogin());
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<View style={styles.screen}>
			<ScrollView style={{ flex: 1 }}>
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
				<View
					style={{
						paddingHorizontal: wp(15),
					}}
				>
					<View>
						<Text style={styles.titleText}>Create New Password 🔐</Text>
					</View>
					<View>
						<Text style={styles.subTitleText}>
							Enter your new password .Incase you forget your password
							navigate to forgot password screen
						</Text>
					</View>
					<Formik
						initialValues={{
							password: '',
							confirmPassword: '',
						}}
						validationSchema={NewPasswordValidationSchema}
						onSubmit={(values) => {
							handleSign(values.email, values.password);
						}}
					>
						{({
							handleChange,
							handleBlur,
							handleReset,
							handleSubmit,
							values,
							errors,
							touched,
							isValid,
						}) => (
							<>
								<View>
									<Text style={styles.inputTitle}>Password</Text>
									<SetupInput
										name='password'
										placeholder={'Password'}
										onChangeText={handleChange('password')}
										onBlur={handleBlur('password')}
										value={values.password}
										autoCapitalize='none'
										keyboardType='default'
										secureTextEntry={showPassword ? false : true}
										icon={showPassword ? 'eye' : 'eye-off'}
										IconPack={Ionicons}
										color={Colors.primary900}
										onPress={() => setShowPassword((prev) => !prev)}
									/>
									{errors && touched && (
										<View style={styles.errorContainer}>
											<Text style={styles.errorText}>
												{errors.password}
											</Text>
										</View>
									)}
								</View>
								<View>
									<Text style={styles.inputTitle}>
										confirm Password
									</Text>
									<SetupInput
										name='confirmPassword'
										placeholder={'confirmPassword'}
										onChangeText={handleChange('confirmPassword')}
										onBlur={handleBlur('confirmPassword')}
										value={values.confirmPassword}
										autoCapitalize='none'
										keyboardType='default'
										secureTextEntry={showPassword ? false : true}
										icon={showPassword ? 'eye' : 'eye-off'}
										IconPack={Ionicons}
										color={Colors.primary900}
										onPress={() => setShowPassword((prev) => !prev)}
									/>
									{errors && touched && (
										<View style={styles.errorContainer}>
											<Text style={styles.errorText}>
												{errors.confirmPassword}
											</Text>
										</View>
									)}
								</View>
								<RememberMe
									checked={checked}
									onPress={() => setChecked(!checked)}
								/>
								<View style={styles.footer}>
									<TouchableOpacity
										style={{
											...styles.button,
											backgroundColor: Colors.primary900,
										}}
										activeOpacity={0.8}
										onPress={handlePasswordChange}
										disabled={false}
									>
										<Text
											style={{
												color: Colors.white,
												fontFamily: 'Bold',
											}}
										>
											Continue
										</Text>
									</TouchableOpacity>
								</View>
							</>
						)}
					</Formik>
				</View>
			</ScrollView>
			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={() => setModalVisible((prev) => !prev)}
					contentContainerStyle={styles.containerStyle}
				>
					<View
						style={{
							backgroundColor: Colors.primary900,
							padding: 30,
							borderRadius: 500,
						}}
					>
						<MaterialCommunityIcons
							name='checkbox-marked'
							size={50}
							color={Colors.white}
						/>
					</View>
					<View
						style={{
							padding: 30,
						}}
					>
						<Text
							style={{
								fontFamily: 'Bold',
								fontSize: wp(24),
								color: Colors.primary900,
								textAlign: 'center',
							}}
						>
							{' '}
							Reset Password Successfull!
						</Text>
					</View>
					<View style={{ marginVertical: 20 }}>
						<Text
							style={{
								fontFamily: 'Medium',
								fontSize: wp(17),
								color: Colors.black,
								textAlign: 'center',
							}}
						>
							Your password has been successfully changed
						</Text>
					</View>
					<TouchableOpacity
						style={{
							...styles.button,
							backgroundColor: Colors.primary900,
							width: wp(250),
							position: 'absolute',
							bottom: 10,
						}}
						activeOpacity={0.8}
						onPress={handleGoToHome}
					>
						{loading ? (
							<ActivityIndicator size={'small'} color={Colors.white} />
						) : (
							<Text
								style={{
									color: Colors.white,
									fontFamily: 'Bold',
								}}
							>
								Go to Home
							</Text>
						)}
					</TouchableOpacity>
				</Modal>
			</Portal>
		</View>
	);
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
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
	},
	inputTitle: {
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
	},
	errorContainer: { alignSelf: 'flex-start' },
	errorText: { color: Colors.error },
	modalTitle: {
		fontSize: 24,
		fontFamily: 'Bold',
		textAlign: 'center',
		color: Colors.primary500,
	},
	modalContent: {
		fontSize: 18,
		fontFamily: 'Medium',
		textAlign: 'center',
		color: Colors.dark1,
		marginVertical: 14,
		marginBottom: 50,
	},
	modalImage: {
		width: '100%',
		height: 200,
		resizeMode: 'contain',
	},
	containerStyle: {
		backgroundColor: Colors.white,
		padding: 20,
		height: DEVICE_HEIGHT * 0.6,
		width: '80%',
		alignSelf: 'center',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 0,
	},
});
