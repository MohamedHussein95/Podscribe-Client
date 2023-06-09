import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React, { memo, useRef, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { Avatar } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import { useDispatch } from 'react-redux';
import { Colors } from '../constants';
import { updateUserInfo } from '../store/userSlice';
import { DEVICE_WIDTH, hp, wp } from '../utils/Responsive_layout';
import SetupInput from './SetupInput';

const ProfileSetupForm = ({ onPress }) => {
	const [fullName, setFullName] = useState('');
	const [value, setValue] = useState('');
	const [formattedValue, setFormattedValue] = useState('');
	const [valid, setValid] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const phoneInput = useRef<PhoneInput>(null);

	const [dropDownVisible, setDropDownVisible] = useState(false);
	const [selectedDropDownvalue, setSelectedDropDownvalue] = useState('');

	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	const handleNext = () => {
		try {
			dispatch(
				updateUserInfo({
					fullName,
					phoneNumber: formattedValue,
					gender: selectedDropDownvalue,
					DOB: moment(date).format('MM/DD/YYYY'),
					avatar: '',
				})
			);
			onPress();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.screen}>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<View>
					<Text style={styles.titleText}>Complete your profile 📋</Text>
				</View>
				<View>
					<Text style={styles.subTitleText}>
						Don't worry,only you can see your personal data.No one else
						will be able to see it
					</Text>
				</View>
				<View style={styles.avatarContainer}>
					<Avatar.Image
						source={{
							uri: 'https://www.publicdomainpictures.net/pictures/370000/nahled/model-men.jpg',
						}}
						size={90}
					/>

					<MaterialCommunityIcons
						name='file-edit'
						size={25}
						style={{ position: 'absolute', bottom: -2, right: -2 }}
						color={Colors.primary900}
					/>
				</View>
				<View>
					<Text style={styles.inputTitle}>Full Name</Text>
					<SetupInput
						placeholder={'Full Name'}
						value={fullName}
						onChangeText={setFullName}
					/>
				</View>
				<View>
					<Text style={styles.inputTitle}>Phone Number</Text>
					<PhoneInput
						ref={phoneInput}
						defaultValue={value}
						defaultCode='KE'
						layout='first'
						onChangeText={(text) => {
							setValue(text);
						}}
						onChangeFormattedText={(text) => {
							setFormattedValue(text);
						}}
						containerStyle={{
							backgroundColor: Colors.white,
							width: '100%',
							borderBottomColor: Colors.primary900,
							borderBottomWidth: 1,

							marginBottom: 15,
						}}
						textInputStyle={{}}
						textContainerStyle={{
							backgroundColor: Colors.white,
						}}
					/>
				</View>
				<View>
					<Text style={styles.inputTitle}>Gender</Text>
					<SetupInput
						placeholder={'Gender'}
						value={selectedDropDownvalue}
						onChangeText={setSelectedDropDownvalue}
						icon={dropDownVisible ? 'up' : 'down'}
						IconPack={AntDesign}
						color={Colors.primary900}
						onPress={() => setDropDownVisible((prev) => !prev)}
					/>
					{dropDownVisible && (
						<View style={{ gap: 5 }}>
							<TouchableOpacity
								onPress={() => {
									setSelectedDropDownvalue('Male');
									setDropDownVisible(false);
								}}
							>
								<Text>Male</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									setSelectedDropDownvalue('Female');
									setDropDownVisible(false);
								}}
							>
								<Text>Female</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
				{/* <View>
					<Text style={styles.inputTitle}>Date of Birth</Text>
					<SetupInput
						placeholder={'MM/DD/YYYY'}
						value={moment(date).format('MM/DD/YYYY')}
						onChangeText={setDate}
						icon={'calendar'}
						IconPack={AntDesign}
						color={Colors.primary900}
						onPress={() => setOpen((prev) => !prev)}
					/>
					<DatePicker
						modal
						open={open}
						date={date}
						onConfirm={(date) => {
							setOpen(false);
							setDate(date);
						}}
						onCancel={() => {
							setOpen(false);
						}}
					/>
				</View> */}
			</ScrollView>
			<View style={styles.footer}>
				<TouchableOpacity
					style={{
						...styles.button,
						backgroundColor:
							fullName.trim().length <= 0 ||
							formattedValue.trim().length <= 0 ||
							selectedDropDownvalue.trim().length <= 0 ||
							!phoneInput.current?.isValidNumber(value)
								? Colors.disabled
								: Colors.primary900,
					}}
					activeOpacity={0.8}
					onPress={handleNext}
					disabled={
						fullName.trim().length <= 0 ||
						formattedValue.trim().length <= 0 ||
						selectedDropDownvalue.trim().length <= 0 ||
						!phoneInput.current?.isValidNumber(value)
					}
				>
					<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
						Continue
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(ProfileSetupForm);

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
});
