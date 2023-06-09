import React, { memo, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import { Colors } from '../constants';
import { updateUserInfo } from '../store/userSlice';
import { DEVICE_WIDTH, wp } from '../utils/Responsive_layout';

const FLAGS = [
	{
		id: 'KE',
		country: 'Kenya',
		flag: 'https://www.worldometers.info/img/flags/ke-flag.gif',
	},
	{
		id: 'SO',
		country: 'Somalia',
		flag: 'https://www.worldometers.info/img/flags/so-flag.gif',
	},
];

const SelectCountry = ({ onPress }) => {
	const [focused, setFocused] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [selected, setSelected] = useState('');

	const dispatch = useDispatch();

	type FlatlistItem = {
		id: string;
		country: string;
		flag: string;
	};

	const handleNext = () => {
		try {
			dispatch(updateUserInfo({ selected }));
			onPress();
		} catch (error) {
			console.log(error);
		}
	};

	const _renderItem = (item: FlatlistItem, index: number) => {
		return (
			<View>
				<TouchableOpacity
					style={{
						...styles.container,
						...{
							borderColor:
								selected === item.country
									? Colors.primary900
									: Colors.greyScale200,
							borderWidth: selected === item.country ? 2 : 1,
						},
					}}
					onPress={() => setSelected(item.country)}
				>
					<View>
						<Avatar.Image
							source={{ uri: item.flag }}
							size={40}
							style={{ borderRadius: 8, overflow: 'hidden' }}
						/>
					</View>
					<Text
						style={{ ...styles.countryText, color: Colors.greyScale400 }}
					>
						{item.id}
					</Text>
					<Text style={styles.countryText}>{item.country}</Text>
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<View style={styles.screen}>
			<FlatList
				bounces={false}
				data={FLAGS}
				pagingEnabled
				ListHeaderComponent={
					<>
						<View>
							<Text style={styles.titleText}>
								Which country are you from?
							</Text>
						</View>
						<View>
							<Text style={styles.subTitleText}>
								Please select your country of origin for a better
								recommendation
							</Text>
						</View>
						<Input
							placeholder={'search Country'}
							active={focused}
							onFocus={() => setFocused(true)}
							onBlur={() => {
								setFocused(false);
							}}
							value={searchText}
							onChangeText={setSearchText}
							containerStyle={styles.inputContainer}
						/>
					</>
				}
				ListHeaderComponentStyle={{}}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => _renderItem(item, index)}
				getItemLayout={(data, index) => ({
					length: DEVICE_WIDTH,
					offset: DEVICE_WIDTH * index,
					index,
				})}
				style={{ flex: 1, marginBottom: 15 }}
			/>
			<View style={styles.footer}>
				<TouchableOpacity
					style={{
						...styles.button,
						backgroundColor:
							selected.trim().length <= 0
								? Colors.disabled
								: Colors.primary900,
					}}
					activeOpacity={0.8}
					onPress={handleNext}
					disabled={selected.trim().length <= 0}
				>
					<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
						Continue
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(SelectCountry);

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
	inputContainer: {
		width: wp(350),
		marginTop: 15,
		alignSelf: 'flex-start',
	},
	container: {
		width: wp(350),
		overflow: 'hidden',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		borderRadius: 10,
		gap: 20,
		marginVertical: 5,
	},
	countryText: {
		fontSize: wp(18),
		fontFamily: 'Bold',
		color: Colors.black,
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
