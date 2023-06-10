import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import RememberMe from '../../components/RememberMe';
import SetupInput from '../../components/SetupInput';
import SocialContainer from '../../components/SocialContainer';
import { Colors } from '../../constants';
import { setCredentials } from '../../store/authSlice';
import { useGetUserMutation } from '../../store/userApiSlice';
import { updateUserInfo } from '../../store/userSlice';
import { DEVICE_WIDTH, wp } from '../../utils/Responsive_layout';
import { signInUser } from '../../utils/authActions';

const signInValidationSchema = yup.object().shape({
	email: yup.string().required('this field is required'),
	password: yup.string().required('this field is required'),
});
const SignInScreen = ({ navigation }) => {
	const [checked, setChecked] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const [getUser] = useGetUserMutation();
	const dispatch = useDispatch();

	const handleSign = async (email: string, password: string) => {
		try {
			setLoading(true);

			const credentials = await signInUser(email, password);
			const userId = credentials.uid;
			console.log(userId);

			const userData = await getUser(userId).unwrap();
			console.log(userData.userData);

			dispatch(updateUserInfo(userData.userData));
			dispatch(setCredentials(credentials));

			setLoading(false);
		} catch (error) {
			//console.log(error);
			setLoading(false);
			Toast.show({
				type: 'error',
				text1: `${error || error?.data?.message || error?.error}`,
				position: 'top',
			});
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
				<View style={{ paddingHorizontal: wp(15) }}>
					<View>
						<Text style={styles.titleText}>Hello there 👋</Text>
					</View>
					<View>
						<Text style={styles.subTitleText}>
							Please enter your email and password to sign in
						</Text>
					</View>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={signInValidationSchema}
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
									<Text style={styles.inputTitle}>Email</Text>
									<SetupInput
										name='email'
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
								<RememberMe
									checked={checked}
									onPress={() => setChecked(!checked)}
								/>
								<Divider style={{ marginTop: 15 }} />
								<View
									style={{ alignItems: 'center', marginVertical: 25 }}
								>
									<Text
										style={{
											color: Colors.primary900,
											fontFamily: 'Bold',
											fontSize: wp(18),
										}}
										onPress={() =>
											navigation.navigate('ForgotPasswordScreen')
										}
									>
										Forgot Password
									</Text>
								</View>
								<View
									style={{
										flexDirection: 'row',
										gap: 5,
										width: '70%',
										justifyContent: 'center',
										alignItems: 'center',
										alignSelf: 'center',
										marginBottom: 20,
									}}
								>
									<Divider
										style={{
											backgroundColor: Colors.greyScale300,
											height: 1.5,
											width: '50%',
										}}
									/>
									<Text
										style={{
											color: Colors.greyScale600,
											fontFamily: 'Regular',
										}}
									>
										Or continue with
									</Text>
									<Divider
										style={{
											backgroundColor: Colors.greyScale300,
											height: 1.5,
											width: '50%',
										}}
									/>
								</View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<SocialContainer
										title={''}
										logo={
											'https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227'
										}
										style={{
											width: wp(100),
											marginVertical: 10,
										}}
									/>
									<SocialContainer
										title={''}
										logo={
											'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-logo-icons-31.png'
										}
										style={{
											width: wp(100),
											marginVertical: 10,
										}}
									/>
									<SocialContainer
										title={''}
										logo={
											'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/480px-Facebook_f_logo_%282021%29.svg.png'
										}
										style={{
											width: wp(100),
											marginVertical: 10,
										}}
									/>
								</View>
								<Divider style={{ marginVertical: 15 }} />
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
												Sign In
											</Text>
										)}
									</TouchableOpacity>
								</View>
							</>
						)}
					</Formik>
				</View>
			</ScrollView>
		</View>
	);
};

export default SignInScreen;

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
	inputTitle: {
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
	},
	button: {
		width: wp(360),
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginVertical: 10,
	},
	errorContainer: { alignSelf: 'flex-start', marginVertical: 5 },
	errorText: { color: Colors.error },
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		alignSelf: 'center',
		width: DEVICE_WIDTH,
	},
});
