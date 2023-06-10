import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo, useState } from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Colors } from '../constants';
import {
	DEVICE_HEIGHT,
	DEVICE_WIDTH,
	hp,
	wp,
} from '../utils/Responsive_layout';
import * as yup from 'yup';
import { Formik } from 'formik';
import SetupInput from './SetupInput';
import RememberMe from './RememberMe';
import { useCreateUserMutation } from '../store/userApiSlice';
import { setCredentials, setUserInfo } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../store/userSlice';
import { toastConfig } from '../../toastConfig';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const registerValidationSchema = yup.object().shape({
	userName: yup.string().required('this field is required'),

	email: yup
		.string()
		.email('please enter a valid email')
		.required('this field is required'),
	password: yup
		.string()
		.min(6, ({ min }) => `password must be atleast ${min} characters`)
		.required('this field is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'passwords do not match')
		.required('this field is required'),
});

const CreateAccountForm = ({ onPress }) => {
	const { userInfo } = useSelector((state) => state.user);
	const [checked, setChecked] = useState(true);
	const [loading, setLoading] = useState(false);
	const [createUser] = useCreateUserMutation();
	const dispatch = useDispatch();

	const handleSignUp = async (
		email: string,
		password: string,
		userName: string
	) => {
		try {
			setLoading(true);
			const credentionals = await createUser({
				email,
				password,
				phoneNumber: userInfo.phoneNumber,
				photoURL: userInfo.avatar,
			}).unwrap();
			console.log(credentionals);

			dispatch(setUserInfo(credentionals));
			dispatch(
				updateUserInfo({
					userName,
				})
			);
			onPress();
		} catch (error) {
			setLoading(false);
			//console.log(error);
			Toast.show({
				type: 'error',
				text1: `${error || error?.data?.message || error?.error}`,
				position: 'top',
			});
		}
	};

	return (
		<View style={styles.screen}>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<View>
					<Text style={styles.titleText}>Create an account 🔐</Text>
				</View>
				<View style={{ marginBottom: 35 }}>
					<Text style={styles.subTitleText}>
						enter your username,email & password.Incase you forget your
						password navigate to forgot password screen
					</Text>
				</View>

				<Formik
					initialValues={{
						userName: '',
						email: '',
						password: '',
						confirmPassword: '',
					}}
					validationSchema={registerValidationSchema}
					onSubmit={(values) =>
						handleSignUp(values.email, values.password, values.userName)
					}
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
								<Text style={styles.inputTitle}>username</Text>
								<SetupInput
									name='Username'
									placeholder={'Username'}
									onChangeText={handleChange('userName')}
									onBlur={handleBlur('userName')}
									value={values.userName}
									autoCapitalize='none'
									autoCorrect={true}
									keyboardType='default'
								/>
								{errors && touched && (
									<View style={styles.errorContainer}>
										<Text style={styles.errorText}>
											{errors.userName}
										</Text>
									</View>
								)}
							</View>
							<View>
								<Text style={styles.inputTitle}>Email</Text>
								<SetupInput
									name='Email'
									placeholder={'Email'}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									autoCapitalize='none'
									keyboardType='email-address'
								/>
								{errors && touched && (
									<View style={styles.errorContainer}>
										<Text style={styles.errorText}>
											{errors.email}
										</Text>
									</View>
								)}
							</View>
							<View>
								<Text style={styles.inputTitle}>Password</Text>
								<SetupInput
									name='Password'
									placeholder={'Password'}
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									autoCapitalize='none'
									keyboardType='default'
									icon={'eye-off'}
									IconPack={Ionicons}
									color={Colors.primary900}
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
								<Text style={styles.inputTitle}>Confirm Password</Text>
								<SetupInput
									name='ConfirmPassword'
									placeholder={'Confirm Password'}
									onChangeText={handleChange('confirmPassword')}
									onBlur={handleBlur('confirmPassword')}
									value={values.confirmPassword}
									autoCapitalize='none'
									keyboardType='default'
									icon={'eye-off'}
									IconPack={Ionicons}
									color={Colors.primary900}
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
										backgroundColor: !isValid
											? Colors.disabled
											: Colors.primary900,
									}}
									activeOpacity={0.8}
									onPress={handleSubmit}
									disabled={!isValid}
								>
									{loading ? (
										<ActivityIndicator
											size={'small'}
											color={Colors.white}
										/>
									) : (
										<Text
											style={{
												color: Colors.white,
												fontFamily: 'Bold',
											}}
										>
											Continue
										</Text>
									)}
								</TouchableOpacity>
							</View>
						</>
					)}
				</Formik>
			</ScrollView>
		</View>
	);
};

export default memo(CreateAccountForm);

const styles = StyleSheet.create({
	screen: {
		width: DEVICE_WIDTH,
		marginTop: 20,
		paddingHorizontal: wp(15),
	},
	titleText: {
		fontSize: wp(34),
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
	},
	inputTitle: {
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
	},
	avatarContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		marginVertical: 15,
		width: wp(90),
		height: hp(90),
	},
	input: {
		backgroundColor: Colors.white,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		alignSelf: 'center',
		width: DEVICE_WIDTH,
		backgroundColor: 'transparent',
	},
	button: {
		width: wp(300),
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginVertical: 10,
	},
	errorContainer: { flex: 1, alignSelf: 'flex-start' },
	errorText: { color: Colors.error },
});
